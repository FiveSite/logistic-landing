import Image from 'next/image';
import Link from 'next/link';
import EditIcon from '../../../public/icons/edit.svg';
import LocationIcon from '../../../public/icons/location.svg';
import { countryMap } from '@/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CompanyProfileComponent = ({ user }: { user: any }) => {
  return (
    <div>
      {' '}
      <section className='bg-gray-50 pb-16'>
        {/* Cover photo */}
        <div className=' h-[400px] bg-gray-200 flex items-center justify-center'>
          <button className='px-4 py-2 bg-gray-400 text-white text-[16px] rounded-[100px] hover:bg-gray-400 transition'>
            + Add cover photo
          </button>
        </div>

        {/* Company header */}
        <div className='max-w-6xl mx-auto mt-[-2.5rem] bg-white rounded-2xl shadow-sm flex items-center justify-between p-6'>
          <div className='flex items-center space-x-4'>
            <Image src='/images/image-exp.png' alt='company-img' width={90} height={90} />
            <div>
              <h1 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                DHL <Image src='/icons/verified.svg' alt='Verified' width={18} height={18} />
              </h1>
              <div className='flex items-center gap-2 '>
                <div className='flex items-center justify-center w-4 h-4'>
                  <LocationIcon className='' />
                </div>
                <p className='text-sm text-gray-600'>
                  {user.address} , {countryMap[user.country]}
                </p>
              </div>
            </div>
          </div>
          <Link
            href={'/profile/edit'}
            className='cursor-pointer border flex gap-2 items-center border-orange-600 text-orange-600 px-4 py-1.5 rounded-[100px]  hover:bg-[rgba(255,77,0,0.1)]  transition'
          >
            <div className='flex items-center justify-center w-4 h-4'>
              <EditIcon className='' />
            </div>
            Edit profile
          </Link>
        </div>

        <div className='max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8'>
          {/* Left column */}
          <div className='space-y-10'>
            {/* About company */}
            <div>
              <h2 className='text-lg font-semibold text-gray-900 mb-2'>About company</h2>
              <p className='text-gray-700 leading-relaxed text-sm'>
                Our expansion is not only a step forward for our company, but also a valuable advantage for our clients.
                Businesses of all sizes — from startups to multinational corporations — can now access faster supply
                lines, broader distribution opportunities, and smoother cross-border delivery. By opening up new
                connections across Europe, we are helping companies reduce costs, expand to fresh markets, and
                strengthen relationships with partners and...{' '}
                <span className='text-orange-500 cursor-pointer'>Read more</span>
              </p>
            </div>

            {/* Company branches */}
            <div>
              <h2 className='text-lg font-semibold text-gray-900 mb-4'>Company branches</h2>
              {/* <div className='space-y-4'>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className='bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition'
                  >
                    <div className='flex items-center gap-3'>
                      <Image src='/logos/dhl.png' alt='DHL' width={60} height={30} />
                      <div>
                        <h3 className='font-semibold text-gray-900'>DHL</h3>
                        <div>
                          <div className='flex items-center justify-center w-4 h-4'>
                            <LocationIcon className='' />
                          </div>
                          <p className='text-sm text-gray-600'>
                            {user.country}, {user.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      {['Express delivery', 'Logistics', 'Supply chain'].map((tag) => (
                        <span key={tag} className='text-sm bg-gray-100 px-3 py-1 rounded-md text-gray-700'>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className='text-sm text-gray-500'>135 workers</p>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Location */}
            <div className='p-6 bg-white rounded-[24px] shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-900 mb-3'>Location</h2>
              <div className='flex items-center gap-2  mb-4'>
                <div className='flex items-center justify-center w-4 h-4'>
                  <LocationIcon className='' />
                </div>
                <p className='text-sm text-gray-600'>
                  {user.address} , {countryMap[user.country]}
                </p>
              </div>
              <div>
                <iframe
                  src='https://www.google.com/maps?q=8502+Preston+Rd,+Inglewood,+Maine&output=embed'
                  className='w-full h-56'
                  loading='lazy'
                ></iframe>
                <div className='pt-4 space-y-2 text-sm text-gray-700'>
                  <p>📞 {user.contactNumber}</p>
                  <button className='mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition'>
                    View on map
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className='space-y-10'>
            {/* Services */}
            <div className='p-4 bg-white rounded-[24px] shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-900 mb-3'>Services</h2>
              <div className='flex flex-wrap gap-2'>
                {['Express delivery', 'Logistics', 'Supply chain'].map((service) => (
                  <span key={service} className='text-sm border border-gray-200 px-3 py-1 rounded-[8px] text-gray-700'>
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Contacts */}
            <div className='p-4 bg-white rounded-[24px] shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-900 mb-3'>Contacts</h2>
              <ul className='grid gap-y-2 text-sm text-gray-700'>
                <li className='grid [grid-template-columns:auto_1fr] gap-x-4 items-start'>
                  <p className='font-semibold w-[150px]'>Email:</p>
                  <span className='font-medium'>{user.contactEmail}</span>
                </li>
                <li className='grid [grid-template-columns:auto_1fr] gap-x-4 items-start'>
                  <p className='font-semibold w-[150px]'>Phone:</p>
                  <span className='font-medium'>{user.contactNumber}</span>
                </li>
                <li className='grid [grid-template-columns:auto_1fr] gap-x-4 items-start'>
                  <p className='font-semibold w-[150px]'>Website:</p>
                  <span className='font-medium text-orange-600 underline'>{user.website}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
