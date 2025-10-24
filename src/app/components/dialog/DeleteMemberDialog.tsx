'use client';

import { Modal } from '@mui/material';
import iconAnimation from '../../deleting.json';
import Lottie from 'lottie-react';
import axios from 'axios';
import { User } from '@/types';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  user: User;
}

export const DeleteMemberDialog = ({ isOpen, handleClose, user }: ModalProps) => {
  const handleSendRequest = async () => {
    try {
      const data = {
        email: user.email,
        company: user.company,
        message: 'I want to delete my account',
        form: 'Deleting',
      };
      await axios.post('/api/send-email', data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal open={isOpen} onClose={handleClose} className='flex items-center justify-center'>
        <div className='bg-white p-10 max-sm:px-4 rounded-lg flex flex-col  max-w-[538px] w-full overflow-hidden'>
          <div className='w-[346px] h-auto mx-auto'>
            <Lottie animationData={iconAnimation} loop={true} />
          </div>
          <h2 className='text-[30px] leading-[30px] font-bold mb-6 text-center text-orange-600'>Delete Account</h2>
          <p className='mb-[56px] text-[16px] text-center'>
            We’ll forward your request to our team for approval. You’ll get an email once it’s confirmed.
          </p>
          <div className='flex flex-col gap-4'>
            <button
              onClick={handleSendRequest}
              className='flex items-center justify-center gap-1 cursor-pointer  w-full text-white py-2 rounded-[100px] bg-orange-600 hover:bg-orange-700 transition'
            >
              Send request
            </button>
            <button
              onClick={handleClose}
              className='flex items-center justify-center gap-1 cursor-pointer  w-full text-orange-600 py-2 rounded-[100px] bg-white border border-orange-600 hover:bg-orange-50 transition'
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
