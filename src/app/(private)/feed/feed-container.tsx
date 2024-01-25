'use client';
import { useState } from 'react';
import FeedList from './feed-list';

export default function FeedContainer (): JSX.Element {
  const [cnt, setCnt] = useState<number>(1);

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<FeedList index={i} key={i}/>);
  }

  return (
    <div>
      {pages}
      <div className='flex justify-center'>
        <button
          onClick={() => { setCnt(cnt + 1); }}
          className='bg-slate-900 p-2 rounded-lg'
        >
          Load More
        </button>
      </div>
    </div>
  );
}
