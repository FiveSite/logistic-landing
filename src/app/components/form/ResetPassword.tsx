'use client';

import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/utils/axios';

interface FormValues {
  newPassword: string;
  repeatPassword: string;
}

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Please re-enter the same password.')
    .required('Required'),
});
export const ResetPasswordForm = ({
  onClose,
  onSuccess,
  code,
}: {
  onClose: () => void;
  onSuccess: () => void;
  code: string;
}) => {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    if (!code) {
      setMessage({ type: 'error', text: 'Invalid or missing reset code' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await axiosInstance.post('api/auth/reset-password', {
        code,
        password: values.newPassword,
        passwordConfirmation: values.repeatPassword,
      });

      setTimeout(() => {
        router.push('/');
        onSuccess();
      }, 1500);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to reset password' });
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
        initialValues={{ newPassword: '', repeatPassword: '' }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {() => (
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
            {/* New password */}
            <div className='relative'>
              <label htmlFor='newPassword' className='block text-sm  mb-1'>
                New password <span className='text-red-500'>*</span>
              </label>
              <Field
                id='newPassword'
                name='newPassword'
                type='password'
                placeholder='Your new password'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage
                name='newPassword'
                component='div'
                className='absolute top-[62px] left-0 text-red-500 text-xs mt-1'
              />
            </div>

            {/* Re-enter password */}
            <div className='relative'>
              <label htmlFor='password' className='block text-sm  mb-1'>
                Re-enter password <span className='text-red-500'>*</span>
              </label>
              <Field
                id='repeatPassword'
                name='repeatPassword'
                type='password'
                placeholder='Re-enter your password'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage
                name='repeatPassword'
                component='div'
                className='absolute top-[62px] left-0 text-red-500 text-xs mt-1'
              />
            </div>

            <button
              type='submit'
              className='cursor-pointer mb-2 w-full text-white py-2 px-4 rounded-[100px] bg-orange-600 hover:bg-orange-700 transition mt-4'
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
