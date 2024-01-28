import { getJWTPayload } from '@/app/util/auth';
import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const page = Number(searchParams.get('page')) ?? 0;
  const limit = 10;
  const offset = page * limit;

  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  const userPosts: PostI[] = [];
  if (username) {
    const userPostsRes = await client.query(
      `select p.*, u.username, u.avatar from public.posts p 
      inner join public.users u on p.user_id = u.id 
      where u.username ilike $1 
      order by created_at desc limit $2 offset $3`,
      [username, limit, offset]
    );
    userPosts.push(...userPostsRes.rows);
  } else {
    const userPostsRes = await client.query(
      `select p.*, u.username, u.avatar from public.posts p 
      inner join public.users u on p.user_id = u.id 
      where p.user_id = $1 
      order by created_at desc limit $2 offset $3`,
      [jwtPayload?.sub, limit, offset]
    );
    userPosts.push(...userPostsRes.rows);
  }

  await client.end();

  const response = NextResponse.json(userPosts, { status: 200 });
  return response;
}
