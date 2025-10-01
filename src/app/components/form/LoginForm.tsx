'use client';

import { signIn } from '@/services/auth';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

interface FormValues {
  email: string;
  password: string;
}
export const LoginForm = ({
  onClose,
  onChange,
  onBecomeMember,
}: {
  onClose: () => void;
  onChange: () => void;
  onBecomeMember: () => void;
}) => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string().email('Enter a valid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });
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
          onClose();
        }
      }

      console.log('data', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='pt-6'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className='flex flex-col gap-4 max-w-md mx-auto'>
            {/* Email */}
            <div>
              <label htmlFor='email' className='block text-sm font-semibold mb-1'>
                Email
              </label>
              <Field
                id='email'
                name='email'
                type='email'
                placeholder='Your email'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              {touched.email && errors.email ? (
                <div className='text-red-600 text-[12px] mt-1'>{errors.email}</div>
              ) : null}
            </div>

            {/* Password */}
            <div>
              <label htmlFor='password' className='block text-sm font-semibold mb-1'>
                Password
              </label>
              <Field
                id='password'
                name='password'
                type='password'
                placeholder='Your password'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <p className='text-xs text-gray-500 mt-1'>
                It must be a combination of minimum 8 letters, numbers, and symbols.
              </p>
              {touched.password && errors.password ? (
                <div className='text-red-600 text-[12px]'>{errors.password}</div>
              ) : null}
            </div>

            <div className='flex items-center justify-end text-sm '>
              <p onClick={onChange} className=' hover:underline cursor-pointer'>
                Forgot Password?
              </p>
            </div>

            <button
              type='submit'
              className='cursor-pointer mb-2 w-full text-white py-2 px-4 rounded-[100px] bg-orange-600 hover:bg-orange-700 transition easy-in-out duration-300'
            >
              Sign in
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
