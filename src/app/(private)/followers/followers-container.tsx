import { useState } from 'react';
import FollowersList from './followers-list';

export default function FollowersContainer (): JSX.Element {
  const [cnt, setCnt] = useState<number>(1);

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<FollowersList key={i} page={i}/>);
  }

  return (
    <div>
      <div className='flex flex-col justify-center w-full'>
        {pages}
        <button
          onClick={() => { setCnt(cnt + 1); }}
          className='bg-slate-900 rounded-lg p-2'
        >Load More</button>
      </div>
    </div>
  );
}
