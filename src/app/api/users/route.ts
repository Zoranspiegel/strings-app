import { sql } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username filter required' }, { status: 400 });
  }

  const user = await sql(
    'select id, username, avatar from public.users where username ilike $1',
    [username]
  );

  if (!user.rowCount) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const response = NextResponse.json(user.rows[0], { status: 200 });
  return response;
}
