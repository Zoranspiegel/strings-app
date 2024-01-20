import { type QueryResult, Client } from 'pg';
import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export function getClient (): Client {
  const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    port: Number(process.env.PG_PORT)
  });

  return client;
}

export async function sql (sql: string, values?: any[]): Promise<QueryResult<any>> {
  const client = getClient();
  await client.connect();
  const res = await client.query(sql, values);
  await client.end();
  return res;
}
