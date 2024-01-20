export default function PublicLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <main className='flex items-center justify-center min-h-screen'>
      {children}
    </main>
  );
}
