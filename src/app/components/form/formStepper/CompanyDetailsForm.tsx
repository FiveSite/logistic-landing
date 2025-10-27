import { Field, ErrorMessage, useFormikContext } from 'formik';

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
  const { values } = useFormikContext<{ country: string }>();

  // Знаходимо вибрану країну
  const selectedCountry = data.find((item) => item.iso2 === values.country || item.country === values.country);

  // Отримуємо міста для цієї країни
  const cities = selectedCountry ? selectedCountry.cities.map((city) => ({ value: city, label: city })) : [];

  return (
    <>
      <div className='grid grid-cols-2 max-md:grid-cols-1 max-md:gap-4 gap-6'>
        <div className='relative'>
          <label className='block text-sm font-medium mb-1'>
            Company name <span className='text-red-500'>*</span>
          </label>
          <Field
            type='text'
            name='company'
            placeholder='e.g. Global Logistics Ltd.'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          />
          <ErrorMessage
            name='company'
            component='div'
            className='absolute top-[58px] left-0 text-red-500 text-xs mt-1'
          />
        </div>
        <div className='relative'>
          <label className='block text-sm font-medium mb-1'>
            Telephone <span className='text-red-500'>*</span>
          </label>
          <Field
            type='tel'
            name='phone'
            placeholder='+00 00 0000 0000'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          />
          <ErrorMessage name='phone' component='div' className='absolute top-[58px] left-0 text-red-500 text-xs mt-1' />
        </div>
      </div>
      <div className='mt-4 relative'>
        <label className='block text-sm font-medium mb-1'>
          Website <span className='text-red-500'>*</span>
        </label>
        <Field
          type='url'
          name='website'
          placeholder='https://www.company.com'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage name='website' component='div' className='absolute top-[58px] left-0 text-red-500 text-xs mt-1' />
      </div>
      <div className='grid grid-cols-2 max-md:grid-cols-1 max-md:gap-0 gap-6 '>
        <div className='mt-4 relative'>
          <label className='block text-sm font-medium mb-1'>
            Country <span className=' text-red-500'>*</span>
          </label>
          <Field
            as='select'
            name='country'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          >
            <option value=''>Select country</option>
            {data.map((c) => {
              const key = c.iso2 || c.country;
              const value = c.country;
              return (
                <option key={key} value={value}>
                  {c.country}
                </option>
              );
            })}
          </Field>
          <ErrorMessage
            name='country'
            component='div'
            className='absolute top-[58px] left-0 text-red-500 text-xs mt-1'
          />
        </div>
        <div className='mt-4 relative'>
          <label className='block text-sm font-medium mb-1'>
            City <span className=' text-red-500'>*</span>
          </label>
          <Field
            as='select'
            name='city'
            className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          >
            <option value=''>Select city</option>
            {cities.map((c) => {
              const key = c.value;
              const value = c.value;
              return (
                <option key={key} value={value}>
                  {c.value}
                </option>
              );
            })}
          </Field>
          <ErrorMessage name='city' component='div' className='absolute top-[58px] left-0 text-red-500 text-xs mt-1' />
        </div>
      </div>

      <div className='mt-4 relative'>
        <label className='block text-sm font-medium mb-1'>
          Address <span className='text-red-500'>*</span>
        </label>
        <Field
          type='text'
          name='address'
          placeholder='123 Main Street'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage name='address' component='div' className='absolute top-[58px] left-0 text-red-500 text-xs mt-1' />
      </div>
      <div className='mt-4 relative'>
        <label className='block text-sm font-medium mb-1'>
          LinkedIn page link <span className='text-red-500'>*</span>
        </label>
        <Field
          type='url'
          name='linkedin'
          placeholder='https://www.linkedin.com/company/yourcompany'
          className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        <ErrorMessage
          name='linkedin'
          component='div'
          className='absolute top-[58px] left-0 text-red-500 text-xs mt-1'
        />
      </div>
    </>
  );
};
