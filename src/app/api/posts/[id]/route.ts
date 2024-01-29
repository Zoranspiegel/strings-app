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

export async function PATCH (request: Request, { params }: { params: { id: number } }): Promise<NextResponse> {
  const body = await request.json();

  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  const postExists = await client.query(
    'select * from public.posts where user_id = $1 and id = $2',
    [jwtPayload?.sub, params.id]
  );

  if (!postExists.rowCount) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await client.query(
    'update public.posts set content = $1 where user_id = $2 and id = $3',
    [body.content, jwtPayload?.sub, params.id]
  );

  await client.end();

  const response = NextResponse.json({ msg: 'Update success' }, { status: 200 });
  return response;
}

export async function DELETE (request: Request, { params }: { params: { id: number } }): Promise<NextResponse> {
  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  const post = await client.query(
    'select id from public.posts where user_id = $1 and id = $2',
    [jwtPayload?.sub, params.id]
  );

  if (!post.rowCount) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await client.query(
    'delete from public.posts where user_id = $1 and id = $2',
    [jwtPayload?.sub, params.id]
  );

  await client.end();

  const response = NextResponse.json({ msg: 'Delete success' }, { status: 201 });
  return response;
}
