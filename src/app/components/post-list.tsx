'use client';
import useSWR from 'swr';
import Post from './post';

export default function PostList ({
  index,
  username
}: {
  index: number
  username?: string
}): JSX.Element {
  const { data, isLoading, error } = useSWR(`/api/posts?page=${index}${username ? `&username=${username}` : ''}`);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <ul>
      {data.map((post: PostI, index: number) => (
        <li key={index} className='mb-4'>
          <Post post={post}/>
        </li>
      ))}
    </ul>
  );
}
