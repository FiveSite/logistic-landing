'use client';

import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';

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
  //const searchParams = useSearchParams();
  //const code = searchParams.get('code');

  const handleSubmit = async (values: FormValues) => {
    if (!code) {
      console.log('Invalid or missing code');
      return;
    }

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

      if (data) {
        router.push('/');
        onSuccess();
      }
      console.log('data', data);
      console.log('Success reset password!');
    } catch (error) {
      console.log('err', error);
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
              className='cursor-pointer mb-2 w-full text-white py-2 px-4 rounded-[100px] bg-orange-600 hover:bg-orange-700 transition'
            >
              Save
            </button>

            <div className='h-[1px] w-full bg-[#E1E4ED]'></div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
