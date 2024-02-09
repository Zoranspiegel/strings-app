import { getJWTPayload } from '@/app/util/auth';
import { sql } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');
  const jwtPayload = await getJWTPayload();

  const res = await sql(
    'select * from public.follows where follower_id = $1 and user_id = $2',
    [jwtPayload?.sub, userId]
  );

  const response = NextResponse.json(res.rows, { status: 200 });
  return response;
}
