import { BadRequestError, CustomError } from '@/errors';
import { updateUserSchema } from '@/schemas/user';
import { getUser, updateUser } from '@/services/user';
import { UserParams } from '@/types/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  { params }: { params: UserParams },
) {
  try {
    const userId = params.userId;
    if (!userId) {
      throw new BadRequestError();
    }
    const user = await getUser(userId);

    if (!user) {
      return NextResponse.json({ error: '유저 조회 실패' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);

    if (error instanceof CustomError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json({ error: '유저 조회 실패' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: UserParams },
) {
  try {
    const userId = params.userId;
    const data = updateUserSchema.parse(await request.json());
    
    await updateUser(userId, data);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '유저 업데이트 실패' }, { status: 500 });
  }
}
