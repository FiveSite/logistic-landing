'use client';

import { signIn } from '@/services/auth';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FormValues {
  email: string;
  password: string;
}
export const LoginForm = ({ onChange }: { onChange: () => void }) => {
  const router = useRouter();
  const handleSubmit = async (values: FormValues) => {
    console.log(values);
    try {
      const data = await signIn(values.email, values.password);

      if (data) {
        const res = await fetch('/api/auth/set-cookie', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: data.jwt }),
        });

        if (res.ok) {
          console.log('Token set in cookie');
          router.refresh();
          onChange();
        }
      }

      console.log('data', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='pt-6'>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={(values) => handleSubmit(values)}>
        {() => (
          <Form className='flex flex-col gap-4 max-w-md mx-auto'>
            {/* Email */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                Email Address
              </label>
              <Field
                id='email'
                name='email'
                type='email'
                placeholder='Type your email'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                Password
              </label>
              <Field
                id='password'
                name='password'
                type='password'
                placeholder='Type your password'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
              />
              <p className='text-xs text-gray-500 mt-1'>
                It must be a combination of minimum 8 letters, numbers, and symbols.
              </p>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between text-sm text-gray-600'>
              {/* <label className='flex items-center gap-2'>
                <Field type='checkbox' name='remember' className='accent-orange-600' />
                Remember me
              </label> */}
              <a href='#' className='text-orange-600 hover:underline'>
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full text-white py-2 px-4 rounded-[8px] bg-orange-600 hover:bg-orange-700 transition'
            >
              Log In
            </button>

            {/* Divider */}
            <div className='text-center text-sm text-gray-500'>or log in with</div>

            {/* Social Buttons */}
            <div className='flex gap-4 justify-center'>
              <button className='flex items-center gap-2 border border-gray-300 rounded-md py-2 px-4 w-full justify-center'>
                <Image src='/icons/google.svg' alt='Google' width={20} height={20} />
                Google
              </button>
              <button className='flex items-center gap-2 border border-gray-300 rounded-md py-2 px-4 w-full justify-center'>
                <Image src='/icons/apple.svg' alt='Apple' width={20} height={20} />
                Apple
              </button>
            </div>

            {/* <p className='text-center text-sm text-gray-600 mt-4'>
              No account yet?{' '}
              <button onClick={onChange} className='text-orange-600 font-medium hover:underline'>
                Sign Up
              </button>
            </p> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};
