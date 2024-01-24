import { NextResponse } from 'next/server';
import { getJWTPayload } from '@/app/util/auth';
import { getClient } from '@/db';

export async function GET (request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page'));
  const limit = 10;
  const offset = page * 10;

  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  const res = await client.query(
    `select p.*, u.username, u.avatar from public.posts p inner join public.users u on p.user_id = u.id 
    where user_id in (select user_id from public.follows where follower_id = $1) 
    order by created_at desc limit $2 offset $3`,
    [jwtPayload?.sub, limit, offset]
  );

  await client.end();

  const response = NextResponse.json(res.rows, { status: 200 });
  return response;
}
