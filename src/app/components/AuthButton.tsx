'use client';

import { useState } from 'react';
import { ModalComponent } from './Modal';
import { LoginForm } from './form/LoginForm';
import ArrowRightIcon from '../../../public/icons/arrow-right.svg';
import { ForgotPassword } from './form/ForgotPassword';
import { MemberDialog } from './dialog/MemberDialog';
import { CongratulationDialog } from './dialog/CongratulationDialog';
import { ForgotPasswordSuccessDialog } from './dialog/ForgotPasswordSuccessDialog';

export function AuthButtons() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [isForgotPasswordSuccessOpen, setIsForgotPasswordSuccessOpen] = useState(false);

  return (
    <div className='max-lg:hidden w-fit flex justify-between gap-4'>
      <button
        onClick={() => setIsMemberModalOpen(true)}
        className='cursor-pointer flex items-center gap-2 px-4.5 py-2 rounded-[100px] text-white bg-orange-600 hover:bg-orange-700 whitespace-nowrap'
      >
        Become a Member
        <div className='flex items-center justify-center w-4 h-4'>
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
}
