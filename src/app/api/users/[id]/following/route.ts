import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 0;
  const limit = 5;
  const offset = page * limit;

  const client = getClient();
  await client.connect();

  const followingUsersRes = await client.query(
    `select id, username, avatar from public.users 
    where id in (select user_id from public.follows where follower_id = $1) 
    order by created_at desc limit $2 offset $3`,
    [params.id, limit, offset]
  );

  await client.end();

  const response = NextResponse.json(followingUsersRes.rows, { status: 200 });
  return response;
}