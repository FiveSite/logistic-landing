'use client';

import Image from 'next/image';
import ArrowRightIcon from '../../../public/icons/arrow-right.svg';
import { ResetPasswordForm } from './form/ResetPassword';
import { ModalComponent } from './Modal';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResetSuccessDialog } from './dialog/ResetSuccessDialog';
import { LoginForm } from './form/LoginForm';
import { MemberDialog } from './dialog/MemberDialog';
import { CongratulationDialog } from './dialog/CongratulationDialog';
import { ForgotPassword } from './form/ForgotPassword';
import { ForgotPasswordSuccessDialog } from './dialog/ForgotPasswordSuccessDialog';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Main = ({ user }: { user: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [isForgotPasswordSuccessOpen, setIsForgotPasswordSuccessOpen] = useState(false);

  console.log('user', user);

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      setIsModalOpen(true);
    }
  }, [code]);

  return (
    <section className="bg-[url('/images/main-bg.png')] bg-cover bg-no-repeat ">
      <div className='xl:px-[420px] pt-[360px] max-md:pt-[100px] max-md:px-8'>
        <h1 className='text-[62px] max-md:text-[36px] font-bold text-[#1A1A1A] text-center leading-[62px] max-md:leading-[36px] mb-8 max-md:mb-6'>
          African Alliance Logistics Network
        </h1>
        <p className='text-[18px] max-md:text-[16px] text-[#1A1A1A] text-center mb-12'>
          Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam
          neques.
        </p>

        <div className='relative flex justify-center gap-6 md:px-4 w-full mb-[100px] max-md:mb-10'>
          <button className=' border border-[#E1E4ED] hover:bg-gray-50 shadow-xs cursor-pointer flex items-center gap-2   text-[16px] bg-white px-8 py-3.5 rounded-[100px] transition-all ease-in  duration-300 '>
            About us
            {/* <div className='flex items-center justify-center w-5 h-5'>
              <ArrowRightIcon className='stroke-white' />
            </div> */}
          </button>

          {!user && (
            <button
              onClick={() => {
                setIsMemberModalOpen(true);
              }}
              className=' cursor-pointer flex items-center gap-2 shadow-xs text-white text-[16px] bg-orange-600 hover:bg-orange-700 px-8 py-3.5 rounded-[100px] transition-all ease-in  duration-300 '
            >
              Become a member
              <div className='flex items-center justify-center w-4 h-4'>
                <ArrowRightIcon className='stroke-white' />
              </div>
            </button>
          )}
        </div>
      </div>

      <div className='w-full overflow-x-auto  max-md:px-4 px-10 '>
        <div className='relative flex justify-center max-lg:justify-start  gap-4 max-w-[1106px] mx-auto'>
          <div className='flex items-center justify-center px-8 max-lg:px-6 h-[74px] bg-white rounded-[20px] border border-[#F1F3F7] w-fit shrink-0'>
            <Image src='/images/item1.png' alt='cards' width={82} height={22} />
          </div>
          <div className='flex items-center justify-center px-8 max-lg:px-6 h-[74px] bg-white rounded-[20px] border border-[#F1F3F7] w-fit shrink-0'>
            <Image src='/images/item2.png' alt='cards' width={82} height={22} />
          </div>
          <div className='flex items-center justify-center px-8 max-lg:px-6 h-[74px] bg-white rounded-[20px] border border-[#F1F3F7] w-fit shrink-0'>
            <Image src='/images/item3.png' alt='cards' width={82} height={22} />
          </div>
          <div className='flex items-center justify-center px-8 max-lg:px-6 h-[74px] bg-white rounded-[20px] border border-[#F1F3F7] w-fit shrink-0'>
            <Image src='/images/item4.png' alt='cards' width={82} height={22} />
          </div>
          <div className='flex items-center justify-center px-8 max-lg:px-6 h-[74px] bg-white rounded-[20px] border border-[#F1F3F7] w-fit shrink-0'>
            <Image src='/images/item5.png' alt='cards' width={82} height={22} />
          </div>

          <div className='absolute max-lg:hidden left-0 right-0 bottom-0 top-0 h-[74px] bg-gradient-to-r from-[#F6F6F6] via-[#F6F6F6]/0 to-[#F6F6F6]'></div>
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
        <ResetSuccessDialog isOpen={isSuccessModalOpen} handleClose={() => setIsSuccessModalOpen(false)} />
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
