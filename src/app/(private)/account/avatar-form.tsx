import Image from 'next/image';
import useSWR from 'swr';

export default function AvatarForm (): JSX.Element {
  const { data, isLoading, error } = useSWR('api/users/profile');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>ERROR</div>;
  const user: UserI = data.data;
  return (
    <form>
      {user.avatar && (
        <div>
          <Image
            src={user.avatar}
            alt={user.username}
            width={200}
            height={200}
            className='rounded-full my-10 m-auto'
          />
        </div>
      )}
      {!user.avatar && (
        <div
          className='bg-slate-600 rounded-full w-[200px] h-[200px] my-10'
        ></div>
      )}
      <input
        type='file'
      />
    </form>
  );
}
