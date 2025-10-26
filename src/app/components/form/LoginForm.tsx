'use client';

import { signIn } from '@/services/auth';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const router = useRouter();
  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const data = await signIn(values.email, values.password);

      if (data) {
        const res = await axios.post(
          '/api/auth/set-cookie',
          { token: data.jwt },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('res', res);
        if (res) {
          onClose();
          router.push('/directory');
          router.refresh();
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Network error. Please try again.';

      setMessage({ type: 'error', text: message });
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
        initialValues={{ email: '', password: '' }}
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
