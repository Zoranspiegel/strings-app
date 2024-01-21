'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent } from 'react';

export default function SigninForm (): JSX.Element {
  const router = useRouter();
  const [username, setUsername] = useState<undefined | string>('');
  const [password, setPassword] = useState<undefined | string>('');
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit (e: FormEvent): Promise<void> {
    e.preventDefault();

    setErrors([]);

    const res = await fetch('/api/login', {
      method: 'post',
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      const resJSON = await res.json();
      setErrors(prevState => [...prevState, resJSON.error]);
    } else {
      router.push('/feed');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg'
    >
      <div className='text-center'>
        <h3 className='font-semibold'>Sign In</h3>
      </div>
      <div className='my-3'>
        <hr />
      </div>
      <div>
        <div className='flex flex-col gap-2 mb-4'>
          <label>Username</label>
          <input
            type='text'
            value={username}
            id='username'
            placeholder='Username'
            onChange={(e) => { setUsername(e.target.value); }}
            required
            className='text-black p-3 border border-slate-700 rounded-lg w-full'
          />
        </div>
        <div className='flex flex-col gap-2 mb-4'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            id='password'
            placeholder='Password'
            onChange={(e) => { setPassword(e.target.value); }}
            required
            className='text-black p-3 border border-slate-700 rounded-lg w-full'
          />
        </div>
      </div>
      <div>
        <ul className='flex justify-center items-center mb-2'>
          {errors?.map(error => {
            return (
              <li
                key={error}
                className='list-disc text-[13px] text-red-600'
              >{error}</li>
            );
          })}
        </ul>
      </div>
      <button
        type='submit'
        className='bg-slate-900 text-white p-3 rounded-l'
      >Sign In</button>
    </form>
  );
}
