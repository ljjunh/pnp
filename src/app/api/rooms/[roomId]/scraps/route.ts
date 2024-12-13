import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { createRoomScrap, deleteRoomScrap, isScrap } from '@/services/room';

interface Params {
  roomId: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
): Promise<CustomResponse> {
  const session = await auth();

  try {
    if (!session) {
      return CustomResponse.ok(false);
    }

    const roomId = +params.roomId;

    const scrap = await isScrap(roomId, session.user.id);

    return CustomResponse.ok(scrap);
  } catch (error) {
    console.error('스크랩 조회 중 에러 발생: ', {
      roomId: params.roomId,
      uesrId: session?.user.id,
      error: error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Params },
): Promise<CustomResponse> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const roomId = +params.roomId;

    await createRoomScrap(roomId, session.user.id);

    return CustomResponse.created();
  } catch (error) {
    console.error('스크랩 생성 중 에러 발생: ', {
      roomId: params.roomId,
      uesrId: session?.user.id,
      error: error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
): Promise<CustomResponse> {
  const session = await auth();

  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const roomId = +params.roomId;

    await deleteRoomScrap(roomId, session.user.id);

    return CustomResponse.deleted();
  } catch (error) {
    console.error('스크랩 삭제 중 에러 발생: ', {
      roomId: params.roomId,
      uesrId: session?.user.id,
      error: error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
