import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { sql } from '@/db';

export async function POST (request: Request): Promise<NextResponse> {
  const reqJSON = await request.json();

  const res = await sql(
    'select id, username, password from public.users where username ilike $1',
    [reqJSON.username]
  );

  if (!res.rowCount) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const user = res.rows[0];

  const match = await bcrypt.compare(reqJSON.password, user.password);

  if (!match) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const response = NextResponse.json({ msg: 'Login success' }, { status: 200 });

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime('2w')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  response.cookies.set('jwt-token', token, {
    sameSite: 'strict',
    httpOnly: true,
    secure: true
  });

  return response;
}
