'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import { ModalComponent } from './Modal';
import { LoginForm } from './form/LoginForm';
import { ForgotPassword } from './form/ForgotPassword';
import { MemberDialog } from './dialog/MemberDialog';
import { CongratulationDialog } from './dialog/CongratulationDialog';
import { ForgotPasswordSuccessDialog } from './dialog/ForgotPasswordSuccessDialog';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { nextAxios } from '@/utils/axios-next';
import ArrowIcon from '../../../public/icons/chevron-down.svg';
import LogoutIcon from '../../../public/icons/logout-icon.svg';

export const MobMenu = ({
  onClose,
  user,
  onOpenLogin,
  onOpenMember,
  onOpenCongrats,
}: {
  onClose: () => void;
  user: User;
  onOpenLogin: () => void;
  onOpenMember: () => void;
  onOpenCongrats: () => void;
}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [isForgotPasswordSuccessOpen, setIsForgotPasswordSuccessOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await nextAxios.post('/api/auth/logout');

    router.push('/');
    router.refresh();
    onClose();
  };

  const handleDirectoryClick = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    router.push('/directory');
    onClose();
  };

  return (
    <div className='fixed inset-0 z-20 flex justify-end bg-black/20 ' onClick={onClose}>
      <div
        className='bg-white h-[100dvh] overflow-y-auto w-[334px] flex flex-col justify-between'
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div className='absolute top-0 left-0 right-0 z-20  bg-black/20'> */}
        {/* <div className='bg-white h-[100dvh] overflow-y-auto w-[334px] flex flex-col justify-between'> */}
        <div>
          <div className='flex items-center justify-between px-6 py-4.5'>
            <Link href='/'>
              <Image src='/images/logo-dark.svg' alt='logo' width={114} height={38} />
            </Link>
            <Image onClick={onClose} src='/icons/double-arrow.svg' alt='logo' width={24} height={24} />
          </div>

          <nav className='flex flex-col gap-6 mt-8 mb-8 px-6'>
            <p
              className={clsx(
                pathname === '/' && 'border-b border-orange-600',
                'h-10 text-[16px] px-2 py-3 font-medium'
              )}
              onClick={() => {
                router.push('/');
                onClose();
              }}
            >
              Home
            </p>
            <p
              className={clsx(
                pathname === '/about' && 'border-b border-orange-600',
                'h-10 text-[16px] px-2 py-3 font-medium'
              )}
              onClick={() => {
                router.push('/about');
                onClose();
              }}
            >
              About us
            </p>
            <p
              className={clsx(
                pathname === '/directory' && 'border-b border-orange-600',
                'h-10 text-[16px] px-2 py-3 font-medium'
              )}
              onClick={handleDirectoryClick}
            >
              Company Directory
            </p>
            <p
              className={clsx(
                pathname === '/news?tab=news' && 'border-b border-orange-600',
                'h-10 text-[16px] px-2 py-3 font-medium flex gap-2'
              )}
              onClick={() => {
                router.push('/news?tab=news');
                onClose();
              }}
            >
              News
              <Image src='/icons/arrow-right.svg' alt='logo' width={24} height={24} />
            </p>

            <p
              className={clsx(
                pathname === '/news?tab=events' && 'border-b border-orange-600',
                'h-10 text-[16px] px-2 py-3 font-medium flex gap-2'
              )}
              onClick={() => {
                router.push('/news?tab=events');
                onClose();
              }}
            >
              Events
              <Image src='/icons/arrow-right.svg' alt='logo' width={24} height={24} />
            </p>
          </nav>
        </div>

        {user ? (
          <div className='px-6 py-6 border-t border-gray-200'>
            <div
              className='flex gap-6 items-center'
              onClick={() => {
                router.push('/profile');
                onClose();
              }}
            >
              <div className='cursor-pointer text-2xl font-bold rounded-full w-[56px] h-[56px] flex items-center justify-center bg-gray-100'>
                {user.companyLogo && user.companyLogo.url ? (
                  <Image
                    src={user.companyLogo.url}
                    alt='user'
                    width={56}
                    height={56}
                    className='rounded-full shrink-0 object-cover w-full h-full'
                  />
                ) : (
                  <Image src='/images/avatar.png' alt='user' width={56} height={56} />
                )}
              </div>
              <div>
                <p className='flex items-center gap-1 cursor-pointer mb-1'>{user.contactName}</p>
                <p className='flex items-center gap-1 text-orange-600 px-2 py-0.5 rounded-[100px] bg-orange-200 cursor-pointer'>
                  {user.company}
                </p>
              </div>
              <div className='flex items-center justify-center w-5 h-5'>
                <ArrowIcon className='rotate-270' />
              </div>
            </div>

            <div
              className='cursor-pointer py-2 px-2 flex items-center gap-2 text-[#D21717] mt-4'
              onClick={handleLogout}
            >
              Logout
              <div className='flex items-center justify-center w-5 h-5'>
                <LogoutIcon className='' />
              </div>
            </div>
          </div>
        ) : (
          <div className='px-6 flex flex-col gap-4 py-6 border-t border-gray-200'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenMember();
                onClose();
              }}
              className='w-full h-[52px] flex items-center justify-center text-white bg-orange-600 rounded-[100px]'
            >
              Become member
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenLogin();
                onClose();
              }}
              className='w-full h-[52px] flex items-center justify-center text-orange-600 rounded-[100px] bg-[rgba(255,77,0,0.1)]'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
