import Image from 'next/image';
import Link from 'next/link';
import { AuthButtons } from './AuthButton';
import { UserMenu } from './UserMenu';
import { cookies } from 'next/headers';
import { getUserFromToken } from '@/services/auth';
import { NewsButton } from './NewsButton';
import { NavLink } from './NavLink';

export const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const user = await getUserFromToken(token ?? '');
  console.log('user', user);

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
          //onClick={onOpen}
        />

        <nav className='flex lg:gap-5 gap-8 max-lg:hidden'>
          <NavLink href='/' text='Home' />
          <NavLink href='/about' text='About us' />
          <NavLink href='/directory' text='Company Directory' />
          <NewsButton />
          {/* <NavLink href='/contacts' text='Contacts & Support' /> */}
        </nav>

        {user ? <UserMenu name={user.contactName} avatar={user.companyLogo.url} /> : <AuthButtons />}
      </div>
    </div>
  );
};
