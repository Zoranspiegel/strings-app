import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { getClient } from '@/db';

async function loadFakeAdmin (username: string, password: string): Promise<void> {
  console.log(`executing load fake admin. USER: ${username} PW: ${password}`);

  const client = getClient();

  await client.connect();

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    await client.query('begin');

    await client.query(
      'insert into public.users (username, password, avatar, is_admin) values ($1, $2, $3, $4)',
      [username, hash, faker.image.avatar(), true]
    );

    await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
}

const username = process.argv[2];
const password = process.argv[3];
loadFakeAdmin(username, password)
  .catch(error => {
    console.error(error);
  });
