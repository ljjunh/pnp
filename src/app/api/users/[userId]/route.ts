import { BadRequestError, CustomError } from '@/errors';
import { getUser } from '@/services/user';
import { UserParams } from '@/types/user';
import { NextResponse } from 'next/server';

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