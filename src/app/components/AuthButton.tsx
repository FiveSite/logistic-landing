'use client';

import { useState } from 'react';
import { ModalComponent } from './Modal';
import { LoginForm } from './form/LoginForm';
import { MemberForm } from './form/MemberForm';
import ArrowRightIcon from '../../../public/icons/arrow-right.svg';

export function AuthButtons() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  return (
    <div className='max-lg:hidden w-fit flex justify-between gap-4'>
      <button
        onClick={() => setIsMemberModalOpen(true)}
        className='cursor-pointer flex items-center gap-4 px-4.5 py-2 rounded-[100px] text-white bg-orange-600 hover:bg-orange-700 whitespace-nowrap'
      >
        Become a Member
        <div className='flex items-center justify-center w-5 h-5'>
          <ArrowRightIcon className='stroke-white' />
        </div>
      </button>

      <button
        onClick={() => setIsLoginModalOpen(true)}
        className='cursor-pointer px-4.5 py-2 rounded-[100px] text-orange-600 bg-[rgba(255,77,0,0.1)] hover:bg-[rgba(255,77,0,0.2)]  whitespace-nowrap '
      >
        Sign in
      </button>

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
            }}
          />
        </ModalComponent>
      )}

      {isMemberModalOpen && (
        <ModalComponent
          title='Become a Member'
          description='Please fill out the form below'
          isOpen={isMemberModalOpen}
          handleClose={() => setIsMemberModalOpen(false)}
        >
          <MemberForm onChange={() => setIsMemberModalOpen(false)} />
        </ModalComponent>
      )}
    </div>
  );
}
