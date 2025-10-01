import { Field, Form, Formik, ErrorMessage } from 'formik';
import ArrowLeftIcon from '../../../../public/icons/arrow-left.svg';
import * as yup from 'yup';

interface FormValues {
  email: string;
}

const currentSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
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
  const handleSubmit = async (values: FormValues) => {
    console.log(values);

    try {
      const res = await fetch('http://localhost:1337/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await res.json();

      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='pt-6'>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={currentSchema}
      >
        {({ isSubmitting }) => (
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
              <ErrorMessage name='email' component='div' className='text-red-500 text-xs mt-1' />
            </div>

            <button
              disabled={isSubmitting}
              type='submit'
              className='cursor-pointer mt-4 mb-2 w-full text-white py-2 px-4 rounded-[100px] bg-orange-600 hover:bg-orange-700 transition-all ease-in-out duration-300'
            >
              Send email
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
