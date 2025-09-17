'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import { ModalComponent } from './Modal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RigisterForm';
import Popover from '@mui/material/Popover';

export const Header = ({ onOpen }: { onOpen: () => void }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState('login');

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const pathname = usePathname();

  return (
    <div>
      <div className='flex items-center justify-between px-6 py-3.5 rounded-[20px] max-md:rounded-none bg-white  '>
        <Link href='/'>
          <Image src='/images/logo-dark.svg' alt='Vercel Logo' width={117} height={40} />
        </Link>

        <Image
          src='/icons/brg-menu.svg'
          alt='menu'
          width={24}
          height={24}
          className='lg:hidden block cursor-pointer'
          onClick={onOpen}
        />

        <nav className='flex lg:gap-5 gap-8 max-lg:hidden'>
          <Link
            href='/'
            className={clsx('px-2 py-3 text-[16px] font-medium', pathname === '/' && 'border-b-1 border-orange-600')}
          >
            About us
          </Link>

          <Link
            href='/directory'
            className={clsx(
              'px-2 py-3 text-[16px] font-medium',
              pathname === '/directory' && 'border-b-1 border-orange-600'
            )}
          >
            Company Directory
          </Link>

          <div>
            <button
              aria-describedby={id}
              onClick={handleClick}
              className={clsx(
                'cursor-pointer px-2 py-3 text-[16px] font-medium flex gap-2',
                pathname.startsWith('/news') && 'border-b-1 border-orange-600'
              )}
            >
              What’s new
              <Image src='/icons/chevron-down.svg' alt='arrow-down' width={24} height={24} />
            </button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <div className='w-[132px] h-[88px] flex flex-col justify-center gap-2'>
                <Link href='/news?tab=news' className='cursor-pointer py-2 px-3 hover:bg-gray-100'>
                  News
                </Link>
                <Link href='/news?tab=events' className='cursor-pointer py-2 px-3 hover:bg-gray-100'>
                  Events
                </Link>
              </div>
            </Popover>
          </div>
          <Link
            href='/contacts'
            className={clsx(
              'px-2 py-3 text-[16px] font-medium',
              pathname === '/contacts' && 'border-b-1 border-orange-600'
            )}
          >
            Contacts & Support
          </Link>
        </nav>

        <div className='max-lg:hidden flex gap-4'>
          <button className='cursor-pointer px-4.5 py-3.5 rounded-[8px] text-white bg-orange-600 font-semibold whitespace-nowrap'>
            Get Started
          </button>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className='cursor-pointer px-4.5 py-3.5 rounded-[8px] text-orange-600 bg-[rgba(255,77,0,0.1)] font-semibold whitespace-nowrap'
          >
            Log In
          </button>
        </div>
      </div>

      {/* <div className='flex items-center max-md:items-start w-full mt-2.5 max-md:mt-0'>
        <div className='relative bg-orange-600 text-white px-4 py-1.5 rounded-[8px] max-md:rounded-none flex items-center justify-between w-full text-sm'>
          <div className='max-md:overflow-x-auto max-md:w-0 flex-1'>
            <div className='flex items-center gap-6 whitespace-nowrap'>
              <p className='whitespace-nowrap'>
                You’re almost there – finish registering your business to get started!
              </p>
              <Link href='#' className='underline font-medium hover:text-white transition whitespace-nowrap'>
                Click to continue
              </Link>
            </div>
          </div>

          <button className='absolute right-4 top-2.5 max-md:static max-md:ml-2 shrink-0' aria-label='Close banner'>
            <Image src='/icons/close.svg' alt='close' width={16} height={16} />
          </button>
        </div>
      </div> */}

      {isLoginModalOpen && (
        <ModalComponent
          title='Welcome Back'
          description='Please log in to continue'
          isOpen={isLoginModalOpen}
          handleClose={() => setIsLoginModalOpen(false)}
        >
          {activeModal === 'register' ? (
            <RegisterForm
              onChange={() => {
                setActiveModal('login');
              }}
            />
          ) : (
            <LoginForm
              onChange={() => {
                setActiveModal('register');
              }}
            />
          )}
        </ModalComponent>
      )}
    </div>
  );
};
