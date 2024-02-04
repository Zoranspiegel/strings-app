import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const response = NextResponse.json({ msg: 'logout success' });

  response.cookies.delete('jwt-token');

  return response;
}
