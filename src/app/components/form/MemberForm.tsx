import { Field, Form, Formik } from 'formik';
//import Image from 'next/image';

export const MemberForm = ({ onChange }: { onChange: () => void }) => {
  interface FormValues {
    email: string;
    // password: string;
    // remember: boolean;
    name: string;
  }

  const handleSubmit = async (values: FormValues) => {
    console.log(values);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        console.log('Email sent successfully');
        // onChange(); // можна показати повідомлення або очистити форму
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='pt-6'>
      <Formik initialValues={{ email: '', name: '' }} onSubmit={(values) => handleSubmit(values)}>
        {() => (
          <Form className='flex flex-col gap-4 max-w-md mx-auto'>
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
                Company Name
              </label>
              <Field
                id='name'
                name='name'
                type='text'
                placeholder='Type your name'
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
              />
            </div>

            <button
              type='submit'
              className='w-full text-white py-2 px-4 rounded-[8px] bg-orange-600 hover:bg-orange-700 transition'
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
