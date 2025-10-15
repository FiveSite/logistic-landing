'use client';

import React, { useState } from 'react';
import { NavLink } from './NavLink';
import { User } from '@/types';
import { ModalComponent } from './Modal';
import { LoginForm } from './form/LoginForm';
import { ForgotPassword } from './form/ForgotPassword';
import { MemberDialog } from './dialog/MemberDialog';
import { CongratulationDialog } from './dialog/CongratulationDialog';
import { ForgotPasswordSuccessDialog } from './dialog/ForgotPasswordSuccessDialog';

interface DirectoryLinkProps {
  user: User;
  isFooter?: boolean;
}

export const DirectoryLink: React.FC<DirectoryLinkProps> = ({ user, isFooter = false }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [isForgotPasswordSuccessOpen, setIsForgotPasswordSuccessOpen] = useState(false);

  return (
    <>
      <NavLink
        isFooter={isFooter}
        href={user ? '/directory' : '#'}
        text='Company Directory'
        onClick={() => {
          if (user) return;
          setIsLoginModalOpen(true);
        }}
      />
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
    </>
  );
};
