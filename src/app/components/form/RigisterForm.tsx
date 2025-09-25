import { Field, Form, Formik } from 'formik';
import Image from 'next/image';

export const RegisterForm = ({ onChange }: { onChange: () => void }) => {
  return (
    <div className='pt-6'>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <Form className='flex flex-col gap-4 max-w-md mx-auto'>
            <div className='flex justify-between gap-4'>
              <div className='w-full'>
                <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-1'>
                  First Name
                </label>
                <Field
                  id='firstName'
                  name='firstName'
                  type='firstName'
                  placeholder='Type your first name'
                  className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
                />
              </div>

              <div className='w-full'>
                <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-1'>
                  Last Name
                </label>
                <Field
                  id='lastName'
                  name='lastName'
                  type='lastName'
                  placeholder='Type your last name'
                  className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
                />
              </div>
            </div>

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

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full text-white py-2 px-4 rounded-[8px] bg-orange-600 hover:bg-orange-700 transition'
            >
              Sign Up
            </button>

            {/* Divider */}
            <div className='text-center text-sm text-gray-500'>or sign up with</div>

            {/* Social Buttons */}
            <div className='flex gap-4 justify-center'>
              <button className='flex items-center gap-2 border border-gray-300 rounded-md py-2 px-4 w-full justify-center'>
                <Image src='/icons/google.svg' alt='Google' width={20} height={20} />
                Google
              </button>
              <button className='flex items-center gap-2 border border-gray-300 rounded-md py-2 px-4 w-full justify-center'>
                <Image src='/icons/apple.sg' alt='Apple' width={20} height={20} />
                Apple
              </button>
            </div>

            {/* Sign Up link */}
            <p className='text-center text-sm text-gray-600 mt-4'>
              Already have an account?{' '}
              <button onClick={onChange} className='text-orange-600 font-medium hover:underline'>
                Log In
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
