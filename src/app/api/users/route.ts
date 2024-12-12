import { auth } from '@/auth';
import { CustomError, UnAuthorizedError } from '@/errors';
import { getUser } from '@/services/user';
import { NextResponse } from 'next/server';

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
