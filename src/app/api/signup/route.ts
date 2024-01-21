import { NextResponse } from 'next/server';
import { sql } from '@/db';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

export async function POST (request: Request): Promise<NextResponse> {
  const reqJSON = await request.json();

  const oldUser = await sql(
    'select id from public.users where username ilike $1',
    [reqJSON.username]
  );

  if (oldUser.rowCount) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(reqJSON.password, saltRounds);

  await sql(
    'insert into public.users (username, password) values ($1, $2)',
    [reqJSON.username, hash]
  );

  const newUser = await sql(
    'select id from public.users where username ilike $1',
    [reqJSON.username]
  );

  const response = NextResponse.json({ msg: 'Registration success' }, { status: 201 });

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(newUser.rows[0].id)
    .setIssuedAt()
    .setExpirationTime('2w')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  response.cookies.set('jwt-token', token);

  return response;
}
