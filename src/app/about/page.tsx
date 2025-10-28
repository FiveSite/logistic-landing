import { fetchAboutSectionText, fetchBenefits, fetchContactSection } from '@/services/api';
import { AboutComponent } from './AboutComponent';

const AboutPage = async () => {
  const { data: contactData } = await fetchContactSection();
  const { data: aboutData } = await fetchAboutSectionText();
  const { data: benefits } = await fetchBenefits();

  return (
    <div>
      <AboutComponent contactData={contactData[0].content} aboutData={aboutData[0]} benefits={benefits} />
    </div>
  );
};

export default AboutPage;
