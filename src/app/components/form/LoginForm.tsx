'use client';

import { signIn } from '@/services/auth';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});
export const LoginForm = ({
  onClose,
  onChange,
  onBecomeMember,
}: {
  onClose: () => void;
  onChange: () => void;
  onBecomeMember: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      const data = await signIn(values.email, values.password);

      if (data) {
        const res = await fetch('/api/auth/set-cookie', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: data.jwt }),
        });

        if (res.ok) {
          onClose();
          router.push('/directory');
          router.refresh();
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='pt-6'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className='flex flex-col gap-4 max-w-md mx-auto'>
            {/* Email */}
            <div className='relative'>
              <label htmlFor='email' className='block text-sm  mb-1 '>
                Email
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <Field
                id='email'
                name='email'
                type='email'
                placeholder='Your email'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage name='email' component='div' className='absolute top-[66px] left-0 text-red-500 text-xs' />
            </div>

            {/* Password */}
            <div className='relative'>
              <label htmlFor='password' className='block text-sm  mb-1 '>
                Password
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <Field
                id='password'
                name='password'
                type='password'
                placeholder='Your password'
                className=' w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='absolute top-[66px] left-0 text-red-500 text-xs'
              />
            </div>

            <div className='flex items-center justify-end text-sm '>
              <p onClick={onChange} className=' hover:underline cursor-pointer'>
                Forgot Password?
              </p>
            </div>

            <button
              type='submit'
              className='cursor-pointer mb-2 w-full text-white py-2 px-4 rounded-[100px] bg-orange-600 hover:bg-orange-700 transition'
            >
              {isSubmitting ? 'Signing in...' : ' Sign in'}
            </button>

            <div className='h-[1px] w-full bg-[#E1E4ED]'></div>

            <p className='text-center text-sm text-orange-600 mt-2'>
              No account yet?{' '}
              <button
                onClick={onBecomeMember}
                className=' ml-1 text-orange-600 font-medium hover:underline cursor-pointer'
              >
                Become a member
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
