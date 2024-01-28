import { NextResponse } from 'next/server';
import { getJWTPayload } from '@/app/util/auth';
import { getClient } from '@/db';

export async function GET (request: Request, { params }: { params: { id: number } }): Promise<NextResponse> {
  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  const userPost = await client.query(
    `select p.*, u.username, u.avatar from public.posts p 
    inner join public.users u on p.user_id = u.id 
    where p.id = $1 and p.user_id = $2`,
    [params.id, jwtPayload?.sub]
  );

  await client.end();

  if (!userPost.rowCount) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const response = NextResponse.json(userPost.rows, { status: 200 });
  return response;
}
