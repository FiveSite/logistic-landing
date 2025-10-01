import { Field, ErrorMessage } from 'formik';
import React from 'react';

export const BusinessProfileForm = () => {
  return (
    <>
      <div className='grid grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium mb-2'>
            Business start date <span className='text-red-500'>*</span>
          </label>
          <Field
            type='date'
            name='startBusinessDate'
            placeholder='00/00/00'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          />
          <ErrorMessage name='startBusinessDate' component='div' className='text-red-500 text-xs mt-1' />
        </div>
        <div>
          <label className='block text-sm font-medium mb-2'>
            Main Markets <span className='text-red-500'>*</span>
          </label>
          <Field
            type='text'
            name='markets'
            placeholder='Europe, Africa, Middle East'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          />
          <ErrorMessage name='markets' component='div' className='text-red-500 text-xs mt-1' />
        </div>
      </div>
      <div className='mt-4'>
        <label className='block text-sm font-medium mb-2'>
          Main activities <span className='text-red-500'>*</span>
        </label>
        <Field
          type='text'
          name='activities'
          placeholder='International shipping, logistics consulting'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage name='activities' component='div' className='text-red-500 text-xs mt-1' />
      </div>
      <div className='mt-4'>
        <label className='block text-sm font-medium mb-2'>
          Services <span className='text-red-500'>*</span>
        </label>
        <Field
          type='text'
          name='services'
          placeholder='Freight forwarding, warehousing, customs clearance'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage name='services' component='div' className='text-red-500 text-xs mt-1' />
      </div>
      <div className='mt-4'>
        <label className='block text-sm font-medium mb-2'>
          Brief Company Profile <span className='text-red-500'>*</span>
        </label>
        <Field
          as='textarea'
          rows={4}
          type='text'
          name='profile'
          placeholder='Short overview of your company'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage name='profile' component='div' className='text-red-500 text-xs mt-1' />
      </div>
    </>
  );
};
