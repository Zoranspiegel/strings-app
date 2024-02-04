'use client';
import User from '@/app/components/user';
import useSWR from 'swr';

export default function FollowersList ({
  page
}: {
  page: number
}): JSX.Element {
  const { data: userData } = useSWR('/api/users/profile');
  const { data: followersData } = useSWR('/api/users/' + userData.data.id + '/followers?page=' + page);

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
