'use client';

import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

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
  //onChange,
  onSuccess,
  code,
}: {
  onClose: () => void;
  //onChange: () => void;
  onSuccess: () => void;
  code: string;
}) => {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const searchParams = useSearchParams();
  //const code = searchParams.get('code');

  const handleSubmit = async (values: FormValues) => {
    if (!code) {
      setMessage({ type: 'error', text: 'Invalid or missing reset code' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:1337/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          password: values.newPassword,
          passwordConfirmation: values.repeatPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data) {
        setMessage({ type: 'success', text: 'Password reset successfully!' });
        setTimeout(() => {
          router.push('/');
          onSuccess();
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to reset password' });
      }
      console.log('data', data);
    } catch (error) {
      console.log('err', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className={`p-3 rounded-md text-sm ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}
            {/* New password */}
            <div>
              <label htmlFor='newPassword' className='block text-sm font-semibold mb-1'>
                New password
              </label>
              <Field
                id='newPassword'
                name='newPassword'
                type='password'
                placeholder='Your new password'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage name='newPassword' component='div' className='text-red-500 text-xs mt-1' />
            </div>

            {/* Re-enter password */}
            <div>
              <label htmlFor='password' className='block text-sm font-semibold mb-1'>
                Re-enter password
              </label>
              <Field
                id='repeatPassword'
                name='repeatPassword'
                type='password'
                placeholder='Re-enter your password'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage name='repeatPassword' component='div' className='text-red-500 text-xs mt-1' />
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='cursor-pointer mb-2 w-full text-white py-2 px-4 rounded-[100px] bg-orange-600 hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>

            <div className='h-[1px] w-full bg-[#E1E4ED]'></div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
