'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AuthButtons } from './AuthButton';
import { UserMenu } from './UserMenu';
import { NewsButton } from './NewsButton';
import { NavLink } from './NavLink';
import { DirectoryLink } from './DirectoryLink';
import { MobMenu } from './MobMenu';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { MemberDialog } from './dialog/MemberDialog';
import { CongratulationDialog } from './dialog/CongratulationDialog';
import { ForgotPasswordSuccessDialog } from './dialog/ForgotPasswordSuccessDialog';
import { ModalComponent } from './Modal';
import { ForgotPassword } from './form/ForgotPassword';
import { LoginForm } from './form/LoginForm';

export const Header = ({ user }: { user: User }) => {
  const [isMobMenuOpen, setIsMobMenuOpen] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [isForgotPasswordSuccessOpen, setIsForgotPasswordSuccessOpen] = useState(false);

  useEffect(() => {
    if (isMobMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      <div className='relative z-10 flex items-center justify-between px-6 py-3.5 rounded-[20px] max-lg:rounded-none bg-white  '>
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
      {isMobMenuOpen && (
        <MobMenu
          onClose={() => setIsMobMenuOpen(false)}
          user={user}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onOpenMember={() => setIsMemberModalOpen(true)}
          onOpenCongrats={() => setIsCongratsOpen(true)}
        />
      )}

      {isLoginModalOpen && (
        <ModalComponent
          title='Welcome Back'
          description='Please log in to continue'
          isOpen={isLoginModalOpen}
          handleClose={() => setIsLoginModalOpen(false)}
        >
          <LoginForm
            onChange={() => {
              setIsLoginModalOpen(false);
              setIsForgotPasswordModalOpen(true);
            }}
            onClose={() => {
              setIsLoginModalOpen(false);
            }}
            onBecomeMember={() => {
              setIsLoginModalOpen(false);
              setIsMemberModalOpen(true);
            }}
          />
        </ModalComponent>
      )}

      {isForgotPasswordModalOpen && (
        <ModalComponent
          title='Forgot your password?'
          description='Enter your email to get a reset link'
          isOpen={isForgotPasswordModalOpen}
          handleClose={() => setIsForgotPasswordModalOpen(false)}
        >
          <ForgotPassword
            onChange={() => {
              setIsForgotPasswordModalOpen(false);
              setIsLoginModalOpen(true);
            }}
            onClose={() => {
              setIsForgotPasswordModalOpen(false);
            }}
            onSuccess={() => {
              setIsForgotPasswordModalOpen(false);
              setIsForgotPasswordSuccessOpen(true);
            }}
          />
        </ModalComponent>
      )}

      {isMemberModalOpen && (
        <MemberDialog
          isOpen={isMemberModalOpen}
          handleClose={() => setIsMemberModalOpen(false)}
          onChange={() => {
            setIsMemberModalOpen(false);
            setIsLoginModalOpen(true);
          }}
          onSuccess={() => {
            setIsMemberModalOpen(false);
            setIsCongratsOpen(true);
          }}
        />
      )}

      {isCongratsOpen && <CongratulationDialog isOpen={isCongratsOpen} handleClose={() => setIsCongratsOpen(false)} />}
      {isForgotPasswordSuccessOpen && (
        <ForgotPasswordSuccessDialog
          isOpen={isForgotPasswordSuccessOpen}
          handleClose={() => setIsForgotPasswordSuccessOpen(false)}
        />
      )}
    </div>
  );
};
