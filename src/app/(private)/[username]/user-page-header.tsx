import useSWR, { mutate } from 'swr';
import Image from 'next/image';

export default function UserPageHeader ({
  username
}: {
  username: string
}): JSX.Element {
  const { data: user, isLoading: userLoading, error: userError } = useSWR(`/api/users?username=${username}`);
  const { data: userFollows, isLoading: followsLoading, error: followsError } = useSWR(() => `/api/follows?user_id=${user.id}`);

  if (userLoading || followsLoading) return <div>Loading...</div>;
  if (userError || followsError) return <div>ERROR</div>

  async function handleFollow (): Promise<void> {
    const res = await fetch('/api/follows', {
      method: 'post',
      body: JSON.stringify({ userId: user.id })
    });

    if (res.ok) {
      mutate((key: string) => key.startsWith('/api/follows'))
    }
  }

  async function handleUnfollow (): Promise<void> {
    const res = await fetch(`/api/follows/${user.id}`, {
      method: 'delete'
    });

    if (res.ok) {
      mutate((key: string) => key.startsWith('/api/follows'))
    }
  }

  return (
    <header className='flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <Image
          src={user.avatar}
          alt={user.username}
          width={50}
          height={50}
          className='rounded-full'
        />
        <h1 className='text-lg font-bold'>{user.username}</h1>
      </div>
      {userFollows.length
        ? (
          <button
            onClick={handleUnfollow}
            className='rounded-lg bg-slate-900 p-2'
          >Unfollow</button>
        )
        : (
          <button
            onClick={handleFollow}
            className='rounded-lg bg-slate-900 p-2'
          >Follow</button>
        )
      }
    </header>
  );
}
