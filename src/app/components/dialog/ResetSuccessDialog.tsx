import { Modal } from '@mui/material';
import Link from 'next/link';
import iconAnimation from '../../lock.json';
import Lottie from 'lottie-react';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  onSuccess: () => void;
}

export const ResetSuccessDialog = ({ isOpen, handleClose, onSuccess }: ModalProps) => {
  return (
    <div>
      <Modal open={isOpen} onClose={handleClose} className='flex items-center justify-center'>
        <div className='bg-white p-10 rounded-lg flex flex-col  max-w-[538px] w-full overflow-hidden'>
          <div className='w-[290px] h-auto mx-auto'>
            <Lottie animationData={iconAnimation} loop={true} />
          </div>
          <h2 className='text-[30px] leading-[30px] font-bold mb-6 text-center text-orange-600'>Password changed!</h2>
          <p className='mb-[56px] text-[16px] text-center'>You&#39;ve Successfully Completed Your Password Reset!</p>
          <Link
            href='/'
            onClick={handleClose}
            className='flex items-center justify-center gap-1 cursor-pointer  w-full text-white py-2 rounded-[100px] bg-orange-600 hover:bg-orange-700 transition'
          >
            Sign in
          </Link>
        </div>
      </Modal>
    </div>
  );
};
