'use client';
import { countryMap } from '@/constants';
import { countCountries } from '@/utils/map';
import Image from 'next/image';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';

const getColor = (count: number) => {
  if (count < 1) return '#ffffff';
  if (count <= 2) return '#FFC2A6';
  if (count <= 3) return '#FF6A33';
  return '#FF4500';
};

const getDarkerColor = (count: number) => {
  // Для порожніх даних залишаємо білий колір
  if (count < 1) return '#EAEAEA';

  // Базовий: #FFC2A6 (Світло-оранжевий) -> Темніший: #FF9B66
  if (count <= 2) return '#FF9B66';

  // Базовий: #FF6A33 (Середній оранжевий) -> Темніший: #E65C2E
  if (count <= 3) return '#E65C2E';

  // Базовий: #FF4500 (Насичений оранжевий) -> Темніший: #CC3700
  // Це найвищий рівень, тому затемнюємо максимально
  return '#CC3700';
};

export const WorldSection = ({ countries }: { countries: { country: string; name: string; count: number }[] }) => {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const [mapScale, setMapScale] = useState(100);
  const [mapMargin, setMapMargin] = useState(20);

  const data = countCountries(countries);

  const mapData = data.map((c) => ({
    id: c.country,
    country: countryMap[c.country].toLowerCase(),
    count: c.count,
  }));

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setMapScale(125);
        setMapMargin(30);
      } else if (width < 1024) {
        setMapMargin(20);
      } else {
        setMapMargin(10);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className='relative w-full px-4 md:px-10 bg-[#F6F6F6] overflow-hidden'>
      <div>
        <Image src='/images/caption.svg' alt='solution' width={118} height={32} className='mx-auto mb-6' />

        <h2 className='text-center text-3xl font-bold text-[#1D1D1F] mb-4'>Where we work</h2>

        <p className='text-center max-w-[600px] mx-auto text-[#1A1A1A] max-sm:mb-6'>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
        </p>

        {/* Карта */}
        <div className='max-h-[800px] overflow-hidden mx-auto'>
          <ComposableMap
            className='max-h-[900px]  mx-auto'
            projection='geoMercator'
            projectionConfig={{
              scale: mapScale,
              center: [0, mapMargin],
            }}
          >
            <defs>
              {/* Фільтр, який створює тінь: зміщення по X/Y та розмиття */}
              <filter id='map-shadow' x='-50%' y='-50%' width='200%' height='200%'>
                {/* Розмиття (blur) */}
                <feGaussianBlur in='SourceAlpha' stdDeviation='2' result='blur' />

                {/* Зміщення тіні (drop shadow) */}
                <feOffset in='blur' dx='2' dy='2' result='offsetBlur' />

                {/* Колір тіні та прозорість */}
                <feFlood floodColor='#000000' floodOpacity='0.3' result='shadowColor' />

                {/* Комбінуємо тінь та фігуру */}
                <feComposite in='shadowColor' in2='offsetBlur' operator='in' result='shadow' />
                <feMerge>
                  <feMergeNode in='shadow' />
                  <feMergeNode in='SourceGraphic' /> {/* Оригінальна графіка (країна) */}
                </feMerge>
              </filter>

              <filter id='map-shadow-hover' x='-50%' y='-50%' width='200%' height='200%'>
                <feGaussianBlur in='SourceAlpha' stdDeviation='4' result='blur' /> {/* Більше розмиття */}
                <feOffset in='blur' dx='4' dy='4' result='offsetBlur' /> {/* Більше зміщення */}
                <feFlood floodColor='#000000' floodOpacity='0.4' result='shadowColor' />
                <feComposite in='shadowColor' in2='offsetBlur' operator='in' result='shadow' />
                <feMerge>
                  <feMergeNode in='shadow' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>
            </defs>
            <Geographies className='w-full h-full' geography={'/features.json'}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const currentCountryData = mapData.find((d) => d.id === geo.properties.name);
                  const count = currentCountryData?.count || 0;

                  const isoCode = countryMap[geo.properties.name] && countryMap[geo.properties.name].toLowerCase();
                  const countryName = geo.properties.name;

                  const tooltipTitle = (
                    <div style={{ display: 'flex', alignItems: 'center', padding: '4px' }}>
                      {isoCode && (
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
                    <Tooltip
                      key={geo.rsmKey}
                      title={tooltipTitle}
                      placement='top'
                      arrow
                      open={openTooltip === geo.rsmKey}
                      onClose={() => setOpenTooltip(null)}
                      onOpen={() => setOpenTooltip(geo.rsmKey)}
                      disableFocusListener
                      disableTouchListener={false}
                      PopperProps={{
                        modifiers: [
                          {
                            name: 'offset',
                            options: {
                              offset: [0, -10],
                            },
                          },
                        ],
                      }}
                    >
                      <g>
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => setOpenTooltip(openTooltip === geo.rsmKey ? null : geo.rsmKey)}
                          style={{
                            default: {
                              fill: getColor(count),
                              filter: 'url(#map-shadow)',
                              stroke: '#666666',
                              strokeWidth: 0.5,
                              outline: 'none',
                              transition: 'all 250ms',
                            },
                            hover: {
                              fill: getDarkerColor(count),
                              filter: 'url(#map-shadow-hover)',
                              stroke: '#666666',
                              outline: 'none',
                              strokeWidth: 1.5,
                              transition: 'all 250ms',
                            },
                            pressed: {
                              fill: getDarkerColor(count) || '#C1C1C1',
                              filter: 'url(#map-shadow-hover)',
                              stroke: '#666666',
                              outline: 'none',
                              strokeWidth: 1.5,
                              transition: 'all 250ms',
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

        <div className=' bg-white max-sm:bg-white/70 rounded-[20px] p-10 max-sm:p-4 relative mt-[-80px] max-sm:mt-[-10px]'>
          <h3 className='max-sm:text-center font-semibold pb-6 border-b border-dotted border-gray-200 text-[26px] max-sm:text-[24px] leading-none'>
            Already work with <span className=' text-orange-600 text-[26px]font-semibold'>{data.length} countries</span>
          </h3>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm pt-6 max-h-[140px] max-sm:max-h-[242px] overflow-y-auto'>
            {data.length > 0 &&
              data.map((country) => (
                <li
                  key={country.country}
                  className='flex items-center gap-2  max-sm:rounded-[8px] max-sm:py-2 max-sm:px-4  max-sm:bg-white'
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
