import { auth } from '@/auth';
import { CustomError, UnAuthorizedError } from '@/errors';
import { updateUserSchema } from '@/schemas/user';
import { getUser, updateUser } from '@/services/user';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      throw new UnAuthorizedError();
    }

    const userId = session.user.id;

    const user = await getUser(userId);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);

    if (error instanceof CustomError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      throw new UnAuthorizedError();
    }

    const userId = session.user.id;
    const data = updateUserSchema.parse(await request.json());
    
    await updateUser(userId, data);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '잘못된 요청 데이터입니다.', errors: error.errors },
        { status: 400 },
      );
    } else if (error instanceof CustomError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json({ error: '유저 업데이트 실패' }, { status: 500 });
  }
}
