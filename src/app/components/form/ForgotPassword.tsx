'use client';

import { Field, Form, Formik, ErrorMessage } from 'formik';
import ArrowLeftIcon from '../../../../public/icons/arrow-left.svg';
import * as yup from 'yup';
import { axiosInstance } from '@/utils/axios';
import { useEffect, useState } from 'react';

interface FormValues {
  email: string;
}

const currentSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid email').required('Email is required'),
});
export const ForgotPassword = ({
  onClose,
  onChange,
  onSuccess,
}: {
  onClose: () => void;
  onChange: () => void;
  onSuccess: () => void;
}) => {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setMessage(null);
    setIsSubmitting(true);

    try {
      await axiosInstance.post('api/auth/forgot-password', { email: values.email });

      onSuccess();
    } catch (err) {
      console.log('err', err);
      setMessage({ type: 'error', text: 'Failed to send email' });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message]);

  return (
    <div className='pt-6'>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={currentSchema}
      >
        {({}) => (
          <Form className='flex flex-col gap-4 max-w-md mx-auto'>
            {message && (
              <div
                className={`p-3 rounded-md text-sm relative  ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                {message.text}
                <button
                  className={
                    'absolute top-3 right-2 ' + (message.type === 'success' ? 'text-green-700' : 'text-red-700')
                  }
                  onClick={() => setMessage(null)}
                >
                  &times;
                </button>
              </div>
            )}
            {/* Email */}
            <div className='relative'>
              <label htmlFor='email' className='block text-sm  mb-1'>
                Email <span className='text-red-500'>*</span>
              </label>
              <Field
                id='email'
                name='email'
                type='email'
                placeholder='Your email'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='absolute top-[62px] left-0 text-red-500 text-xs mt-1'
              />
            </div>

            <button
              disabled={isSubmitting}
              type='submit'
              className='cursor-pointer mt-4 mb-2 w-full text-white py-2 px-4 rounded-[100px] bg-orange-600 hover:bg-orange-700 transition-all ease-in-out duration-300'
            >
              {isSubmitting ? 'Sending...' : ' Send email'}
            </button>

            <div className='h-[1px] w-full bg-[#E1E4ED]'></div>

            <div className='text-center mx-auto mt-2'>
              <button
                onClick={onChange}
                className='flex text-[16px] items-center gap-2 font-medium hover:underline cursor-pointer'
              >
                <div className='flex items-center justify-center w-4 h-4'>
                  <ArrowLeftIcon className='stroke-white' />
                </div>
                Back to Sign in
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
