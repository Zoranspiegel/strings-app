import { getJWTPayload } from '@/app/util/auth';
import { sql } from '@/db';

import { NextResponse } from 'next/server';

export async function GET (): Promise<NextResponse> {
  const jwtPayload = await getJWTPayload();

  const res = await sql(
    'select id, username, avatar from users where id = $1',
    [jwtPayload?.sub]
  );

  const user = res.rows[0];

  return NextResponse.json({ data: user });
}
