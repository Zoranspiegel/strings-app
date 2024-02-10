'use client';

import UserPageHeader from './user-page-header';
import PostContainer from '@/app/components/post-container';

export default function UsernamePage ({ params }: { params: { username: string } }): JSX.Element {
  return (
    <div className='flex flex-col gap-4'>
      <UserPageHeader username={params.username} />
      <hr />
      <PostContainer username={params.username}/>
    </div>
  );
}
