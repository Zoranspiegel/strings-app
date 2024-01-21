import { cookies } from 'next/headers';
import { type JWTPayload, jwtVerify } from 'jose';

export async function getJWTPayload (): Promise<JWTPayload | undefined> {
  const cookieStore = cookies();
  const token = cookieStore.get('jwt-token');

  if (!token?.value) return;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token?.value, secret);

  return payload;
}
