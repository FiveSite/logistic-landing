'use client';
import clsx from 'clsx';
import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import PlusIcon from '../../../public/icons/plus.svg';
import CloseIcon from '../../../public/icons/close-icon.svg';

const supportData = [
  {
    id: 0,
    title: 'How does the platform connect logistics companies?',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
  },
  {
    id: 1,
    title: 'What are the benefits of becoming a partner?',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
  },
  {
    id: 2,
    title: 'How can my company apply for membership?',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
  },
  {
    id: 3,
    title: 'Do you offer assistance with cross-border logistics?',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
  },
  {
    id: 4,
    title: 'How do I manage my company profile?',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
  },
];

export const FaQ = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [expanded, setExpanded] = useState<number | false>(false);
  const handleChange = (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <h2 className='text-3xl font-bold  mb-4'>Frequently Asked Questions</h2>
      <p className=' max-w-[600px]   mb-8'>
        Find answers about joining, using, and partnering with our logistics network across Africa and globally.
      </p>
      <div className='flex gap-1.5  overflow-x-auto rounded-full border border-gray-200 bg-white p-2 max-w-[428px] h-[54px] mb-8'>
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
      </div>
      <div className='max-w-[600px]'>
        {supportData.map((data) => {
          return (
            <Accordion
              key={data.id}
              expanded={expanded === data.id}
              onChange={handleChange(data.id)}
              disableGutters
              elevation={0}
              square
              className='mb-4 rounded-[20px] overflow-hidden border border-gray-200 bg-white/30 backdrop-blur-[20px]'
            >
              <AccordionSummary
                expandIcon={
                  expanded === data.id ? (
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
                <p className='text-[14px]'>{data.description}</p>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </>
  );
};
