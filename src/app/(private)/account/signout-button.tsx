import { useRouter } from 'next/navigation';

export default function SignOutButton (): JSX.Element {
  const router = useRouter();

  async function handleSignOut (): Promise<void> {
    const res = await fetch('api/logout');
    if (res.ok) {
      router.push('/');
    }
  }

  return (
    <button
      onClick={handleSignOut}
      className='text-green-500 underline p-2 my-5'
    >Sign Out</button>
  );
}
