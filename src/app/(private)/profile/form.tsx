'use client';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useSWRConfig } from 'swr';

export default function NewPostForm (): JSX.Element {
  const { mutate } = useSWRConfig();
  const [postState, setPostState] = useState<string>('');

  function onChange (e: ChangeEvent<HTMLTextAreaElement>): void {
    setPostState(e.target.value);
  }

  async function handleSubmit (e: FormEvent): Promise<void> {
    e.preventDefault();

    const res = await fetch('/api/posts', {
      method: 'post',
      body: JSON.stringify({ content: postState })
    });

    if (res.ok) {
      setPostState('');
      mutate((key: string) => key.startsWith('/api/posts'))
        .catch(error => { console.error(error); });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <textarea
        value={postState}
        onChange={onChange}
        placeholder="What's happening?"
        rows={4}
        className='bg-gray-700 p-2 rounded-lg w-full my-2 resize-none'
      />
      <button
        type='submit'
        className='bg-slate-900 p-2 rounded-lg'
      >
        Post
      </button>
    </form>
  );
}
