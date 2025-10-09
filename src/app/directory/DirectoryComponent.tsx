'use client';
import { useEffect, useState } from 'react';
import LocationIcon from '../../../public/icons/location.svg';
import VerifyIcon from '../../../public/icons/verify-icon.svg';
import Image from 'next/image';
import { fetchCountriesList, fetchMembersList } from '@/services/api';
import { Country } from '../components/form/formStepper/CompanyDetailsForm';

import { SelectComponent } from '../components/SelectComponent';
import { countryMap, services } from '@/constants';
import { useRouter } from 'next/navigation';
import { PaginationComponent } from '../components/Pagination';

export const DirectoryComponent = () => {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [members, setMembers] = useState<any[]>([]);
  console.log('members', members);

  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const [countryData, setCountryData] = useState<Country[] | []>([]);
  const [selectedCountry, setSelectedCountry] = useState({
    value: '',
    label: '',
  });

  const [selectedCity, setSelectedCity] = useState({
    value: '',
    label: '',
  });
  const [selectedConpany, setSelectedCompany] = useState({
    value: '',
    label: '',
  });

  const [selectedServices, setSelectedServices] = useState({
    value: '',
    label: '',
  });

  const options = countryData.map((item) => {
    return {
      value: item.iso2,
      label: item.country,
    };
  });

  const cities = countryData
    .map((item) =>
      item.country === selectedCountry.label ? item.cities.map((city) => ({ value: city, label: city })) : []
    )
    .flat();

  const companies = members.map((item: { company: string }) => {
    return {
      value: item.company,
      label: item.company,
    };
  });

  const servicesOptions = services.map((service: string) => ({ value: service, label: service }));

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
      console.log(e);
      setCountryData([]);
    }
  };

  const handleCountryChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: { value: string; label: string } | null
  ) => {
    setSelectedCountry(value ?? { value: '', label: '' });
  };

  const handleCityChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: { value: string; label: string } | null
  ) => {
    setSelectedCity(value ?? { value: '', label: '' });
  };

  const handleCompanyChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: { value: string; label: string } | null
  ) => {
    setSelectedCompany(value ?? { value: '', label: '' });
  };

  const handleServicesChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: { value: string; label: string } | null
  ) => {
    setSelectedServices(value ?? { value: '', label: '' });
  };

  const handlePageClick = (_: React.MouseEvent | unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    getCountriesList();
  }, []);

  useEffect(() => {
    const getMembersList = async () => {
      setIsLoading(true);
      try {
        const res = await fetchMembersList({
          page,
          countryValue: selectedCountry.value,
          cityValue: selectedCity.value,
          companyValue: selectedConpany.value,
          servicesValue: selectedServices.value,
          searchValue,
        });
        console.log('res', res);
        setMembers(res.data);
        setTotalPages(res.meta.pagination.pageCount);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching members:', error);
        setIsLoading(false);
      }
    };

    getMembersList();
  }, [page, selectedCity, selectedConpany, selectedCountry, selectedServices, searchValue]);

  return (
    <div className='flex gap-6 px-[166px] py-[60px] pt-[160px]'>
      <div className='flex-1'>
        <input
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Search for company by...'
          className='placeholder:text-[#6B7280] w-full max-w-[800px] px-4 py-2.5 mb-6 rounded-[100px] border border-[#F1F3F7] bg-white text-[16px] shadow-[0px_1px_14px_rgba(25,33,61,0.08)] focus:outline-none hover:border-orange-600 focus:border-orange-600 transition-colors'
        />

        <div className='flex gap-2 mb-6'>
          <SelectComponent options={options} label='Country' value={selectedCountry} onChange={handleCountryChange} />
          <SelectComponent
            options={cities}
            label='City'
            value={selectedCity}
            onChange={handleCityChange}
            isDisabled={!selectedCountry.value}
          />
          <SelectComponent options={companies} label='Company' value={selectedConpany} onChange={handleCompanyChange} />
          <SelectComponent
            options={servicesOptions}
            label='Services'
            value={selectedServices}
            onChange={handleServicesChange}
          />
        </div>

        <div className='space-y-4 flex flex-col gap-2'>
          {members.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            members.map((company: any) => (
              <div
                onClick={() => router.push(`/directory/${company.documentId}`)}
                key={company.id}
                className='flex  gap-6 bg-white rounded-[8px] cursor-pointer'
              >
                <div className='flex items-center justify-center p-6 shrink-0'>
                  {company.companyLogo ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${company.companyLogo.url}`}
                      alt='image'
                      width={167}
                      height={167}
                    />
                  ) : (
                    <Image src='/images/image-exp.png' alt='image' width={167} height={167} className='h-[167px]' />
                  )}
                </div>
                <div className='flex flex-col p-6 pl-0'>
                  <div className='flex items-center gap-4 mb-6'>
                    <h3 className='text-[24px] leading-[24px] font-semibold'>{company.company}</h3>
                    {company.isVerified && <VerifyIcon className='w-8 h-8' />}
                  </div>
                  <div className='flex items-center text-[16px] mb-6'>
                    <LocationIcon className='w-5 h-5' />
                    {countryMap[company.country]} - {company.address}
                  </div>
                  <p className='text-[16px] line-clamp-2 pr-30'>{company.profile}</p>
                  <div className='flex flex-wrap gap-2 mt-6'>
                    {company.services.map((item: string, idx: number) => {
                      return (
                        <div
                          key={idx}
                          className='flex items-center text-[16px] border border-gray-200 px-2 py-0.5 rounded-[8px]'
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center min-h-[150px]'>
              <p className='text-[16px] text-gray-500'>No members found</p>
            </div>
          )}
        </div>
        <div className='mt-8'>
          <PaginationComponent handleChange={handlePageClick} page={page} pageCount={totalPages} />
        </div>
      </div>
    </div>
  );
};
