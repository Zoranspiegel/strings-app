import useSWR from 'swr';
import Post from '@/app/components/post';

export default function FeedList ({ index }: { index: number }): JSX.Element {
  const { data, error, isLoading } = useSWR('/api/posts/feed?page=' + index);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((post: PostI) => {
        return (
          <li
            key={index}
            className='my-5'
          >
            <Post post={post}/>
          </li>
        );
      })}
    </ul>
  );
}
