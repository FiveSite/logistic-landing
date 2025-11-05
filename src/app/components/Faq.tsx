'use client';

import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import PlusIcon from '../../../public/icons/plus.svg';
import CloseIcon from '../../../public/icons/close-icon.svg';

export const FaQ = ({ faqData }: { faqData: { title: string; body: string }[] }) => {
  // const [activeTab, setActiveTab] = useState('General');
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <h2 className='text-3xl max-sm:text-center font-bold  mb-4'>Frequently Asked Questions</h2>
      <p className=' max-w-[600px] max-sm:text-center   mb-8'>
        Find answers about joining, using, and partnering with our logistics network across Africa and globally.
      </p>
      {/* <div className='flex gap-1.5  overflow-x-auto rounded-full border border-gray-200 bg-white p-2 max-w-[428px] h-[54px] mb-8'>
        <button
          onClick={() => setActiveTab('General')}
          className={clsx(
            'cursor-pointer px-5 py-2 text-sm font-medium rounded-full transition hover:bg-orange-600 hover:text-white',
            activeTab === 'General' && 'bg-orange-600 text-white rounded-full transition'
          )}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('Membership')}
          className={clsx(
            'cursor-pointer px-5 py-2 text-sm font-medium rounded-full transition hover:bg-orange-600 hover:text-white',
            activeTab === 'Membership' && 'bg-orange-600 text-white rounded-full transition'
          )}
        >
          Membership
        </button>
        <button
          onClick={() => setActiveTab('Support')}
          className={clsx(
            'cursor-pointer px-5 py-2 text-sm font-medium rounded-full transition hover:bg-orange-600 hover:text-white',
            activeTab === 'Support' && 'bg-orange-600 text-white rounded-full transition'
          )}
        >
          Support
        </button>
        <button
          onClick={() => setActiveTab('Platform')}
          className={clsx(
            'cursor-pointer px-5 py-2 text-sm font-medium rounded-full transition hover:bg-orange-600 hover:text-white',
            activeTab === 'Platform' && 'bg-orange-600 text-white rounded-full transition'
          )}
        >
          Platform
        </button>
      </div> */}
      <div className='max-w-[600px]'>
        {faqData &&
          faqData.map((data) => {
            return (
              <Accordion
                key={data.title}
                expanded={expanded === data.title}
                onChange={handleChange(data.title)}
                disableGutters
                elevation={0}
                square
                className='mb-4 rounded-[20px] overflow-hidden border border-gray-200 bg-white/30 backdrop-blur-[20px]'
              >
                <AccordionSummary
                  expandIcon={
                    expanded === data.title ? (
                      <CloseIcon style={{ fill: 'black' }} />
                    ) : (
                      <PlusIcon style={{ stroke: 'black' }} />
                    )
                  }
                  aria-controls={data.title}
                  id={data.title}
                >
                  <p className='text-[16px] font-semibold'>{data.title}</p>
                </AccordionSummary>
                <AccordionDetails>
                  <p className='text-[14px]'>{data.body}</p>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    </>
  );
};
