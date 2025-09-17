'use client';

import { Field, Formik, Form } from 'formik';
import { useState } from 'react';

export const SupportForm = () => {
  const [problemType, setProblemType] = useState('');
  const [description, setDescription] = useState('');
  const [agree, setAgree] = useState(false);

  return (
    <div className='max-w-2xl mx-auto p-8'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Support</h2>
      <p className='text-gray-600 text-sm mb-6'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard
        dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries.
      </p>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {/* Form */}
        <Form className='space-y-4'>
          {/* Email & Phone */}
          <div className='flex gap-4'>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <Field
                name='email'
                type='email'
                placeholder='Type your email'
                className='w-full px-4 py-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
              <Field
                name='phone'
                type='tel'
                placeholder='Type your phone'
                className='w-full px-4 py-2 border border-gray-300 rounded-md'
              />
            </div>
          </div>

          {/* Problem Type */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Problem type</label>
            <Field as='select' name='problemType' className='w-full px-4 py-2 border border-gray-300 rounded-md'>
              <option value=''>Select a problem type</option>
              <option value='bug'>Bug</option>
              <option value='feature'>Feature request</option>
              <option value='account'>Account issue</option>
            </Field>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <Field
              as='textarea'
              name='description'
              rows={4}
              placeholder='Type your description'
              className='w-full px-4 py-2 border border-gray-300 rounded-md resize-none'
            ></Field>
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='agree'
              checked={agree}
              onChange={() => setAgree(!agree)}
              className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
            />
            <label htmlFor='agree' className='text-sm text-gray-700'>
              Vestibulum faucibus odio vitae arcu auctor lectus.
            </label>
          </div>

          <button
            type='submit'
            disabled={!agree}
            className='cursor-pointer w-full bg-orange-600 text-white py-3 font-semibold rounded-md hover:bg-gray-600 transition-all duration-300 disabled:opacity-50'
          >
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};
