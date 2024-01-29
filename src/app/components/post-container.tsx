'use client';
import { useState } from 'react';
import PostList from './post-list';

export default function PostContainer ({
  username
}: { username?: string }): JSX.Element {
  const [cnt, setCnt] = useState<number>(1);

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<PostList index={i} username={username} key={i}/>);
  }

  return (
    <div>
      {pages}
      <div className='flex'>
        <button
          onClick={() => { setCnt(cnt + 1); }}
          className='bg-slate-900 p-2 rounded-lg m-auto'
        >
          Load More
        </button>
      </div>
    </div>
  );
}
