import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createAccessToken, verifyToken } from '@/lib/server';

const SECRET_KEY = process.env.AUTH_SECRET as string;

export const POST = async () => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: '리프레시 토큰이 유효하지 않습니다.' }, { status: 401 });
  }

  try {
    const payload = await verifyToken(refreshToken, SECRET_KEY);
    const userId = payload.sub as string;

    const newAccessToken = await createAccessToken(userId, SECRET_KEY);

    cookieStore.set('accessToken', newAccessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15,
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '토큰 검증에 실패했습니다.' }, { status: 401 });
  }
};
