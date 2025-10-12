import { Field, ErrorMessage } from 'formik';
import React from 'react';

export const CompanyContactsForm = () => {
  return (
    <>
      <div className='relative'>
        <label className='block text-sm font-medium mb-1'>
          Key contact name <span className='text-red-500'>*</span>
        </label>
        <Field
          type='text'
          name='contactName'
          placeholder='John Smith'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage
          name='contactName'
          component='div'
          className='absolute top-[58px] left-0 text-red-500 text-xs mt-1'
        />
      </div>
      <div className='mt-4 relative'>
        <label className='block text-sm font-medium mb-1'>
          Position <span className='text-red-500'>*</span>
        </label>
        <Field
          type='text'
          name='contactPosition'
          placeholder='Business Development Manager'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage
          name='contactPosition'
          component='div'
          className='absolute top-[58px] left-0 text-red-500 text-xs mt-1'
        />
      </div>
      <div className='mt-4 relative'>
        <label className='block text-sm font-medium mb-1'>
          Key contact Email <span className='text-red-500'>*</span>
        </label>
        <Field
          type='email'
          name='contactEmail'
          placeholder='john.smith@company.com'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage
          name='contactEmail'
          component='div'
          className='absolute top-[58px] left-0 text-red-500 text-xs mt-1'
        />
      </div>
      <div className='mt-4 relative'>
        <label className='block text-sm font-medium mb-1'>
          Key contact Number <span className='text-red-500'>*</span>
        </label>
        <Field
          type='tel'
          name='contactNumber'
          placeholder='+00 00 0000 0000'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage
          name='contactNumber'
          component='div'
          className='absolute top-[58px] left-0 text-red-500 text-xs mt-1'
        />
      </div>
    </>
  );
};
