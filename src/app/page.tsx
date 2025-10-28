import { FaqSection } from './components/FaqSection';
import { BenefitsSection } from './components/BenefitsSection';
import { WorldSection } from './components/WorldSection';
import { PhotoSection } from './components/PhotoSection';
import ArticlesSection from './components/ArticlesSection';
import { MainComponent } from './components/MainComponent';
import { fetchBenefits, fetchFaqSectionText, fetchMembersList2 } from '@/services/api';

export default async function Home() {
  const data = await fetchBenefits();

  const { data: countryData } = await fetchMembersList2();

  const { data: faqData } = await fetchFaqSectionText();

  return (
    <main className='flex flex-col items-center '>
      <MainComponent />
      <BenefitsSection benefits={data} />
      <WorldSection countries={countryData} />
      <PhotoSection />
      <ArticlesSection />
      <FaqSection faqData={faqData[0].content} />
    </main>
  );
}
