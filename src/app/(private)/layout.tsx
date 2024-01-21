'use client';
import Header from './header';
import NavBar from './navbar';
import Footer from './footer';
import fetcher from '../util/fetcher';
import { SWRConfig } from 'swr';

export default function PrivateLayout ({
  children
}: { children: React.ReactNode }): JSX.Element {
  return (
    <SWRConfig
      value={{ fetcher }}
    >
      <div>
        <Header />
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
