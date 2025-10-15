'use client';

import { updateMember, uploadImage } from '@/services/auth';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChangePasswordForm } from '@/app/components/form/ChangePasswordForm';
import { ModalComponent } from '@/app/components/Modal';
import { updateCompanyMember } from '@/services/api';
import { SwitchComponent } from '@/app/components/Switch';
import clsx from 'clsx';
import { User } from '@/types';

const navItems = [
  { name: 'Company details', active: true, id: 'companyDetails' },
  { name: 'Key contacts', active: false, id: 'keyContacts' },
  { name: 'Invoicing details', active: false, id: 'invoicingDetails' },
  { name: 'Bank details', active: false, id: 'bankDetails' },
  { name: 'Settings', active: false, id: 'settings' },
];

export const ProfileComponent = ({ user }: { user: User }) => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const router = useRouter();

  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isSuccessPasswordModalOpen, setIsSuccessPasswordModalOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(user?.companyLogo?.url ?? null);

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [uploadLogoError, setUploadLogoError] = useState<string | null>(null);

  const [isInvoicingDetailsEnabled, setIsInvoicingDetailsEnabled] = useState(user?.showInvoicingDetails);
  console.log('isInvoicingDetailsEnabled', isInvoicingDetailsEnabled);
  const [isBankDetailsEnabled, setIsBankDetailsEnabled] = useState(user?.showBankDetails);
  console.log('isBankDetailsEnabled', isBankDetailsEnabled);

  const inputRef = useRef<HTMLInputElement>(null);

  const companyDetailsRef = useRef<HTMLDivElement>(null);
  const keyContactsRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const initialValues = {
    company: user?.company || '',
    phone: user?.phone || '',
    website: user?.website || '',
    address: user?.address || '',
    country: user?.country || '',
    linkedin: user?.linkedin || '',
    contactName: user?.contactName || '',
    contactPosition: user?.contactPosition || '',
    contactEmail: user?.contactEmail || '',
    contactNumber: user?.contactNumber || '',
    startBusinessDate: user?.startBusinessDate || '',
    markets: user?.markets || '',
    activities: user?.activities || '',
    services: user?.services || '',
    profile: user?.profile || '',
    annualTurnover: user?.annualTurnover || '',
    employees: user?.employees || '',
    bankName: user?.bankName || '',
    bankAddress: user?.bankAddress || '',
    iban: user?.iban || '',
    swiftCode: user?.swiftCode || '',
    bankAccount: user?.bankAccount || '',
    currency: user?.currency || '',
    invoiceCompanyName: user?.invoiceCompanyName || '',
    invoiceCompanyAddress: user?.invoiceCompanyAddress || '',
    companyRegistrationNumber: user?.companyRegistrationNumber || '',
  };
  const onUploadCompanyLogo = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFieldUpdate = async (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    values: typeof initialValues
  ) => {
    const { name, value } = e.target;
    try {
      await updateMember(user.id.toString(), { [name]: value });

      router.refresh();

      const member = await updateCompanyMember(user.documentId, { [name]: value });
    } catch (err) {
      console.error(`Failed to update field ${name}:`, err);
    }
  };

  const handleUploadCompanyLogo = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLogoError(null);
    setIsUploadingLogo(true);

    try {
      setSelectedImage(URL.createObjectURL(file));

      const { fullUrl, id } = await uploadImage(file);

      await updateMember(user.id.toString(), { companyLogo: id });

      router.refresh();
      await updateCompanyMember(user.documentId, { companyLogo: id });

      setSelectedImage(fullUrl);
    } catch (error) {
      console.error('Failed to upload company logo:', error);
      setUploadLogoError('Failed to upload company logo');
    } finally {
      router.refresh();
      setIsUploadingLogo(false);
    }
  };

  const handleToggleUpdate = async (
    field: 'showInvoicingDetails' | 'showBankDetails',
    currentValue: boolean,
    setValue: (val: boolean) => void
  ) => {
    const newValue = !currentValue;
    setValue(newValue);
    try {
      await updateMember(user.id.toString(), { [field]: String(newValue) });
      await updateCompanyMember(user.documentId, { [field]: String(newValue) });
      router.refresh();
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) setActiveSection(id);
          }
        });
      },
      {
        rootMargin: '0px 0px -60% 0px', // щоб активувалось трохи раніше
        threshold: 0.3,
      }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='pt-[160px] px-10 flex pb-[160px]'>
      <aside className='w-64 p-8'>
        <h2 className='text-[30px] font-semibold mb-7'>Profile</h2>
        <nav>
          <ul className='space-y-4'>
            {navItems.map((item, index) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    handleScrollTo(item.id);
                  }}
                  className={`block py-1 text-[20px] transition-colors cursor-pointer ${
                    activeSection === item.id ? 'text-gray-900 font-bold' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className='flex-1'>
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {({ values }) => (
            <Form>
              {/* Company Details Section */}
              <section
                ref={(el) => {
                  sectionRefs.current['companyDetails'] = el;
                }}
                data-id='companyDetails'
                className='grid grid-cols-[120px_auto_1fr] mb-8 gap-6 pb-10 bg-white rounded-[8px] p-10'
              >
                {/* Upload Area */}
                <div className='flex flex-col items-center'>
                  {selectedImage ? (
                    <Image
                      src={selectedImage}
                      alt='Company Logo'
                      width={116}
                      height={90}
                      className='w-[116px] h-[90px]  rounded-[8px]'
                    />
                  ) : (
                    <Image
                      src='/images/image-exp.png'
                      alt='Company Logo placeholder'
                      className='rounded-[8px]'
                      width={116}
                      height={90}
                    />
                  )}
                  <input ref={inputRef} type='file' className='hidden' onChange={(e) => handleUploadCompanyLogo(e)} />
                  <p
                    onClick={onUploadCompanyLogo}
                    className='cursor-pointer font-semibold p-1 text-[16px] text-orange-600 text-center mt-3 hover:text-orange-700 transition-all duration-300'
                  >
                    Upload logo
                  </p>
                </div>
                <div className='w-[1px] bg-neutral-100'></div>

                {/* Form Area */}
                <div>
                  <h3 className='text-[24px] font-semibold mb-2 text-orange-600'>Company details</h3>
                  <p className='mb-8'>Enter your companys basic information</p>

                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium mb-2'>
                        Company name <span className='text-red-500'>*</span>
                      </label>
                      <Field
                        type='text'
                        name='company'
                        placeholder='e.g. Global Logistics Ltd.'
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
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
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
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
                      onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                      className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                    />
                    <ErrorMessage name='website' component='div' className='text-red-500 text-xs mt-1' />
                  </div>
                  <div className='mt-4'>
                    <label className='block text-sm font-medium mb-2'>
                      LinkedIn page link <span className='text-red-500'>*</span>
                    </label>
                    <Field
                      type='url'
                      name='linkedin'
                      placeholder='https://www.linkedin.com/company/yourcompany'
                      onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                      className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                    />
                    <ErrorMessage name='linkedin' component='div' className='text-red-500 text-xs mt-1' />
                  </div>
                </div>
              </section>

              <section
                ref={(el) => {
                  sectionRefs.current['keyContacts'] = el;
                }}
                data-id='keyContacts'
                className='grid grid-cols-1 gap-8 pb-8 bg-white rounded-[8px] p-10 mb-8'
              >
                {/* Form Area */}
                <div>
                  <h3 className='text-[24px] font-semibold mb-2 text-orange-600'>Key contact</h3>
                  <p className='mb-8'>Provide details of the main contact person</p>

                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium mb-2'>
                        Key contact name <span className='text-red-500'>*</span>
                      </label>
                      <Field
                        type='text'
                        name='contactName'
                        placeholder='John Smith'
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                        className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                      />
                      <ErrorMessage name='contactName' component='div' className='text-red-500 text-xs mt-1' />
                    </div>
                    <div className='mt-4'>
                      <label className='block text-sm font-medium mb-2'>
                        Position <span className='text-red-500'>*</span>
                      </label>
                      <Field
                        type='text'
                        name='contactPosition'
                        placeholder='Business Development Manager'
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                        className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                      />
                      <ErrorMessage name='contactPosition' component='div' className='text-red-500 text-xs mt-1' />
                    </div>
                  </div>
                  <div className='mt-4'>
                    <label className='block text-sm font-medium mb-2'>
                      Key contact Email <span className='text-red-500'>*</span>
                    </label>
                    <Field
                      type='email'
                      name='contactEmail'
                      placeholder='john.smith@company.com'
                      onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                      className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                    />
                    <ErrorMessage name='contactEmail' component='div' className='text-red-500 text-xs mt-1' />
                  </div>
                  <div className='mt-4'>
                    <label className='block text-sm font-medium mb-2'>
                      Key contact Number <span className='text-red-500'>*</span>
                    </label>
                    <Field
                      type='tel'
                      name='contactNumber'
                      placeholder='+00 00 0000 0000'
                      onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                      className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                    />
                    <ErrorMessage name='contactNumber' component='div' className='text-red-500 text-xs mt-1' />
                  </div>
                </div>
              </section>

              <section
                ref={(el) => {
                  sectionRefs.current['invoicingDetails'] = el;
                }}
                data-id='invoicingDetails'
                className='grid grid-cols-1 gap-8 pb-8 bg-white rounded-[8px] p-10 mb-8'
              >
                {/* Form Area */}
                <div>
                  <div className='flex items-center justify-between'>
                    <div className=''>
                      <h3 className='text-[24px] font-semibold mb-2 text-orange-600'>Invoicing details</h3>
                      <p className='mb-8'>Your company’s legal details for billing and payments.</p>
                    </div>
                    <SwitchComponent
                      checked={isInvoicingDetailsEnabled}
                      onChange={() =>
                        handleToggleUpdate(
                          'showInvoicingDetails',
                          isInvoicingDetailsEnabled,
                          setIsInvoicingDetailsEnabled
                        )
                      }
                      // onChange={() => setIsInvoicingDetailsEnabled(!isInvoicingDetailsEnabled)}
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-6'>
                    <div>
                      <label
                        className={clsx(
                          !isInvoicingDetailsEnabled
                            ? 'text-neutral-400 block text-sm font-medium mb-2'
                            : 'block text-sm font-medium mb-2'
                        )}
                      >
                        Company name{' '}
                        <span className={clsx(!isInvoicingDetailsEnabled ? 'text-neutral-400' : 'text-red-500')}>
                          *
                        </span>
                      </label>
                      <Field
                        type='text'
                        name='invoiceCompanyName'
                        placeholder='e.g. Global Logistics Ltd.'
                        disabled={!isInvoicingDetailsEnabled}
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                        className={clsx(
                          'w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500',
                          {
                            'text-neutral-400': !isInvoicingDetailsEnabled, // apply gray text when disabled
                          }
                        )}
                        // className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                      />
                      <ErrorMessage name='invoiceCompanyName' component='div' className='text-red-500 text-xs mt-1' />
                    </div>
                    <div className=''>
                      <label
                        className={clsx(
                          !isInvoicingDetailsEnabled
                            ? 'text-neutral-400 block text-sm font-medium mb-2'
                            : 'block text-sm font-medium mb-2'
                        )}
                      >
                        Company address{' '}
                        <span className={clsx(!isInvoicingDetailsEnabled ? 'text-neutral-400' : 'text-red-500')}>
                          *
                        </span>
                      </label>
                      <Field
                        type='text'
                        name='invoiceCompanyAddress'
                        placeholder='101 King Street, London, SW1A 1AA, United Kingdom'
                        disabled={!isInvoicingDetailsEnabled}
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                        className={clsx(
                          'w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500',
                          {
                            'text-neutral-400': !isInvoicingDetailsEnabled, // apply gray text when disabled
                          }
                        )}
                        // className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                      />
                      <ErrorMessage
                        name='invoiceCompanyAddress'
                        component='div'
                        className='text-red-500 text-xs mt-1'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-6'>
                    <div className='mt-4'>
                      <label
                        className={clsx(
                          !isInvoicingDetailsEnabled
                            ? 'text-neutral-400 block text-sm font-medium mb-2'
                            : 'block text-sm font-medium mb-2'
                        )}
                      >
                        Registration number{' '}
                        <span className={clsx(!isInvoicingDetailsEnabled ? 'text-neutral-400' : 'text-red-500')}>
                          *
                        </span>
                      </label>
                      <Field
                        type='text'
                        name='companyRegistrationNumber'
                        placeholder='1234567890'
                        disabled={!isInvoicingDetailsEnabled}
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                        className={clsx(
                          'w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500',
                          {
                            'text-neutral-400': !isInvoicingDetailsEnabled, // apply gray text when disabled
                          }
                        )}
                        // className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                      />
                      <ErrorMessage
                        name='companyRegistrationNumber'
                        component='div'
                        className='text-red-500 text-xs mt-1'
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section
                ref={(el) => {
                  sectionRefs.current['bankDetails'] = el;
                }}
                id='bankDetails'
                className='grid grid-cols-1 gap-8 pb-8 bg-white rounded-[8px] p-10'
              >
                {/* Form Area */}
                <div>
                  <div className='flex items-center justify-between'>
                    <div className=''>
                      <h3 className='text-[24px] font-semibold mb-2 text-orange-600'>Bank details</h3>
                      <p className='mb-8'>Manage your banking information securely</p>
                    </div>
                    <SwitchComponent
                      checked={isBankDetailsEnabled}
                      onChange={() =>
                        handleToggleUpdate('showBankDetails', isBankDetailsEnabled, setIsBankDetailsEnabled)
                      }
                      // onChange={() => setIsBankDetailsEnabled(!isBankDetailsEnabled)}
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-6'>
                    <div>
                      <label
                        className={clsx(
                          !isBankDetailsEnabled
                            ? 'text-neutral-400 block text-sm font-medium mb-2'
                            : 'block text-sm font-medium mb-2'
                        )}
                      >
                        Bank name{' '}
                        <span className={clsx(!isBankDetailsEnabled ? 'text-neutral-400' : 'text-red-500')}>*</span>
                      </label>
                      <Field
                        type='text'
                        name='bankName'
                        placeholder='Dubai Islamic Bank'
                        disabled={!isBankDetailsEnabled}
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                        className={clsx(
                          'w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500',
                          {
                            'text-neutral-400': !isBankDetailsEnabled,
                          }
                        )}
                        // className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                      />
                      <ErrorMessage name='bankName' component='div' className='text-red-500 text-xs mt-1' />
                    </div>
                    <div className=''>
                      <label
                        className={clsx(
                          !isBankDetailsEnabled
                            ? 'text-neutral-400 block text-sm font-medium mb-2'
                            : 'block text-sm font-medium mb-2'
                        )}
                      >
                        Address{' '}
                        <span className={clsx(!isBankDetailsEnabled ? 'text-neutral-400' : 'text-red-500')}>*</span>
                      </label>
                      <Field
                        type='text'
                        name='bankAddress'
                        placeholder='Sheikh Zayed Road, Dubai, United Arab Emirates'
                        disabled={!isBankDetailsEnabled}
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                        className={clsx(
                          'w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500',
                          {
                            'text-neutral-400': !isBankDetailsEnabled,
                          }
                        )}
                        // className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                      />
                      <ErrorMessage name='bankAddress' component='div' className='text-red-500 text-xs mt-1' />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-6'>
                    <div className='mt-4'>
                      <label
                        className={clsx(
                          !isBankDetailsEnabled
                            ? 'text-neutral-400 block text-sm font-medium mb-2'
                            : 'block text-sm font-medium mb-2'
                        )}
                      >
                        Swift code{' '}
                        <span className={clsx(!isBankDetailsEnabled ? 'text-neutral-400' : 'text-red-500')}>*</span>
                      </label>
                      <Field
                        type='text'
                        name='swiftCode'
                        placeholder='SCBLAEADXXX'
                        disabled={!isBankDetailsEnabled}
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                        className={clsx(
                          'w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500',
                          {
                            'text-neutral-400': !isBankDetailsEnabled,
                          }
                        )}
                        // className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                      />
                      <ErrorMessage name='swiftCode' component='div' className='text-red-500 text-xs mt-1' />
                    </div>
                    <div className='mt-4'>
                      <label
                        className={clsx(
                          !isBankDetailsEnabled
                            ? 'text-neutral-400 block text-sm font-medium mb-2'
                            : 'block text-sm font-medium mb-2'
                        )}
                      >
                        IBAN
                        <span className={clsx(!isBankDetailsEnabled ? 'text-neutral-400' : 'text-red-500')}>*</span>
                      </label>
                      <Field
                        type='text'
                        name='iban'
                        placeholder='AE07 0331 2345 6789 0123 456'
                        disabled={!isBankDetailsEnabled}
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                        className={clsx(
                          'w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500',
                          {
                            'text-neutral-400': !isBankDetailsEnabled,
                          }
                        )}
                        // className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                      />
                      <ErrorMessage name='iban' component='div' className='text-red-500 text-xs mt-1' />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-6'>
                    <div className='mt-4'>
                      <label
                        className={clsx(
                          !isBankDetailsEnabled
                            ? 'text-neutral-400 block text-sm font-medium mb-2'
                            : 'block text-sm font-medium mb-2'
                        )}
                      >
                        Currency{' '}
                        <span className={clsx(!isBankDetailsEnabled ? 'text-neutral-400' : 'text-red-500')}>*</span>
                      </label>
                      <Field
                        type='text'
                        name='currency'
                        placeholder='EUR'
                        disabled={!isBankDetailsEnabled}
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                        className={clsx(
                          'w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500',
                          {
                            'text-neutral-400': !isBankDetailsEnabled,
                          }
                        )}
                        // className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                      />
                      <ErrorMessage name='currency' component='div' className='text-red-500 text-xs mt-1' />
                    </div>
                    <div className='mt-4'>
                      <label
                        className={clsx(
                          !isBankDetailsEnabled
                            ? 'text-neutral-400 block text-sm font-medium mb-2'
                            : 'block text-sm font-medium mb-2'
                        )}
                      >
                        Bank account{' '}
                        <span className={clsx(!isBankDetailsEnabled ? 'text-neutral-400' : 'text-red-500')}>*</span>
                      </label>
                      <Field
                        type='text'
                        name='bankAccount'
                        placeholder='0012345678901'
                        disabled={!isBankDetailsEnabled}
                        onBlur={(e: FocusEvent<HTMLInputElement>) => handleFieldUpdate(e, values)}
                        className={clsx(
                          'w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500',
                          {
                            'text-neutral-400': !isBankDetailsEnabled,
                          }
                        )}
                        // className='w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
                      />
                      <ErrorMessage name='bankAccount' component='div' className='text-red-500 text-xs mt-1' />
                    </div>
                  </div>
                </div>
              </section>
            </Form>
          )}
        </Formik>

        <section
          ref={(el) => {
            sectionRefs.current['settings'] = el;
          }}
          data-id='settings'
        >
          {' '}
          <div className='bg-white rounded-[8px] p-6 flex justify-between items-center mt-6'>
            <div>
              <p className='text-[20px] font-semibold mb-2'>Branches</p>
              <p className='text-[16px]'>You can add new branches.</p>
            </div>
            <p className='text-[16px] p-1 font-semibold text-orange-600 hover:text-orange-700 cursor-pointer'>
              Add new branch
            </p>
          </div>
          <div className='bg-white rounded-[8px] p-6 flex justify-between items-center mt-6'>
            <div>
              <p className='text-[20px] font-semibold mb-2'>Password</p>
              <p className='text-[16px]'>You can change your password at any time.</p>
            </div>
            <p
              onClick={() => setIsChangeModalOpen(true)}
              className='text-[16px] p-1 font-semibold text-orange-600 hover:text-orange-700 cursor-pointer'
            >
              Change password
            </p>
          </div>
          <div className='bg-white rounded-[8px] p-6 flex justify-between items-center mt-6'>
            <div>
              <p className='text-[20px] font-semibold mb-2'>Delete Account</p>
              <p className='text-[16px]'>If you delete your account, you will lose the data associated with it.</p>
            </div>
            <p className='text-[16px] p-1 font-semibold text-orange-600 hover:text-orange-700 cursor-pointer'>
              Delete account
            </p>
          </div>
        </section>
      </div>

      {isChangeModalOpen && (
        <ModalComponent
          title=' Change password'
          description='Enter your current and new password below'
          isOpen={isChangeModalOpen}
          handleClose={() => setIsChangeModalOpen(false)}
        >
          <ChangePasswordForm
            onClose={() => {
              setIsChangeModalOpen(false);
            }}
            onSuccess={() => {
              setIsChangeModalOpen(false);
              setIsSuccessPasswordModalOpen(true);
            }}
          />
        </ModalComponent>
      )}
      {isSuccessPasswordModalOpen && (
        <ModalComponent
          title='Password changed'
          description='Your password has been changed successfully.'
          isOpen={isSuccessPasswordModalOpen}
          handleClose={() => setIsSuccessPasswordModalOpen(false)}
        />
      )}
    </div>
  );
};
