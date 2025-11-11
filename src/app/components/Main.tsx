'use client';

import Image from 'next/image';
import { ResetPasswordForm } from './form/ResetPassword';
import { ModalComponent } from './Modal';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResetSuccessDialog } from './dialog/ResetSuccessDialog';
import { LoginForm } from './form/LoginForm';
import { MemberDialog } from './dialog/MemberDialog';
import { CongratulationDialog } from './dialog/CongratulationDialog';
import { ForgotPassword } from './form/ForgotPassword';
import { ForgotPasswordSuccessDialog } from './dialog/ForgotPasswordSuccessDialog';
import { Media, User } from '@/types';
import { MainBackground } from './MainBackground';

export const Main = ({
  user,
  data,
  partners,
}: {
  user: User;
  data: { title: string; afterTitle: string };
  partners: { id: number; image: Media }[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [isForgotPasswordSuccessOpen, setIsForgotPasswordSuccessOpen] = useState(false);

  const router = useRouter();
  console.log('partners', partners);

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      setIsModalOpen(true);
    }
  }, [code]);

  return (
    <section className=' w-screen relative overflow-hidden'>
      <MainBackground />
      <div className='xl:px-[300px] lg:pt-[360px] pt-[170px] max-sm:px-4 sm:px-8 relative'>
        <h1 className='sr-only'>African Alliance Logistics Network: Global Partner Platform</h1>
        <h2 className='text-[62px] max-md:text-[36px] font-bold text-[#1A1A1A] text-center leading-[62px] max-md:leading-[36px] mb-8 max-md:mb-6'>
          {data.title}
        </h2>
        <p className='text-[18px] max-md:text-[16px] text-[#1A1A1A] text-center mb-12'>{data.afterTitle}</p>

        <div className='relative flex justify-center gap-6 md:px-4 w-full mb-[100px] max-md:mb-10'>
          <button
            onClick={() => router.push('/about')}
            className='whitespace-nowrap h-10 border border-[#E1E4ED] hover:bg-gray-50 shadow-xs cursor-pointer flex items-center gap-2 font-semibold  text-[16px] bg-white px-8 py-3 rounded-[100px] transition-all ease-in  duration-300 '
          >
            About us
          </button>

          {!user && (
            <button
              onClick={() => {
                setIsMemberModalOpen(true);
              }}
              className='whitespace-nowrap h-10 flex items-center cursor-pointer  shadow-xs text-white text-[16px] bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-[100px] transition-all ease-in  duration-300 '
            >
              Become a member
            </button>
          )}
        </div>
      </div>

      <div className='w-full overflow-x-auto '>
        <div className='relative flex lg:flex-wrap justify-center max-lg:justify-start gap-[14px] max-w-[1106px] mx-auto  max-md:px-4 px-10 '>
          {partners?.length > 0
            ? partners.map((partner) => (
                <div
                  key={partner.id}
                  className='flex items-center justify-center px-8 max-lg:px-6 h-[74px] bg-white rounded-[8px] border border-[#F1F3F7] shadow-[0px_1px_4px_0px_rgba(25,33,61,0.08)] w-fit shrink-0'
                >
                  <Image
                    src={partner.image?.url ?? ''}
                    alt='cards'
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='h-[34px] w-auto grayscale  object-contain'
                  />
                </div>
              ))
            : null}

          <div className='absolute max-lg:hidden left-0 right-0 bottom-0 top-0  bg-gradient-to-r from-[#F6F6F6] via-[#F6F6F6]/0 to-[#F6F6F6]'></div>
        </div>
      </div>

      {isModalOpen && code && (
        <ModalComponent
          title='Reset Password'
          description='Please kindly set your new password.'
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
        >
          <ResetPasswordForm
            //onChange={() => {}}
            code={code}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              setIsModalOpen(false);
              setIsSuccessModalOpen(true);
            }}
          />
        </ModalComponent>
      )}
      {isSuccessModalOpen && (
        <ResetSuccessDialog
          isOpen={isSuccessModalOpen}
          handleClose={() => setIsSuccessModalOpen(false)}
          onSuccess={() => {
            setIsSuccessModalOpen(false);
            setIsLoginModalOpen(true);
          }}
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
      {isForgotPasswordSuccessOpen && (
        <ForgotPasswordSuccessDialog
          isOpen={isForgotPasswordSuccessOpen}
          handleClose={() => setIsForgotPasswordSuccessOpen(false)}
        />
      )}
      {isCongratsOpen && <CongratulationDialog isOpen={isCongratsOpen} handleClose={() => setIsCongratsOpen(false)} />}
    </section>
  );
};
