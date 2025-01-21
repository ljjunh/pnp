import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = cookies().has('access_token');

  if (!accessToken) {
    return NextResponse.redirect('/signin');
  }

  return NextResponse.next();
}
