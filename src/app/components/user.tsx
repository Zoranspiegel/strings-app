import Link from 'next/link';
import Image from 'next/image';

export default function User ({
  user, href
}: { user: UserI, href?: string }): JSX.Element {
  return (
    <div>
      <Link
        href={`/${href ?? user.username}`}
        className='flex flex-row items-center'
      >
        <div>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt={user.username}
              width={50}
              height={50}
              className='rounded-full mr-3'
            />
          )}
          {!user.avatar && (
            <div className='rounded-full mr-3 w-[50px] h-[50px] bg-slate-600'></div>
          )}
        </div>
        <div>{user.username}</div>
      </Link>
    </div>
  );
}
