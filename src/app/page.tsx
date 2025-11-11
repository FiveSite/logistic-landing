import { FaqSection } from './components/FaqSection';
import { BenefitsSection } from './components/BenefitsSection';
import { WorldSection } from './components/WorldSection';
import { PhotoSection } from './components/PhotoSection';
import ArticlesSection from './components/ArticlesSection';
import { cookies } from 'next/headers';

import {
  fetchBenefits,
  fetchConsultationSectionText,
  fetchFaqSectionText,
  fetchMainSectionText,
  fetchMembersList2,
  fetchPartners,
} from '@/services/api';
import { Main } from './components/Main';
import { getUserFromToken } from '@/services/auth';

export default async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  const user = await getUserFromToken(token ?? '');

  const { data } = await fetchMainSectionText();
  const { data: partners } = await fetchPartners();
  const { data: benefits } = await fetchBenefits();
  const { data: faqData } = await fetchFaqSectionText();
  const { data: countryData } = await fetchMembersList2();
  const { data: consultationData } = await fetchConsultationSectionText();

  return (
    <div className='flex flex-col items-center '>
      <Main user={user} data={data} partners={partners} />
      <BenefitsSection benefits={benefits} />
      <WorldSection countries={countryData} />
      <PhotoSection consultationData={consultationData} />
      <ArticlesSection />
      <FaqSection faqData={faqData.content} />
    </div>
  );
}
