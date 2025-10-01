import { Field, ErrorMessage } from 'formik';
import React from 'react';

export const ReferencesForm = () => {
  return (
    <>
      <div className='grid grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium mb-2'>
            Annual turnover <span className='text-red-500'>*</span>
          </label>
          <Field
            type='text'
            name='annualTurnover'
            placeholder='e.g. $15M'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          />
          <ErrorMessage name='annualTurnover' component='div' className='text-red-500 text-xs mt-1' />
        </div>
        <div>
          <label className='block text-sm font-medium mb-2'>
            Number of employees <span className='text-red-500'>*</span>
          </label>
          <Field
            type='text'
            name='employees'
            placeholder='e.g. 250'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          />
          <ErrorMessage name='employees' component='div' className='text-red-500 text-xs mt-1' />
        </div>
      </div>
      <div className='mt-4'>
        <label className='block text-sm font-medium mb-2'>
          Number Branch offices <span className='text-red-500'>*</span>
        </label>
        <Field
          type='text'
          name='branchOffices'
          placeholder='e.g. 5'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage name='branchOffices' component='div' className='text-red-500 text-xs mt-1' />
      </div>
      <div className='mt-4'>
        <label className='block text-sm font-medium mb-2'>
          Branch locations <span className='text-red-500'>*</span>
        </label>
        <Field
          type='text'
          name='branchLocations'
          placeholder='London, Paris, Nairobi, Dubai, Cape Town'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage name='branchLocations' component='div' className='text-red-500 text-xs mt-1' />
      </div>
      <div className='mt-4'>
        <label className='block text-sm font-medium mb-2'>
          References (name 3 with contact information) <span className='text-red-500'>*</span>
        </label>
        <Field
          as='textarea'
          rows={4}
          name='references'
          placeholder='Company A – contact@companya.com;
Company B – +1 234 567 890;
Company C – person@companyc.com'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage name='references' component='div' className='text-red-500 text-xs mt-1' />
      </div>
    </>
  );
};
