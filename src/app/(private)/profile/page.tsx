import PostContainer from '@/app/components/post-container';
import NewPostForm from './form';

export default function Profile (): JSX.Element {
  return (
    <div className='flex flex-col gap-4'>
      <NewPostForm />
      <PostContainer />
    </div>
  );
}
