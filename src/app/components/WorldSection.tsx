'use client';
import { countryMap } from '@/constants';
import { countCountries } from '@/utils/map';
import Image from 'next/image';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// ✅ НОВИЙ ІМПОРТ MUI
import Tooltip from '@mui/material/Tooltip';
// Видаляємо: import { useRef, useState } from 'react';
// Видаляємо: import { Tooltip, ITooltip } from 'react-tooltip';
// Видаляємо: import type { ITooltip } from 'react-tooltip';

export const WorldSection = ({ countries }: { countries: { country: string; name: string; count: number }[] }) => {
  const data = countCountries(countries);

  const mapData = data.map((c) => ({
    // Зберігаємо ISO-код для пошуку.
    id: c.country,
    country: countryMap[c.country].toLowerCase(),
    count: c.count,
  }));

  const getColor = (count: number) => {
    if (count < 1) return '#ffffff';
    if (count <= 2) return '#FFC2A6';
    if (count <= 3) return '#FF6A33';
    return '#FF4500';
  };

  // ВИДАЛЯЄМО: стани tooltipContent, countryCode та tooltipRef, оскільки вони не потрібні

  return (
    <section className='relative w-full px-4 md:px-10 bg-[#F6F6F6] overflow-hidden'>
      <div>
        <Image src='/images/caption.svg' alt='solution' width={118} height={32} className='mx-auto mb-6' />

        <h2 className='text-center text-3xl font-bold text-[#1D1D1F] mb-4'>Where we work</h2>

        <p className='text-center max-w-[600px] mx-auto text-[#1A1A1A] mb-10'>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
        </p>

        {/* Карта */}
        <div className='max-h-[800px] max-lg:max-h-[700px] overflow-hidden mx-auto'>
          <ComposableMap
            className='max-h-[900px] max-lg:max-h-[700px] mx-auto'
            projection='geoMercator'
            projectionConfig={{
              scale: 100,
            }}
          >
            <Geographies geography={'/features.json'}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const currentCountryData = mapData.find((d) => d.id === geo.properties.name);
                  const count = currentCountryData?.count || 0;

                  const isoCode = countryMap[geo.properties.name] && countryMap[geo.properties.name].toLowerCase();
                  const countryName = geo.properties.name;

                  const tooltipTitle = (
                    <div style={{ display: 'flex', alignItems: 'center', padding: '4px' }}>
                      {isoCode && (
                        // Використовуємо звичайний <img> для сумісності з MUI Tooltip
                        <img
                          src={`https://flagcdn.com/w20/${isoCode}.png`}
                          alt={`Flag of ${countryName}`}
                          style={{
                            width: '20px',
                            height: '15px',
                            marginRight: '8px',
                            borderRadius: '2px',
                            boxShadow: '0 0 2px rgba(0,0,0,0.3)',
                          }}
                        />
                      )}
                      <span style={{ fontWeight: 'bold' }}>
                        {countryName}: {count} participants
                      </span>
                    </div>
                  );

                  return (
                    // 2. ОБГОРТАЄМО КОМПОНЕНТ GEOGRAPHY В MUI TOOLTIP
                    // Оскільки Tooltip очікує єдиний елемент DOM, використовуємо <g> для обгортки SVG-елемента
                    <Tooltip
                      key={geo.rsmKey} // Ключ тут потрібен для ітерації
                      title={tooltipTitle}
                      placement='top'
                      arrow
                      // Налаштування для стилізації тултіпу
                      PopperProps={{
                        modifiers: [
                          {
                            name: 'offset',
                            options: {
                              offset: [0, -10], // Зсув тултіпу
                            },
                          },
                        ],
                      }}
                    >
                      {/* <g> служить єдиним кореневим елементом, який очікує MUI Tooltip */}
                      <g>
                        <Geography
                          // Видалено всі onMouseEnter/onMouseLeave та data-tooltip-id
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            default: {
                              fill: getColor(count),
                              stroke: '#808080',
                              strokeWidth: 0.5,
                              outline: 'none',
                            },
                            hover: {
                              fill: 'getColor(count)', // Жовтий hover для кращої інтерактивності
                              stroke: '#666666',
                              outline: 'none',
                              strokeWidth: 1,
                            },
                            pressed: {
                              fill: getColor(count) || '#C1C1C1',
                              stroke: '#666666',
                              outline: 'none',
                              strokeWidth: 1,
                            },
                          }}
                        />
                      </g>
                    </Tooltip>
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        <div className=' bg-white max-sm:bg-white/70 rounded-[20px] p-10 max-sm:p-4 relative mt-[-80px] max-md:mt-[-40px]'>
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
                    src={`https://flagcdn.com/w40/${country.name.toLowerCase()}.png`}
                    alt={country.name}
                    width={16}
                    height={16}
                    className='w-4 h-4 object-cover rounded-full'
                    loading='lazy'
                    unoptimized
                  />
                  <span className='text-[16px] font-semibold'>
                    {country.country} ({country.count})
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// 'use client';
// import { countryMap } from '@/constants';
// import { countCountries } from '@/utils/map';
// import Image from 'next/image';
// import { useRef, useState } from 'react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// // import { Tooltip, ITooltip } from 'react-tooltip';
// import { Tooltip } from 'react-tooltip';
// import type { ITooltip } from 'react-tooltip';

// export const WorldSection = ({ countries }: { countries: { country: string; name: string; count: number }[] }) => {
//   const data = countCountries(countries);

//   const mapData = data.map((c) => ({
//     id: c.country,
//     country: countryMap[c.country].toLowerCase(), // react-svg-worldmap очікує lower-case ISO-код
//     count: c.count,
//   }));

//   console.log(mapData);

//   const getColor = (count: number) => {
//     if (count < 1) return '#ffffff';
//     if (count <= 2) return '#FFC2A6';
//     if (count <= 3) return '#FF6A33';
//     return '#FF4500';
//   };

//   // 1. Стан для даних країни, на яку наведено курсор
//   const [tooltipContent, setTooltipContent] = useState<string>('');

//   // 2. Стан для коду країни, щоб відобразити прапор
//   const [countryCode, setCountryCode] = useState<string>('');

//   // 3. Референс для управління тултіпом (якщо потрібне ручне оновлення)
//   const tooltipRef = useRef<ITooltip>(null);

//   return (
//     <section className='relative w-full px-4 md:px-10 bg-[#F6F6F6] overflow-hidden'>
//       <div>
//         <Image src='/images/caption.svg' alt='solution' width={118} height={32} className='mx-auto mb-6' />

//         <h2 className='text-center text-3xl font-bold text-[#1D1D1F] mb-4'>Where we work</h2>

//         <p className='text-center max-w-[600px] mx-auto text-[#1A1A1A] '>
//           Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
//         </p>

//         {/* Карта */}
//         <div className='max-h-[800px] overflow-hidden'>
//           <ComposableMap
//             projection='geoMercator'
//             projectionConfig={{
//               scale: 90,
//             }}
//           >
//             <Geographies geography={'/features.json'}>
//               {({ geographies }) =>
//                 geographies.map((geo) => {
//                   console.log(geo);
//                   const currentCountryData = mapData.find((d) => d.id === geo.properties.name);
//                   const count = currentCountryData?.count || 0;

//                   const isoCode = currentCountryData?.country;
//                   const countryName = geo.properties.name;

//                   const tooltipTitle = (
//                     <div style={{ display: 'flex', alignItems: 'center', padding: '4px' }}>
//                       {isoCode && (
//                         // Тут використовуємо звичайний <img>, оскільки Next.js <Image> може мати проблеми з MUI
//                         <img
//                           src={`https://flagcdn.com/w20/${isoCode}.png`}
//                           alt={`Flag of ${countryName}`}
//                           style={{
//                             width: '20px',
//                             height: '15px',
//                             marginRight: '8px',
//                             borderRadius: '2px',
//                             boxShadow: '0 0 2px rgba(0,0,0,0.3)',
//                           }}
//                         />
//                       )}
//                       <span>
//                         {countryName}: {count} participants
//                       </span>
//                     </div>
//                   );

//                   return (
//                     <Tooltip
//                       key={geo.rsmKey}
//                       id='my-map-tooltip'
//                       title={tooltipTitle}
//                       placement='top' // Положення підказки
//                       arrow // Стрілка
//                       // 3. Зверніть увагу: ми використовуємо компонент Span, щоб обернути Geography
//                       // Якщо Geography не може бути безпосереднім дочірнім елементом Tooltip, використовуйте span
//                     >
//                       <Geography
//                         key={geo.rsmKey}
//                         geography={geo}
//                         data-tooltip-id='my-map-tooltip'
//                         style={{
//                           default: {
//                             fill: getColor(count),
//                             stroke: '#808080',
//                             strokeWidth: 0.5,
//                             outline: 'none',
//                           },
//                           hover: {
//                             fill: getColor(count),
//                             stroke: '#666666',
//                             outline: 'none',
//                             strokeWidth: 1,
//                           },
//                           pressed: {
//                             fill: getColor(count) || '#C1C1C1',
//                             stroke: '#666666',
//                             outline: 'none',
//                             strokeWidth: 1,
//                           },
//                         }}
//                         // 2. Обробник наведення курсору
//                         onMouseEnter={() => {
//                           setTooltipContent(`${currentCountryData?.id || geo.properties.name}: ${count} participants`);
//                           setCountryCode(currentCountryData?.country || countryMap[geo.properties.name].toLowerCase());
//                           // Ручне оновлення, щоб Tooltip знав, що контент змінився
//                           if (tooltipRef.current) {
//                             tooltipRef.current.updateContent(null);
//                           }
//                         }}
//                         // 3. Обробник відведення курсору
//                         onMouseLeave={() => {
//                           setTooltipContent('');
//                           setCountryCode('');
//                         }}
//                       />
//                     </Tooltip>
//                   );
//                 })
//               }
//             </Geographies>
//           </ComposableMap>
//         </div>

//         <div className=' bg-white max-sm:bg-white/70 rounded-[20px] p-10 max-sm:p-4 relative max-sm:mt-4'>
//           <h3 className='max-sm:text-center font-semibold pb-6 border-b border-dotted border-gray-200 text-[26px] max-sm:text-[24px] leading-none'>
//             Already work with <span className=' text-orange-600 text-[26px]font-semibold'>{data.length} countries</span>
//           </h3>
//           <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm pt-6 max-h-[140px] max-sm:max-h-[400px] overflow-y-auto'>
//             {data.length > 0 &&
//               data.map((country) => (
//                 <li
//                   key={country.country}
//                   className='flex items-center gap-2 max-sm:border max-sm:rounded-[8px] max-sm:py-2 max-sm:px-4 max-sm:border-gray-200 max-sm:bg-white'
//                 >
//                   <Image
//                     src={`https://flagcdn.com/w40/${country.name.toLowerCase()}.png`}
//                     alt={country.name}
//                     width={16}
//                     height={16}
//                     className='w-4 h-4 object-cover rounded-full'
//                     loading='lazy'
//                     unoptimized
//                   />
//                   <span className='text-[16px] font-semibold'>
//                     {country.country} ({country.count})
//                   </span>
//                 </li>
//               ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

{
  /* <Tooltip
            id='my-map-tooltip'
            place='top'
            effect='solid'
            ref={tooltipRef}
         
            render={({ content }) => (
              <div className='flex items-center space-x-2 p-1'>
              
                {countryCode && (
                  <Image
                    src={`https://flagcdn.com/w20/${countryCode}.png`}
                    alt={`Flag of ${countryCode}`}
                    width={20}
                    height={16}
                    className='rounded shadow-md'
                    unoptimized
                  />
                )}
     
                <span>{tooltipContent}</span>
              </div>
            )}
          /> */
}
