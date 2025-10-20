'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AuthButtons } from './AuthButton';
import { UserMenu } from './UserMenu';

import { NewsButton } from './NewsButton';
import { NavLink } from './NavLink';
import { DirectoryLink } from './DirectoryLink';
import { MobMenu } from './MobMenu';
import { useState } from 'react';
import { User } from '@/types';

export const Header = ({ user }: { user: User }) => {
  const [isMobMenuOpen, setIsMobMenuOpen] = useState(false);

  return (
    <div>
      <div className='relative z-10 flex items-center justify-between px-6 py-3.5 rounded-[20px] max-md:rounded-none bg-white  '>
        <Link href='/'>
          <Image src='/images/logo-dark.svg' alt='Vercel Logo' width={117} height={40} />
        </Link>

        <Image
          src='/icons/brg-menu.svg'
          alt='menu'
          width={24}
          height={24}
          className='lg:hidden block cursor-pointer'
          onClick={() => setIsMobMenuOpen(true)}
        />

        <nav className='flex lg:gap-5 gap-8 max-lg:hidden'>
          <NavLink href='/' text='Home' />
          <NavLink href='/about' text='About us' />
          <DirectoryLink user={user} />
          <NewsButton />
        </nav>

        {user ? <UserMenu user={user} /> : <AuthButtons />}
      </div>
      {isMobMenuOpen && <MobMenu onClose={() => setIsMobMenuOpen(false)} user={user} />}
    </div>
  );
};
