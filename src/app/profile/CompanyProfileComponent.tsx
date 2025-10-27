'use client';

import Image from 'next/image';
import Link from 'next/link';
import EditIcon from '../../../public/icons/edit.svg';
import LocationIcon from '../../../public/icons/location.svg';
import PhoneIcon from '../../../public/icons/phone-icon.svg';
import VerifyIcon from '../../../public/icons/verify-icon.svg';
import CameraIcon from '../../../public/icons/camera-icon.svg';
import { countryMap } from '@/constants';
import { useEffect, useRef, useState } from 'react';
import { updateMember, uploadImage } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { GoogleMapEmbed } from '../components/MapComponent';
import { updateCompanyMember } from '@/services/api';
import { User } from '@/types';

export const CompanyProfileComponent = ({ user, isEditMode = false }: { user: User; isEditMode?: boolean }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(user?.banerLogo?.url ?? null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleUploadBanerLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSelectedImage(URL.createObjectURL(file));

      const { fullUrl, id } = await uploadImage(file);

      await updateMember(user.id.toString(), { banerLogo: id });

      setSelectedImage(fullUrl);
      await updateCompanyMember(user.documentId, { banerLogo: id });
      router.refresh();
    } catch (error) {
      console.error('Failed to upload banerLogo logo:', error);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <div>
      <section className='bg-[#f6f6f6] pb-15 '>
        {selectedImage ? (
          <div className='relative h-[400px] w-full flex items-center justify-center group overflow-hidden'>
            <Image
              src={selectedImage}
              alt='Banner'
              layout='fill'
              objectFit='cover'
              className='object-cover w-full h-[400px]'
              priority
            />

            {isEditMode && (
              <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300' />
            )}

            {isEditMode && (
              <button
                onClick={() => inputRef.current?.click()}
                className='cursor-pointer opacity-0 group-hover:opacity-100 flex gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 px-4 py-2 text-white text-[16px] transition duration-300 z-10'
              >
                <div className='flex items-center justify-center w-6 h-6'>
                  <CameraIcon />
                </div>
                Add cover logo
              </button>
            )}

            <input ref={inputRef} type='file' className='hidden' onChange={(e) => handleUploadBanerLogo(e)} />
          </div>
        ) : (
          <div className='h-[400px] bg-gray-200 flex items-center justify-center group  transition duration-300 relative'>
            <input ref={inputRef} type='file' className='hidden' onChange={(e) => handleUploadBanerLogo(e)} />
            {isEditMode && (
              <button
                onClick={() => inputRef.current?.click()}
                className=' border-white border-[2px] cursor-pointer flex gap-2 px-4 py-2 text-white text-[16px]'
              >
                <div className='flex items-center justify-center w-6 h-6'>
                  <CameraIcon className='' />
                </div>
                Add cover photo
              </button>
            )}
          </div>
        )}

        {/* Company header */}
        <div className='z-10 relative max-w-[1280px] mx-auto max-sm:max-w-[343px] mt-[-90px] bg-white rounded-[24px]  flex items-center max-sm:justify-center  justify-between sm:p-6 p-4'>
          <div className='flex max-sm:flex-col gap-6 items-center max-sm:items-start space-x-4'>
            {user.companyLogo ? (
              <Image
                src={user.companyLogo?.url ?? ''}
                alt='company-img'
                width={116}
                height={90}
                className='h-[90px] w-[116px] rounded-[8px] m-0 max-sm:w-[311px] max-sm:h-[311px]'
              />
            ) : (
              <Image
                src='/images/image-exp.png'
                alt='company-img'
                width={90}
                height={90}
                className='h-[90px] w-[116px] rounded-[8px] m-0 max-sm:w-[311px] max-sm:h-[311px]'
              />
            )}
            <div className=''>
              <div className='flex items-center gap-4 mb-4'>
                <h3 className='text-[24px] leading-[24px] font-semibold'>{user.company}</h3>
                {user.isVerified && <VerifyIcon className='w-8 h-8' />}
              </div>
              <div className='flex items-center gap-2 mb-2'>
                <div className='flex items-center justify-center w-4 h-4'>
                  <LocationIcon className='' />
                </div>
                <p className='text-sm font-semibold'>
                  {user.address} - {user.city}, {user.country}
                </p>
              </div>
              <div className='sm:hidden flex items-center gap-8'>
                <p className='text-sm text-gray-500 '>
                  Member id: <span className='font-semibold'>{user.memberId}</span>
                </p>
                {isEditMode && (
                  <Link
                    href={'/profile/edit'}
                    className='max-sm:text-sm cursor-pointer border flex gap-2 items-center border-orange-600 text-orange-600 px-4 py-1.5 rounded-[100px]  hover:bg-[rgba(255,77,0,0.05)]  transition'
                  >
                    <div className='flex items-center justify-center w-4 h-4 '>
                      <EditIcon className='' />
                    </div>
                    Edit profile
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-between items-end gap-7 '>
            <p className='text-sm text-gray-500 max-sm:hidden'>
              Member id: <span className='font-semibold'>{user.memberId}</span>
            </p>
            {isEditMode && (
              <Link
                href={'/profile/edit'}
                className=' max-sm:hidden cursor-pointer border flex gap-2 items-center border-orange-600 text-orange-600 px-4 py-1.5 rounded-[100px]  hover:bg-[rgba(255,77,0,0.05)]  transition'
              >
                <div className='flex items-center justify-center w-4 h-4'>
                  <EditIcon className='' />
                </div>
                Edit profile
              </Link>
            )}
          </div>
        </div>

        <div className='max-w-[1280px] mx-auto mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 max-xl:px-4'>
          {/* Left column */}
          <div className='space-y-10 max-sm:space-y-8 max-md:order-2 order-1'>
            {/* About company */}
            <div>
              <h2 className='text-[24px] font-semibold  mb-6'>About company</h2>

              <div className='w-full'>
                <p
                  ref={contentRef}
                  style={{
                    maxHeight: isExpanded ? `${contentHeight}px` : '75px',
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease',
                  }}
                  className='text-[16px]'
                >
                  {user.profile}
                </p>

                {contentHeight > 75 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className='text-orange-600 font-semibold cursor-pointer text-[16px]'
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
            </div>

            {/* Company branches */}
            {/* <div>
              <h2 className='text-[24px] font-semibold mb-6'>Company branches</h2>
            </div> */}

            {/* Location */}
            <h2 className='text-[24px] font-semibold  mb-6'>Location</h2>
            <div className='p-6 max-sm:p-4 bg-white rounded-[24px] '>
              <div className=' mb-4'>
                <div className='flex items-center gap-4 mb-2'>
                  <div className='flex items-center justify-center w-4 h-4'>
                    <LocationIcon className='' />
                  </div>
                  <p className='text-[16px]'>
                    {user.address} - {user.city}, {countryMap[user.country]}
                  </p>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center justify-center w-4 h-4'>
                    <PhoneIcon className='' />
                  </div>
                  {user.contactNumber}
                </div>
              </div>

              <div>
                <GoogleMapEmbed address={user.address} />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className='space-y-10 max-sm:space-y-8 max-md:order-1 order-2'>
            {/* Services */}
            <h2 className='text-[24px] font-semibold mb-6'>Services</h2>
            <div className='p-4 bg-white rounded-[24px]'>
              <div className='flex flex-wrap gap-2'>
                {user.services.map((service: string) => (
                  <span key={service} className='text-sm border border-gray-200 px-3 py-1 rounded-[8px]'>
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <h2 className='text-[24px] font-semibold  mb-6'>Contacts</h2>

            <div className='p-4 bg-white rounded-[24px]'>
              <ul className='grid gap-y-5 text-sm '>
                <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                  <p className=' w-[140px]'>Person:</p>
                  <div className='flex items-center gap-2'>
                    <span className=' font-semibold break-words max-w-[180px]'>{user.contactName}</span>
                  </div>
                </li>
                <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                  <p className='w-[140px]'>Email:</p>
                  <span className=' font-semibold break-words max-w-[180px]'>{user.contactEmail}</span>
                </li>
                <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                  <p className=' w-[140px]'>Phone:</p>
                  <span className='font-semibold break-words max-w-[180px]'>{user.contactNumber}</span>
                </li>
                <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                  <p className=' w-[140px]'>Website:</p>
                  <a
                    href={user.website}
                    target='_blank'
                    className='font-semibold text-orange-600 underline break-words max-w-[180px]'
                  >
                    {user.website}
                  </a>
                </li>
              </ul>
            </div>

            {/* Invoicing details */}
            {user.showInvoicingDetails && (
              <div>
                <h2 className='text-[24px] font-semibold  mb-6'>Invoicing details</h2>
                <div className='p-4 bg-white rounded-[24px]'>
                  <ul className='grid gap-y-5 text-sm '>
                    <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                      <p className='w-[140px]'>Company name:</p>
                      <span className=' font-semibold break-words max-w-[180px]'>{user.invoiceCompanyName}</span>
                    </li>
                    <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                      <p className=' w-[140px]'>Company address:</p>
                      <span className=' font-semibold break-words max-w-[180px]'>{user.invoiceCompanyAddress}</span>
                    </li>
                    <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                      <p className=' w-[140px]'>Registration number:</p>
                      <span className='font-semibold break-words max-w-[180px]'>{user.companyRegistrationNumber}</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Bank details */}
            {user.showBankDetails && (
              <div>
                {' '}
                <h2 className='text-[24px] font-semibold  mb-6'>Bank details</h2>
                <div className='p-4 bg-white rounded-[24px]'>
                  <ul className='grid gap-y-5 text-sm '>
                    <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                      <p className=' w-[140px]'>Bank name:</p>

                      <span className=' font-semibold max-w-[180px]'>{user.bankName}</span>
                    </li>
                    <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                      <p className=' w-[140px]'>Address:</p>
                      <span className=' font-semibold break-words max-w-[180px]'>{user.bankAddress}</span>
                    </li>
                    <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                      <p className=' w-[140px]'>Currency:</p>
                      <span className='font-semibold break-words max-w-[180px]'>{user.currency}</span>
                    </li>
                    <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                      <p className=' w-[140px]'>Swift code:</p>
                      <span className='font-semibold break-words max-w-[180px]'>{user.currency}</span>
                    </li>
                    <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                      <p className=' w-[140px]'>IBAN:</p>
                      <span className='font-semibold break-words max-w-[180px]'>{user.iban}</span>
                    </li>
                    <li className='grid [grid-template-columns:auto_1fr] gap-x-0 items-start'>
                      <p className=' w-[140px]'>Bank account:</p>
                      <span className='font-semibold break-words max-w-[180px]'>{user.bankAccount}</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
