import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (): Promise<NextResponse> {
  const client = getClient();
  await client.connect();

  const allUsersRes = await client.query(
    'select id, username from users'
  );

  await client.end();

  return NextResponse.json(allUsersRes.rows, { status: 200 });
}
