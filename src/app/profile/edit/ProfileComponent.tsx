'use client';

import { updateMember, uploadImage } from '@/services/auth';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { ChangeEvent, FocusEvent, useRef, useState } from 'react';

const navItems = [
  { name: 'Company details', active: true },
  { name: 'Key contacts', active: false },
  { name: 'Settings', active: false },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProfileComponent = ({ user }: any) => {
  console.log('user in profile component', user);
  const [activeTab, setActiveTab] = useState(0);

  // Логотип компанії
  const [selectedImage, setSelectedImage] = useState<string | null>(user?.companyLogo.url || null);
  console.log('selectedImage', selectedImage);
  console.log('url', `${process.env.NEXT_PUBLIC_API_URL}${user?.companyLogo.url}`);

  //const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [uploadLogoError, setUploadLogoError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Аватар
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(user?.avatar || null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [uploadAvatarError, setUploadAvatarError] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  console.log('selectedImage', selectedImage);

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
    companyLogo: user?.companyLogo || '',
    avatarLogo: user?.avatarLogo || '',
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
      await updateMember(user.id, { [name]: value });
      console.log(`Field ${name} updated with value:`, value);
    } catch (err) {
      console.error(`Failed to update field ${name}:`, err);
    }
  };

  const handleUploadCompanyLogo = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLogoError(null);
    //setIsUploadingLogo(true);

    try {
      // Показуємо локальне прев'ю
      console.log('file', URL.createObjectURL(file));
      setSelectedImage(URL.createObjectURL(file));

      // Завантажуємо зображення на сервер
      const uploadedUrl = await uploadImage(file);
      console.log('Uploaded URL:', uploadedUrl);

      // Оновлюємо користувача новим URL логотипу
      await updateMember(user.id, { companyLogo: '28' });

      // Оновлюємо стан локально
      setSelectedImage(uploadedUrl.split('/').slice(1).join('/')); // Зберігаємо відносний шлях
    } catch (error) {
      console.error('Failed to upload company logo:', error);
      setUploadLogoError('Failed to upload company logo');
    } finally {
      //setIsUploadingLogo(false);
    }
  };

  // --- Обробка аватара ---
  const onUploadAvatar = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleUploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadAvatarError(null);
    setIsUploadingAvatar(true);

    try {
      setSelectedAvatar(URL.createObjectURL(file));
      const uploadedUrl = await uploadImage(file);
      await updateMember(user.id, { avatar: uploadedUrl });
      setSelectedAvatar(uploadedUrl);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      setUploadAvatarError('Failed to upload avatar');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <div className='pt-[160px] px-10 flex pb-[160px]'>
      <aside className='w-64 p-8'>
        <h2 className='text-[30px] font-semibold mb-7'>Profile</h2>
        <nav>
          <ul className='space-y-4'>
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href='#'
                  className={`block py-1 text-[20px] transition-colors ${
                    item.active ? 'text-gray-900 font-bold' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className='flex-1'>
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {({ values }) => (
            <Form>
              {/* Company Details Section */}
              <section className='grid grid-cols-[120px_1fr] mb-8 gap-8 pb-10 bg-white rounded-[8px] p-10'>
                {/* Upload Area */}
                <div className='flex flex-col items-center'>
                  {selectedImage ? (
                    <Image
                      src={
                        selectedImage?.startsWith('blob:') || selectedImage?.startsWith('http')
                          ? selectedImage
                          : `${process.env.NEXT_PUBLIC_API_URL}${selectedImage}`
                      }
                      // src={`${process.env.NEXT_PUBLIC_API_URL}${selectedImage}`}
                      alt='Company Logo'
                      width={116}
                      height={90}
                      className='w-[116px] h-[90px] object-contain rounded-[8px]'
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
                    className='cursor-pointer p-1 text-[16px] text-orange-600 text-center mt-3 font-medium'
                  >
                    Upload logo
                  </p>
                </div>
                {/* <UploadBlock type='logo' label='Upload logo' /> */}

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

              <section className='grid grid-cols-[120px_1fr] gap-8 pb-8 bg-white rounded-[8px] p-10'>
                {/* Upload Area */}
                <div className='flex flex-col items-center'>
                  <Image src='/images/avatar.png' alt='Vercel Logo' width={80} height={80} />
                  <input type='file' className='hidden' />
                  <p className='p-1 text-[16px] text-orange-600 text-center mt-3 font-medium'>Upload logo</p>
                </div>
                {/* <UploadBlock type='logo' label='Upload logo' /> */}

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
            </Form>
          )}
        </Formik>
        <div className='bg-white rounded-[8px] p-6 flex justify-between items-center mt-6'>
          <div>
            <p className='text-[20px] font-semibold mb-2'>Password</p>
            <p className='text-[16px]'>You can change your password at any time.</p>
          </div>
          <p className='text-[16px] p-1 font-semibold text-orange-600 hover:text-orange-700 cursor-pointer'>
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
      </main>
    </div>
  );
};
