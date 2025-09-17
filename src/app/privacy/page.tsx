'use client';
import { useState } from 'react';

const sections = [
  {
    id: 'use-security',
    title: 'Use & security of collected information',
    content:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  },
  {
    id: 'your-choices',
    title: 'Your choices',
    content:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 'changes',
    title: 'Changes to privacy policy',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
];

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState('use-security');

  return (
    <div className='pt-[100px] pb-20 px-[160px]'>
      <div className='flex gap-[140px]'>
        {/* Sidebar Navigation */}
        <aside className='min-w-[240px] max-w-[300px]'>
          <h2 className='text-[30px] mb-12 font-semibold'>Navigation</h2>
          <div className='flex flex-col gap-8'>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`text-left text-[20px] ${
                  activeSection === section.id ? 'text-[#1A1A1A] font-semibold' : 'text-[#888888]'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className='flex-1 max-w-[800px]'>
          <h1 className='text-[30px] font-semibold mb-8'>Privacy Policy</h1>
          <p className='text-[#555] text-[16px] leading-[26px] mb-10'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard
            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>

          {sections.map((section) => (
            <div key={section.id} className='mb-10'>
              <h2 className='text-[18px] font-semibold mb-4'>{section.title}</h2>
              <p className='text-[#555] text-[16px] leading-[26px] mb-6'>{section.content.repeat(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
