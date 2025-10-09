// 'use client';

// import React, { useState, useMemo } from 'react';
// import Image from 'next/image';
// import Map, { Source, Layer, Marker, Popup } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// // Потрібно додати свій токен Mapbox сюди або в .env і прочитати через process.env
// const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN_HERE';

// // Дані країн
// const countriesData = [
//   { code: 'CZ', name: 'Czech Republic', participants: 2, coordinates: [14.4378, 50.0755] },
//   { code: 'DE', name: 'Germany', participants: 7, coordinates: [10.4515, 51.1657] },
//   { code: 'UA', name: 'Ukraine', participants: 15, coordinates: [31.1656, 48.3794] },
//   { code: 'IT', name: 'Italy', participants: 3, coordinates: [12.4964, 41.9028] },
//   { code: 'PL', name: 'Poland', participants: 8, coordinates: [19.1451, 51.9194] },
//   { code: 'ES', name: 'Spain', participants: 5, coordinates: [-3.7038, 40.4168] },
//   { code: 'GB', name: 'United Kingdom', participants: 1, coordinates: [-0.1276, 51.5074] },
// ];

// // Функція для підбору кольору по кількості учасників
// const getColor = (value: number) => {
//   if (value < 1) return '#DDEEDB'; // light green
//   if (value <= 10) return '#F6C28B'; // gold
//   return '#E9A1A1'; // orangered
// };

// // Приклад GeoJSON (потрібно імпортувати або завантажити)
// import countriesGeoJSON from '../../../public/';

// export const World = () => {
//   const [popupInfo, setPopupInfo] = useState<null | (typeof countriesData)[0]>(null);

//   // Створюємо обʼєкт з кодами країн та їх учасниками для стилізації
//   const participantsByCode = useMemo(() => {
//     const obj: Record<string, number> = {};
//     countriesData.forEach(({ code, participants }) => {
//       obj[code.toUpperCase()] = participants;
//     });
//     return obj;
//   }, []);

//   // Стиль шару з країнами, фарбуємо залежно від учасників
//   const fillLayer = useMemo(
//     () => ({
//       id: 'country-fills',
//       type: 'fill',
//       source: 'countries',
//       paint: {
//         // Використовуємо expression для динамічного заливання
//         'fill-color': [
//           'match',
//           ['get', 'ISO_A2'],
//           ...countriesData.flatMap(({ code, participants }) => [code.toUpperCase(), getColor(participants)]),
//           '#ccc', // дефолтний колір для країн без даних
//         ],
//         'fill-opacity': 0.7,
//       },
//     }),
//     [countriesData]
//   );

//   return (
//     <section className='relative w-full px-4 md:px-10 bg-[#F6F6F6] overflow-hidden'>
//       <div>
//         <Image src='/images/caption.svg' alt='solution' width={118} height={32} className='mx-auto mb-6' />

//         <h2 className='text-center text-3xl font-bold text-[#1D1D1F] mb-4'>Where we work</h2>

//         <p className='text-center max-w-[600px] mx-auto text-[#1A1A1A] pb-15'>
//           Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
//         </p>

//         {/* Карта */}
//         <div className='max-w-3xl mx-auto rounded overflow-hidden shadow-md'>
//           <Map
//             initialViewState={{
//               longitude: 10,
//               latitude: 50,
//               zoom: 3,
//             }}
//             style={{ width: '100%', height: 500 }}
//             mapStyle='mapbox://styles/mapbox/light-v10'
//             mapboxAccessToken={MAPBOX_TOKEN}
//           >
//             {/* Шар з країнами */}
//             <Source id='countries' type='geojson' data={countriesGeoJSON}>
//               <Layer {...fillLayer} />
//             </Source>

//             {/* Прапорці країн */}
//             {countriesData.map(({ code, name, coordinates }) => (
//               <Marker key={code} longitude={coordinates[0]} latitude={coordinates[1]}>
//                 <img
//                   src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
//                   alt={name}
//                   className='w-6 h-4 object-cover rounded-sm cursor-pointer'
//                   onClick={() =>
//                     setPopupInfo({ code, name, coordinates, participants: participantsByCode[code.toUpperCase()] || 0 })
//                   }
//                 />
//               </Marker>
//             ))}

//             {/* Вікно з інформацією */}
//             {popupInfo && (
//               <Popup
//                 longitude={popupInfo.coordinates[0]}
//                 latitude={popupInfo.coordinates[1]}
//                 anchor='top'
//                 closeOnClick={true}
//                 onClose={() => setPopupInfo(null)}
//               >
//                 <div className='text-center'>
//                   <strong>{popupInfo.name}</strong>
//                   <p>Учасників: {popupInfo.participants}</p>
//                 </div>
//               </Popup>
//             )}
//           </Map>
//         </div>

//         {/* Список країн */}
//         <div className='bg-white rounded-lg p-10 shadow relative mt-10 max-w-3xl mx-auto'>
//           <h3 className='font-semibold pb-6 border-b border-dotted border-gray-200 text-[26px]'>
//             Already work with{' '}
//             <span className='text-orange-600 text-[26px] font-semibold'>{countriesData.length} countries</span>
//           </h3>
//           <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm pt-6'>
//             {countriesData.map((country) => (
//               <li key={country.code} className='flex items-center gap-2'>
//                 <img
//                   src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
//                   alt={country.name}
//                   className='w-4 h-4 object-cover rounded-full'
//                   loading='lazy'
//                 />
//                 <span className='text-[16px] font-semibold'>{country.name}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

'use client';
import { countryMap } from '@/constants';
import { fetchMembersList, fetchMembersList2 } from '@/services/api';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import WorldMap from 'react-svg-worldmap';

// Функція для підбору кольору
const getColor = (count: number) => {
  if (count < 1) return '#ffffff'; // lightgreen
  if (count <= 5) return '#FED7AA'; // orangered
  return '#F97316'; // red
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
          <div className='responsive-map-wrapper scale-x-130 scale-y-120'>
            <WorldMap
              data={mapData}
              valueSuffix='participants'
              color='orangered'
              backgroundColor='#F6F6F6'
              styleFunction={(context) => {
                const { countryValue } = context;
                return {
                  fill: getColor(countryValue || 0),
                  stroke: '#333',
                  strokeWidth: 0.5,
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

        <div className=' bg-white rounded-[20px] p-10  relative '>
          <h3 className='font-semibold pb-6 border-b border-dotted border-gray-200 text-[26px]'>
            Already work with <span className='text-orange-600 text-[26px]font-semibold'>{data.length} countries</span>
          </h3>
          <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm pt-6 max-h-[140px] overflow-y-auto'>
            {data.length > 0 &&
              data.map((country) => (
                <li key={country.country} className='flex items-center gap-2'>
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
