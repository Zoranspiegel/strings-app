import { getJWTPayload } from '@/app/util/auth';
import { sql } from '@/db';
import { NextResponse } from 'next/server';

export async function DELETE (request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const userId = params.id;
  const jwtPayload = await getJWTPayload();

  const res = await sql(
    'select * from public.follows where user_id = $1 and follower_id = $2',
    [userId, jwtPayload?.sub]
  );

  if (!res.rowCount) {
    return NextResponse.json({ error: 'User not followed' }, { status: 400 });
  }

  await sql(
    'delete from public.follows where user_id = $1 and follower_id = $2',
    [userId, jwtPayload?.sub]
  );

  const response = NextResponse.json({ msg: 'User successfully unfollowed' }, { status: 200 });
  return response;
}
