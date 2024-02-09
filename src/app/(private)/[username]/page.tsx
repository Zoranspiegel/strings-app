'use client';

import UserPageHeader from './user-page-header';

export default function UsernamePage ({ params }: { params: { username: string } }): JSX.Element {
  return (
    <div>
      <UserPageHeader username={params.username} />
      <div>Posts container {params.username}</div>
    </div>
  );
}
