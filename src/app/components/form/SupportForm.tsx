import { Field, Formik, Form } from 'formik';
import ArrowRightIcon from '../../../../public/icons/arrow-right.svg';

export const SupportForm = () => {
  return (
    <div className='max-w-2xl max-sm:w-full p-8 bg-[#F6F6F6] rounded-[20px]'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-8'>Contact our logistics team</h2>

      <Formik
        initialValues={{ company: '', name: '', email: '', phone: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {/* Form */}
        <Form className='space-y-4'>
          {/* Email & Name */}
          <div className='flex max-sm:flex-col max-sm:gap-4 gap-8'>
            <div className='sm:w-1/2'>
              <label className='block text-sm font-medium  mb-1'>
                Name <span className='text-red-500'>*</span>
              </label>
              <Field
                name='name'
                type='text'
                placeholder='Type your name'
                className='placeholder:text-sm w-full px-4 py-2 border border-gray-300 rounded-lg bg-white'
              />
            </div>
            <div className='sm:w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email <span className='text-red-500'>*</span>
              </label>
              <Field
                name='email'
                type='email'
                placeholder='Type your email'
                className='placeholder:text-sm w-full px-4 py-2 border border-gray-300 rounded-lg bg-white'
              />
            </div>
          </div>

          <div className='flex max-sm:flex-col max-sm:gap-4 gap-8'>
            <div className='sm:w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Phone <span className='text-red-500'>*</span>
              </label>
              <Field
                name='phone'
                type='tel'
                placeholder='Type your phone'
                className='placeholder:text-sm w-full px-4 py-2 border border-gray-300 rounded-lg bg-white'
              />
            </div>
            <div className='sm:w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Company <span className='text-red-500'>*</span>
              </label>
              <Field
                name='company'
                type='text'
                placeholder='Type your company'
                className='placeholder:text-sm w-full px-4 py-2 border border-gray-300 rounded-lg bg-white'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Message <span className='text-red-500'>*</span>
            </label>
            <Field
              as='textarea'
              name='message'
              rows={4}
              placeholder='Type your description'
              className='placeholder:text-sm w-full px-4 py-2 border border-gray-300 rounded-lg resize-none bg-white'
            ></Field>
          </div>

          <button
            type='submit'
            className=' max-sm:w-full flex justify-center cursor-pointer gap-2 items-center bg-orange-600 text-white py-2 px-4 rounded-[100px] hover:bg-orange-700 transition-all duration-300'
          >
            Send message
            <div className='flex items-center justify-center w-4 h-4'>
              <ArrowRightIcon className='stroke-white' />
            </div>
          </button>
        </Form>
      </Formik>
    </div>
  );
};
