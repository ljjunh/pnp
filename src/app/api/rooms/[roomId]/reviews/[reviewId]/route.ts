import { NextRequest, NextResponse } from 'next/server';

interface Params {
  roomId: string;
  reviewId: string;
}

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  console.log(request);
  console.log(params);
  return NextResponse.json({ message: '리뷰 수정 완료' });
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  console.log(request);
  console.log(params);
  return NextResponse.json({ message: '리뷰 삭제 완료' });
}
