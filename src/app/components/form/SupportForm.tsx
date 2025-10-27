import { Field, Formik, Form, ErrorMessage } from 'formik';
import ArrowRightIcon from '../../../../public/icons/arrow-right.svg';
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';

const validationSchema = Yup.object().shape({
  company: Yup.string().trim().required('Company is required'),
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string().trim().email('Invalid email').required('Email is required'),
  phone: Yup.string().trim().required('Phone number is required'),
  message: Yup.string().trim().required('Message is required'),
});

type SupportFormValues = {
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const SupportForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (values: SupportFormValues, { resetForm }: { resetForm: () => void }) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const data = { ...values, form: 'Support' };
      await axios.post('/api/send-email', data);

      setMessage({ type: 'success', text: 'Your message has been sent successfully.' });
      resetForm();
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
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
    <div className='max-w-2xl max-sm:w-full p-8 max-sm:px-4 bg-[#F6F6F6] rounded-[20px]'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-8'>Contact our logistics team</h2>

      <Formik
        initialValues={{ company: '', name: '', email: '', phone: '', message: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className='space-y-4'>
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
                className={'absolute top-3 right-2 ' + (message.type === 'success' ? 'text-green-700' : 'text-red-700')}
                onClick={() => setMessage(null)}
              >
                &times;
              </button>
            </div>
          )}
          <div className='flex max-sm:flex-col max-sm:gap-4 gap-8'>
            <div className='sm:w-1/2 relative'>
              <label className='block text-sm font-medium  mb-1'>
                Name <span className='text-red-500'>*</span>
              </label>
              <Field
                name='name'
                type='text'
                placeholder='Type your name'
                className='placeholder:text-sm w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage
                name='name'
                component='div'
                className='absolute top-[60px] left-0 text-red-500 text-xs mt-1'
              />
            </div>
            <div className='sm:w-1/2 relative'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email <span className='text-red-500'>*</span>
              </label>
              <Field
                name='email'
                type='email'
                placeholder='Type your email'
                className='placeholder:text-sm w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-orange-500'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='absolute top-[60px] left-0 text-red-500 text-xs mt-1'
              />
            </div>
          </div>

          <div className='flex max-sm:flex-col max-sm:gap-4 gap-8'>
            <div className='sm:w-1/2 relative'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Phone <span className='text-red-500'>*</span>
              </label>
              <Field
                name='phone'
                type='tel'
                placeholder='Type your phone'
                className='placeholder:text-sm w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-orange-500'
              />{' '}
              <ErrorMessage
                name='phone'
                component='div'
                className='absolute top-[60px] left-0 text-red-500 text-xs mt-1'
              />
            </div>
            <div className='sm:w-1/2 relative'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Company <span className='text-red-500'>*</span>
              </label>
              <Field
                name='company'
                type='text'
                placeholder='Type your company'
                className='placeholder:text-sm w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-orange-500'
              />{' '}
              <ErrorMessage
                name='company'
                component='div'
                className='absolute top-[60px] left-0 text-red-500 text-xs mt-1'
              />
            </div>
          </div>

          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Message <span className='text-red-500'>*</span>
            </label>
            <Field
              as='textarea'
              name='message'
              rows={4}
              placeholder='Type your description'
              className='placeholder:text-sm w-full px-4 py-2 border border-gray-300 rounded-lg resize-none bg-white focus:outline-none focus:ring-1 focus:ring-orange-500'
            ></Field>
            <ErrorMessage
              name='message'
              component='div'
              className='absolute top-[132px] left-0 text-red-500 text-xs mt-1'
            />
          </div>

          <button
            type='submit'
            className=' max-sm:w-full flex justify-center cursor-pointer gap-2 items-center bg-orange-600 text-white py-2 px-4 rounded-[100px] hover:bg-orange-700 transition-all duration-300'
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
            <div className='flex items-center justify-center w-4 h-4'>
              <ArrowRightIcon className='stroke-white' />
            </div>
          </button>
        </Form>
      </Formik>
    </div>
  );
};
