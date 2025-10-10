'use client';

import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { nextAxios } from '@/utils/axios-next';
import { useState } from 'react';

interface FormValues {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Please re-enter the same password.')
    .required('Required'),
});
export const ChangePasswordForm = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    console.log('Submitted values:', values);
    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await nextAxios.post('/api/auth/change-password', values);
      console.log('Password changed successfully:', res);
      router.refresh();

      onClose();
      onSuccess();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error changing password:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='pt-6'>
      <Formik
        initialValues={{ currentPassword: '', password: '', passwordConfirmation: '' }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className='flex flex-col gap-4 max-w-md mx-auto'>
            {message && (
              <div
                className={`p-3 rounded-md text-sm ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}
            {/* New password */}
            <div>
              <label htmlFor='newPassword' className='block text-sm font-semibold mb-1'>
                Current password <span className='text-red-500'>*</span>
              </label>
              <Field
                id='currentPassword'
                name='currentPassword'
                type='password'
                placeholder='Your current password'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage name='currentPassword' component='div' className='text-red-500 text-xs mt-1' />
            </div>

            {/* New password */}
            <div>
              <label htmlFor='newPassword' className='block text-sm font-semibold mb-1'>
                New password <span className='text-red-500'>*</span>
              </label>
              <Field
                id='password'
                name='password'
                type='password'
                placeholder='Your new password'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage name='password' component='div' className='text-red-500 text-xs mt-1' />
            </div>

            {/* Re-enter password */}
            <div>
              <label htmlFor='password' className='block text-sm font-semibold mb-1'>
                Re-enter password <span className='text-red-500'>*</span>
              </label>
              <Field
                id='passwordConfirmation'
                name='passwordConfirmation'
                type='password'
                placeholder='Re-enter your password'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage name='passwordConfirmation' component='div' className='text-red-500 text-xs mt-1' />
            </div>

            <button
              type='submit'
              className='cursor-pointer mb-2 w-full text-white py-2 px-4 rounded-[100px] bg-orange-600 hover:bg-orange-700 transition'
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
