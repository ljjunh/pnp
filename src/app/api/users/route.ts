import { auth } from '@/auth';
import { getUser } from '@/services/user';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const userId = session.user.id;

  const user = await getUser(userId);

  return NextResponse.json(user, { status: 200 });
}
