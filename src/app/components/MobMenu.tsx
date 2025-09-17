'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const MobMenu = ({ onClose }: { onClose: () => void }) => {
  const pathname = usePathname();

  return (
    <div className='bg-white h-full'>
      <div className='flex items-center justify-between px-6 py-4.5'>
        <Link href='/'>
          <Image src='/images/logo-dark.svg' alt='logo' width={114} height={38} />
        </Link>
        <Image onClick={onClose} src='/icons/double-arrow.svg' alt='logo' width={24} height={24} />
      </div>

      <nav className='flex flex-col gap-8 mt-8 px-6'>
        <Link
          className={clsx(pathname === '/' && 'border-b border-orange-600', 'text-[16px] px-2 py-3 font-medium')}
          href='/'
        >
          About us
        </Link>
        <Link
          className={clsx(
            pathname === '/directory' && 'border-b border-orange-600',
            'text-[16px] px-2 py-3 font-medium'
          )}
          href='/directory'
        >
          Company Directory
        </Link>
        <Link
          className={clsx(
            pathname === '/news' && 'border-b border-orange-600',
            'text-[16px] px-2 py-3 font-medium flex gap-2'
          )}
          href='/news'
        >
          What’s New
          <Image src='/icons/arrow-right.svg' alt='logo' width={24} height={24} />
        </Link>
        <Link
          className={clsx(
            pathname === '/contacts' && 'border-b border-orange-600',
            'text-[16px] px-2 py-3 font-medium'
          )}
          href='/contacts'
        >
          Contacts & Support
        </Link>
      </nav>

      <div className='px-6 flex flex-col gap-4 py-8 mt-[120px]'>
        <button className='w-full h-[52px] flex items-center justify-center text-white bg-orange-600 rounded-[100px]'>
          Become member
        </button>
        <button className='w-full h-[52px] flex items-center justify-center text-orange-600 rounded-[100px] bg-[rgba(255,77,0,0.1)]'>
          Login
        </button>
      </div>
    </div>
  );
};
