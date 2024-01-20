import { Client } from 'pg';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function loadFakeData (numUsers: number): Promise<void> {
  console.log(`Executing load fake data. Generating ${numUsers} users...`);

  const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    port: Number(process.env.PG_PORT)
  });

  await client.connect();

  try {
    const saltRounds = 10;
    const password = 'password12345';
    const hash = bcrypt.hashSync(password, saltRounds);

    await client.query('begin');

    for (let i = 0; i < numUsers; i++) {
      await client.query(
        'insert into public.users (username, password, avatar) values ($1, $2, $3)',
        [faker.internet.userName(), hash, faker.image.avatar()]
      );
    }

    const res = await client.query(
      'select id from public.users order by created_at desc limit $1',
      [numUsers]
    );

    for (const row of res.rows) {
      for (let i = 0; i < Math.ceil(Math.random() * 40) + 10; i++) {
        await client.query(
          'insert into public.posts (user_id, content) values ($1, $2)',
          [row.id, faker.lorem.sentence()]
        );
      }
    }

    for (const row1 of res.rows) {
      for (const row2 of res.rows) {
        if (row1 !== row2) {
          if (Math.random() < 0.5) {
            await client.query(
              'insert into public.follows (user_id, follower_id) values ($1, $2)',
              [row1.id, row2.id]
            );
          }
        }
      }
    }

    await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
}

const numUsers = Number(process.argv[2]) || 10;
loadFakeData(numUsers)
  .catch(error => {
    console.error(error);
  });
