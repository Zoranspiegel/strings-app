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

export async function POST (request: Request): Promise<NextResponse> {
  const resJSON = await request.json();
  const { userId } = resJSON;
  const jwtPayload = await getJWTPayload();

  const res = await sql(
    'select * from public.follows where user_id = $1 and follower_id = $2',
    [userId, jwtPayload?.sub]
  );

  if (res.rowCount) {
    return NextResponse.json({ error: 'User already followed' }, { status: 400 });
  }

  await sql(
    'insert into public.follows (user_id, follower_id) values ($1, $2) returning *',
    [userId, jwtPayload?.sub]
  );
  const response = NextResponse.json({ msg: 'User successfully followed' }, { status: 201 });
  return response;
}
