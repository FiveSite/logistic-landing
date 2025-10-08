import { Field, ErrorMessage } from 'formik';

export interface Country {
  cities: string[];
  country: string;
  iso2: string;
  iso3: string;
}
export interface CountryDataProp {
  data: Country[];
}

export const CompanyDetailsForm = ({ data }: CountryDataProp) => {
  return (
    <>
      <div className='grid grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium mb-2'>
            Company name <span className='text-red-500'>*</span>
          </label>
          <Field
            type='text'
            name='company'
            placeholder='e.g. Global Logistics Ltd.'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          />
          <ErrorMessage name='company' component='div' className='text-red-500 text-xs mt-1' />
        </div>
        <div>
          <label className='block text-sm font-medium mb-2'>
            Telephone <span className='text-red-500'>*</span>
          </label>
          <Field
            type='tel'
            name='phone'
            placeholder='+00 00 0000 0000'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          />
          <ErrorMessage name='phone' component='div' className='text-red-500 text-xs mt-1' />
        </div>
      </div>
      <div className='mt-4'>
        <label className='block text-sm font-medium mb-2'>
          Website <span className='text-red-500'>*</span>
        </label>
        <Field
          type='url'
          name='website'
          placeholder='https://www.company.com'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage name='website' component='div' className='text-red-500 text-xs mt-1' />
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <div className='mt-4'>
          <label className='block text-sm font-medium mb-2'>
            Country <span className='text-red-500'>*</span>
          </label>
          <Field
            as='select'
            name='country'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          >
            <option value=''>Select country</option>
            {data.map((c) => {
              const key = c.iso2 || c.country;
              const value = c.iso2 || c.country;
              return (
                <option key={key} value={value}>
                  {c.country}
                </option>
              );
            })}
          </Field>
          <ErrorMessage name='country' component='div' className='text-red-500 text-xs mt-1' />
        </div>
        <div className='mt-4'>
          <label className='block text-sm font-medium mb-2'>
            Address <span className='text-red-500'>*</span>
          </label>
          <Field
            type='text'
            name='address'
            placeholder='123 Main Street, London'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          />
          <ErrorMessage name='address' component='div' className='text-red-500 text-xs mt-1' />
        </div>
      </div>
      <div className='mt-4'>
        <label className='block text-sm font-medium mb-2'>
          LinkedIn page link <span className='text-red-500'>*</span>
        </label>
        <Field
          type='url'
          name='linkedin'
          placeholder='https://www.linkedin.com/company/yourcompany'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage name='linkedin' component='div' className='text-red-500 text-xs mt-1' />
      </div>
    </>
  );
};
