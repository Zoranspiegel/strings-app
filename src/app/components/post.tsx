import Link from 'next/link';
import Image from 'next/image';

export default function Post ({ post }: { post: PostI }): JSX.Element {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  const createdAt = new Date(post.created_at);

  return (
    <div className='flex flex-row'>
      <div>
        {post.avatar && (
          <Link href={`/${post.username}`}>
            <Image
              src={post.avatar}
              alt={post.username}
              width={50}
              height={50}
              className='rounded-full mr-3'
            />
          </Link>
        )}
        {!post.avatar && (
          <div className='rounded-full mr-3 w-[50px] h-[50px] bg-slate-600'></div>
        )}
      </div>
      <div className='flex flex-col max-w-xs'>
        <div className='font-bold'>
          <Link href={`/${post.username}`}>{post.username}</Link>
        </div>
        <div className='text-slate-400'>
          {createdAt.toLocaleDateString('en-es', options)}
        </div>
        <div>
          {post.content}
        </div>
      </div>
    </div>
  );
}
