'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import ArrowClose from '../../../public/icons/arrow-close.svg';
import CloseIcon from '../../../public/icons/close-icon.svg';
import LocationIcon from '../../../public/icons/location.svg';

import clsx from 'clsx';

const companies = [
  {
    id: 1,
    name: 'Example company name',
    country: 'Example country',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit mattis sit phasellus mollis sit aliquam sit nullam nl.',
    imageUrl: '',
  },
  {
    id: 2,
    name: 'Example company name',
    country: 'Example country',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit mattis sit phasellus mollis sit aliquam sit nullam nl.',
    imageUrl: '',
  },
];

const CompanyDirectoryPage = () => {
  const [isOpenFilterList, setIsOpenFilterList] = useState(false);
  const [filterValue, setFilterValue] = useState('Company name');
  const [filterList, setFilterList] = useState([
    'Advantages',
    'Membership yrs',
    'Membership',
    'Certificates',
    'Routes',
    'JC Verified',
  ]);

  const deleteFilterValue = (value: string) => {
    const newFilterData = filterList.filter((item) => item !== value);
    setFilterList(newFilterData);
  };

  return (
    <div className='flex gap-6 px-[166px] py-[100px]'>
      <div className='flex-1'>
        <div className='flex gap-2 mb-6'>
          {['Company name', 'Location', 'Member ID', 'Port'].map((tab, index) => (
            <button
              key={index}
              onClick={() => setFilterValue(tab)}
              className={`cursor-pointer px-4 py-1.5 rounded-[8px] text-[16px]  h-9 ${
                tab === filterValue ? 'bg-gray-800 text-white' : 'bg-gray-200 '
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <input
          type='text'
          placeholder={`Search for company by ${filterValue}`}
          className='w-full px-4 py-2 mb-10 rounded-md border border-gray-300'
        />
        <div className='h-[1px] w-full bg-gray-200 mb-6'></div>

        <div className='space-y-4'>
          {companies.map((company) => (
            <div key={company.id} className='flex items-center gap-4 p-4 pl-0 '>
              <Image src='/images/Rectangle12.png' alt='image' width={198} height={230} className='h-[230px]' />
              <div className='flex flex-col'>
                <h3 className='text-[24px] font-semibold mb-6'>{company.name}</h3>
                <div className='flex items-center text-[16px] mb-8'>
                  <LocationIcon className='w-5 h-5' />
                  {company.country}
                </div>
                <p className='text-[16px]'>{company.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='w-64 shrink-0 rounded-[4px] border-l-gray-200 border-r-gray-200 h-fit shadow-[0_1.2px_2.3px_rgba(217,216,219,0.4)]'>
        <div className='flex items-baseline gap-4 px-8 py-5'>
          <ArrowClose
            className={clsx(
              isOpenFilterList ? 'rotate-180 ' : 'rotate-0',
              'w-4 h-4 cursor-pointer transition-transform duration-300 ease-in-out'
            )}
            onClick={() => {
              setIsOpenFilterList(!isOpenFilterList);
            }}
          />
          <span className='font-semibold text-[18px]'>Filter</span>
          <span className='text-[16px] bg-gray-200  px-2 py-0.5 rounded-full'>{filterList.length}</span>
        </div>
        <div className={clsx(isOpenFilterList ? 'block' : 'hidden')}>
          {filterList.length > 0 && (
            <>
              <div className='flex flex-col gap-3 px-8 py-5' id='filterList'>
                {filterList.map((filter, index) => (
                  <div
                    key={index}
                    className='flex items-center px-3 py-1.5 bg-gray-100 rounded-[4px] text-[16px] gap-4'
                  >
                    <CloseIcon
                      className='w-4 h-4 cursor-pointer'
                      onClick={() => deleteFilterValue(filter)}
                      alt='image'
                    />

                    <span>{filter}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setFilterList([])}
                className='mt-4 cursor-pointer flex items-center justify-center bg-gray-100 text-[16px] font-semibold px-8 py-5 hover:underline w-full transition-all duration-300 ease-in-out'
              >
                Reset filter
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDirectoryPage;
