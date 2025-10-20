'use client';

import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import PlusIcon from '../../../public/icons/plus.svg';
import CloseIcon from '../../../public/icons/close-icon.svg';

const supportData = [
  {
    id: 0,
    title: 'How does African Alliance promote trust among members?',
    description:
      '- We ensure trust through strict compliance checks, continuous monitoring, and circulation of risk alerts. Members are expected to uphold the same professional and ethical standards.',
  },
  {
    id: 1,
    title: 'Can I collaborate with global companies directly through the network?',
    description:
      '- Yes. African Alliance Network is built to connect African freight forwarders with trusted global logistics partners. As a member, you can directly collaborate with international companies within the network, creating opportunities to expand your services, access new markets, and build long-term global partnerships.',
  },
  {
    id: 2,
    title: 'Can I apply if my company is new?',
    description:
      '- We welcome growing logistics companies! However, to ensure reliability and trust within our network, member companies must have at least two years of operational experience with verifiable financials. Once your business meets these criteria, we’ll be glad to have you join the African Alliance Network.',
  },
  {
    id: 3,
    title: 'Do you offer assistance with cross-border logistics?',
    description:
      '- Yes. Through our vetted members across Africa and worldwide, we provide seamless cross-border logistics solutions. Our network ensures smooth customs clearance, reliable transport, and end-to-end delivery for your clients.',
  },
  {
    id: 4,
    title: 'Is the network focused on air, sea, or land freight?',
    description: '- We cover all modes of transport (air, sea, land), with members specializing in different areas.',
  },
];

export const FaQ = () => {
  // const [activeTab, setActiveTab] = useState('General');
  const [expanded, setExpanded] = useState<number | false>(false);
  const handleChange = (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
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
