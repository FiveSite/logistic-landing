'use client';
import { useState } from 'react';
import { Contacts } from './Contacts';
import { FaQ } from '../components/Faq';
import { SupportForm } from '../components/form/SupportForm';

const tabs = ['Contacts', 'Support', 'F.A.Q.'];

const ContactsPage = () => {
  const [activeTab, setActiveTab] = useState('Contacts');

  const renderContent = (tab: string) => {
    switch (tab) {
      case 'Contacts':
        return <Contacts />;
      case 'Support':
        return <SupportForm />;
      case 'F.A.Q.':
        return (
          <div className='flex flex-col '>
            <FaQ />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='py-[100px] px-[160px] pt-[160px]'>
      <div className='flex gap-[140px]'>
        {/* Navigation */}
        <aside className='min-w-[160px]'>
          <h2 className='text-[30px] mb-12 font-semibold'>Navigation</h2>
          <div className='flex flex-col gap-10'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[20px] text-left ${
                  activeTab === tab ? 'font-semibold text-[#1A1A1A]' : 'text-[#888888]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className='flex-1'>{renderContent(activeTab)}</div>
      </div>
    </div>
  );
};

export default ContactsPage;
