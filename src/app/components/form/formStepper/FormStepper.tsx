import { useContext, useEffect, useMemo, useState } from 'react';
import { CompanyDetailsForm, Country } from './CompanyDetailsForm';
import { CompanyContactsForm } from './CompanyContactsForm';
import { BusinessProfileForm } from './BusinessProfileForm';
import { ReferencesForm } from './ReferencesForm';
import { MemberSignUpContext } from './MemberSignUpContext';
import { Form, Formik } from 'formik';
import { FormikErrors, FormikTouched } from 'formik';

import * as yup from 'yup';
import { addMember, fetchCountriesList } from '@/services/api';
import { MemberSignUpFormValues } from '@/types';
import axios, { AxiosError } from 'axios';

export const initialValues: MemberSignUpFormValues = {
  company: '',
  phone: '',
  website: '',
  address: '',
  country: '',
  city: '',
  linkedin: '',
  contactName: '',
  contactPosition: '',
  contactEmail: '',
  contactNumber: '',
  startBusinessDate: '',
  markets: '',
  activities: '',
  services: [],
  profile: '',
  annualTurnover: '',
  employees: '',
  branchOffices: '',
  branchLocations: '',
  references: '',
  companyLogo: '',
  banerLogo: '',
};

// Step 1: Company info
export const step1Schema = yup.object().shape({
  company: yup.string().trim().required('Company is required'),
  phone: yup.string().trim().required('Phone is required'),
  website: yup.string().trim().url('Invalid URL').required('Website is required'),
  address: yup.string().trim().required('Address is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  linkedin: yup.string().trim().url('Invalid URL').required('Linkedin is required'),
});

// Step 2: Contact info
export const step2Schema = yup.object().shape({
  contactName: yup.string().trim().required('Contact name is required'),
  contactPosition: yup.string().trim().required('Position is required'),
  contactEmail: yup.string().trim().email('Invalid email').required('Email is required'),
  contactNumber: yup.string().trim().required('Contact number is required'),
});

// Step 3: Business info
export const step3Schema = yup.object().shape({
  startBusinessDate: yup.string().required('Start date is required'),
  markets: yup.string().trim().required('Markets are required'),
  activities: yup.string().trim().required('Activities are required'),
  services: yup.array().min(1, 'At least one service is required').required('Services are required'),
  profile: yup.string().trim().required('Profile is required'),
});

// Step 4: Extra info
export const step4Schema = yup.object().shape({
  annualTurnover: yup.string().trim().required('Turnover is required'),
  employees: yup.string().trim().required('Employees is required'),
  branchOffices: yup.string().trim().required('Branch offices is required'),
  branchLocations: yup.string().trim().required('Branch locations is required'),
  references: yup.string().trim().required('References are required'),
});

export const FormStepper = ({
  handleClose,
  onChange,
  onSuccess,
}: {
  handleClose: () => void;
  onChange: () => void;
  onSuccess: () => void;
}) => {
  const [countryData, setCountryData] = useState<Country[] | []>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { activeStep, nextStepHandler } = useContext(MemberSignUpContext);

  const schemas = [step1Schema, step2Schema, step3Schema, step4Schema];

  const currentSchema = schemas[activeStep];

  const formData = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <CompanyDetailsForm data={countryData} />;

      case 1:
        return <CompanyContactsForm />;

      case 2:
        return <BusinessProfileForm />;

      case 3:
        return <ReferencesForm />;

      default:
        return null;
    }
  }, [activeStep, countryData]);

  const getCountriesList = async () => {
    try {
      const res = await fetchCountriesList();
      const list = Array.isArray(res?.data) ? res.data : [];
      const normalized = list.map((item: { country: string; cities?: string[]; iso2?: string; iso3?: string }) => ({
        country: item.country,
        cities: item.cities ?? [],
        iso2: item.iso2 ?? item.country,
        iso3: item.iso3 ?? '',
      }));
      setCountryData(normalized);
    } catch (e) {
      setCountryData([]);
    }
  };

  const handleSubmitClickHandler = async (values: MemberSignUpFormValues) => {
    if (activeStep < 3) {
      nextStepHandler(activeStep + 1);
    } else {
      try {
        const res = await addMember({
          ...values,
          isApproved: false,
          memberId: String(Math.floor(100000 + Math.random() * 900000)),
          companyLogo: null,
          banerLogo: null,
        });

        if (res) {
          // const data = { ...values, form: 'Member' };
          // await axios.post('/api/send-email', data);

          onSuccess();
          handleClose();
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message == '400') {
            setMessage({ type: 'error', text: 'This email or company already exists' });
          } else setMessage({ type: 'error', text: 'Network error. Please try again.' });
        }
      }
    }
  };

  const handleNextStep = async (
    validateForm: () => Promise<FormikErrors<MemberSignUpFormValues>>,
    setTouched: (fields: FormikTouched<MemberSignUpFormValues>, shouldValidate?: boolean) => void,
    values: MemberSignUpFormValues
  ) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      nextStepHandler(activeStep + 1);
    } else {
      setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {} as FormikTouched<MemberSignUpFormValues>)
      );
    }
  };

  useEffect(() => {
    getCountriesList();
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={currentSchema}
        onSubmit={(values) => handleSubmitClickHandler(values)}
        validateOnChange={true}
        validateOnBlur={true}
        enableReinitialize={true}
      >
        {({ validateForm, setTouched, isValid, isSubmitting, errors, touched, values }) => (
          <Form>
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
                  className={
                    'absolute top-3 right-2 ' + (message.type === 'success' ? 'text-green-700' : 'text-red-700')
                  }
                  onClick={() => setMessage(null)}
                >
                  &times;
                </button>
              </div>
            )}
            {formData}

            <div className='flex max-sm:flex-col max-sm:gap-4 justify-between items-center mt-6 max:lg:pb-6'>
              <div className='flex gap-4'>
                <button
                  type='button'
                  onClick={handleClose}
                  className='cursor-pointer px-10 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 text-sm'
                >
                  Close
                </button>

                {activeStep < 3 ? (
                  <button
                    type='button'
                    disabled={isSubmitting}
                    onClick={() => handleNextStep(validateForm, setTouched, values)}
                    className='cursor-pointer px-10 py-2.5 rounded-full bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 '
                  >
                    Next step
                  </button>
                ) : (
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='cursor-pointer px-10 py-2.5 rounded-full bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 '
                  >
                    Submit
                  </button>
                )}
              </div>
              <p className='text-sm text-orange-600 mr-1 max-sm:pb-6'>
                Already have an account?{' '}
                <span onClick={onChange} className='hover:underline cursor-pointer'>
                  Sign in
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
