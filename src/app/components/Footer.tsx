import { getUserFromToken } from '@/services/auth';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { DirectoryLink } from './DirectoryLink';

export const Footer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const user = await getUserFromToken(token ?? '');
  console.log('user', user);

  return (
    <div className='bg-[#1A1A1A] text-white px-20 py-12 max-lg:py-8 max-md:px-3 max-md:py-8'>
      <div className='flex items-center justify-between max-lg:flex-col h-10 max-lg:h-fit mb-12 max-lg:mb-8'>
        <Link href='/'>
          <Image src='/images/logo-light.svg' alt='Vercel Logo' width={117} height={40} />
        </Link>
        <nav className='flex gap-4 h-10 max-md:h-fit max-md:flex-wrap max-md:justify-center max-md:mt-8'>
          <Link href='/' className='px-2 py-3 text-[16px] font-medium hover:text-orange-400'>
            Home
          </Link>
          <Link href='/about' className='px-2 py-3 text-[16px] font-medium hover:text-orange-400'>
            About us
          </Link>

          <DirectoryLink user={user} isFooter />
          {/* <Link href='/directory' className='px-2 py-3 text-[16px] font-medium'>
            Company Directory
          </Link> */}

          <Link href='/news?tab=news' className='px-2 py-3 text-[16px] font-medium hover:text-orange-400'>
            News
          </Link>

          <Link href='/news?tab=events' className='px-2 py-3 text-[16px] font-medium hover:text-orange-400'>
            Events
          </Link>

          {/* <Link href='/contacts' className='px-2 py-3 text-[16px] font-medium'>
            Contacts & Support
          </Link> */}
        </nav>

        <div className='flex items-center gap-4 mt-8 md:hidden'>
          <Link href='/'>
            <Image src='/icons/youtube.svg' alt='facebook' width={24} height={24} />
          </Link>
          <Link href='/'>
            <Image src='/icons/facebook.svg' alt='facebook' width={24} height={24} />
          </Link>
          <Link href='/'>
            <Image src='/icons/twitter.svg' alt='facebook' width={24} height={24} />
          </Link>
          <Link href='/'>
            <Image src='/icons/instagram.svg' alt='facebook' width={24} height={24} />
          </Link>
          <Link href='/'>
            <Image src='/icons/linkedin.svg' alt='facebook' width={24} height={24} />
          </Link>
        </div>
      </div>
      <div className='bg-gradient-to-r from-[#C1C7CD00] via-[#C1C7CD] to-[#C1C7CD00] h-1 w-full mb-12 max-lg:mb-4'></div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-12 max-md:flex-col max-md:justify-center max-md:mx-auto max-md:gap-4'>
          <p className='text-[14px]'>CompanyName @ 2025. All rights reserved.</p>
          <Link href='/privacy' className='text-[14px] hover:underline'>
            Privacy Policy
          </Link>
        </div>
        <div className='flex items-center gap-4 max-md:hidden'>
          <Link href='/'>
            <Image src='/icons/youtube.svg' alt='facebook' width={24} height={24} />
          </Link>
          <Link href='/'>
            <Image src='/icons/facebook.svg' alt='facebook' width={24} height={24} />
          </Link>
          <Link href='/'>
            <Image src='/icons/twitter.svg' alt='facebook' width={24} height={24} />
          </Link>
          <Link href='/'>
            <Image src='/icons/instagram.svg' alt='facebook' width={24} height={24} />
          </Link>
          <Link href='/'>
            <Image src='/icons/linkedin.svg' alt='facebook' width={24} height={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};
