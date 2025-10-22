'use client';
import { countryMap } from '@/constants';
import { fetchMembersList, fetchMembersList2 } from '@/services/api';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import WorldMap from 'react-svg-worldmap';

// Функція для підбору кольору
const getColor = (count: number) => {
  if (count < 1) return '#ffffff'; // light
  if (count <= 2) return '#FFC2A6'; // orangered
  if (count <= 3) return '#FF6A33';
  return '#FF4500'; // intenced
};

const countCountries = (data: { country: string }[]) => {
  const map = new Map<string, number>();

  for (const item of data) {
    map.set(item.country, (map.get(item.country) || 0) + 1);
  }

  return Array.from(map.entries()).map(([country, count]) => ({
    country,
    name: countryMap[country],
    count,
  }));
};

export const World = () => {
  const [data, setData] = useState<{ country: string; name: string; count: number }[]>([]);

  const getMembers = async () => {
    try {
      const { data } = await fetchMembersList2();
      setData(countCountries(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const mapData = data.map((c) => ({
    country: c.country.toLowerCase(), // react-svg-worldmap очікує lower-case ISO-код
    value: c.count,
  }));

  return (
    <section className='relative w-full px-4 md:px-10 bg-[#F6F6F6] overflow-hidden'>
      <div>
        <Image src='/images/caption.svg' alt='solution' width={118} height={32} className='mx-auto mb-6' />

        <h2 className='text-center text-3xl font-bold text-[#1D1D1F] mb-4'>Where we work</h2>

        <p className='text-center max-w-[600px] mx-auto text-[#1A1A1A] pb-15'>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
        </p>

        {/* Карта */}

        <div className='max-w-3xl mx-auto  bg-[#F6F6F6] rounded'>
          <div className='responsive-map-wrapper lg:scale-x-130 scale-x-105 scale-y-105 pl-2 lg:scale-y-120'>
            <WorldMap
              data={mapData}
              valueSuffix='participants'
              color='orangered'
              backgroundColor='#F6F6F6'
              styleFunction={(context) => {
                const { countryValue } = context;
                return {
                  fill: getColor(countryValue || 0),
                  stroke: '#000',
                  strokeWidth: 1,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    fill: '#000',
                  },
                };
              }}
            />
          </div>
        </div>

        <div className=' bg-white max-sm:bg-white/60 rounded-[20px] p-10 max-sm:p-4 relative max-sm:mt-4'>
          <h3 className='max-sm:text-center font-semibold pb-6 border-b border-dotted border-gray-200 text-[26px] max-sm:text-[24px] leading-none'>
            Already work with <span className=' text-orange-600 text-[26px]font-semibold'>{data.length} countries</span>
          </h3>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm pt-6 max-h-[140px] max-sm:max-h-[400px] overflow-y-auto'>
            {data.length > 0 &&
              data.map((country) => (
                <li
                  key={country.country}
                  className='flex items-center gap-2 max-sm:border max-sm:rounded-[8px] max-sm:py-2 max-sm:px-4 max-sm:border-gray-200 max-sm:bg-white'
                >
                  <Image
                    src={`https://flagcdn.com/w40/${country.country.toLowerCase()}.png`}
                    alt={country.name}
                    width={16}
                    height={16}
                    className='w-4 h-4 object-cover rounded-full'
                    loading='lazy'
                    unoptimized
                  />
                  <span className='text-[16px] font-semibold'>{country.name}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
