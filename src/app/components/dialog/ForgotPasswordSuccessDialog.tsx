import { Modal } from '@mui/material';
import Link from 'next/link';
import ArrowRightIcon from '../../../../public/icons/arrow-right.svg';
import iconAnimation from '../../anim.json';

import Lottie from 'lottie-react';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const ForgotPasswordSuccessDialog = ({ isOpen, handleClose }: ModalProps) => {
  return (
    <div>
      <Modal open={isOpen} onClose={handleClose} className='flex items-center justify-center'>
        <div className='bg-white p-10 rounded-lg flex flex-col  max-w-[538px] w-full overflow-hidden'>
          <div className='w-[346px] h-auto mx-auto'>
            <Lottie animationData={iconAnimation} loop={true} />
          </div>
          <h2 className='text-[30px] leading-[30px] font-bold mb-6 text-center text-orange-600'>Check your email!</h2>
          <p className='mb-[56px] text-[16px] text-center'>
            Thanks! An email was sent that will ask you to click on a link to verify that you own this account. If you
            don&#39;t get the email, please contact support@kinety.com
          </p>
          <Link
            href='/'
            onClick={handleClose}
            className='flex items-center justify-center gap-1 cursor-pointer  w-full text-white py-2 rounded-[100px] bg-orange-600 hover:bg-orange-700 transition'
          >
            Go to Home page
            <div className='flex items-center justify-center w-4 h-4'>
              <ArrowRightIcon className='stroke-white' />
            </div>
          </Link>
        </div>
      </Modal>
    </div>
  );
};
