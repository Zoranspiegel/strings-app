'use client';

import AvatarForm from './avatar-form';
import SignOutButton from './signout-button';

export default function AccountPage (): JSX.Element {
  return (
    <div>
      <AvatarForm />
      <SignOutButton />
    </div>
  );
}
