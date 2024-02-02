'use client';
import User from '@/app/components/user';
import useSWR from 'swr';

export default function FollowingList ({
  page
}: {
  page: number
}): JSX.Element {
  const { data: userData } = useSWR('/api/users/profile');
  const { data: followersData, isLoading, error } = useSWR('/api/users/' + userData.data.id + '/following?page=' + page);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>ERROR</div>;
  return (
    <ul>
      {followersData.map((user: UserI) => (
        <li
          key={user.id}
          className='my-5'
        >
          <User user={user}/>
        </li>
      ))}
    </ul>
  );
}
