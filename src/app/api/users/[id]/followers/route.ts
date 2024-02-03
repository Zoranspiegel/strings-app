import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 0;
  const limit = 5;
  const offset = page * limit;

  const client = getClient();
  await client.connect();

  const followerUsersRes = await client.query(
    `select u.id, u.username, u.avatar from public.users u 
    inner join public.follows f on u.id = f.follower_id 
    where f.user_id = $1 
    order by f.created_at desc limit $2 offset $3`,
    [params.id, limit, offset]
  );

  await client.end();

  const response = NextResponse.json(followerUsersRes.rows, { status: 200 });
  return response;
}
