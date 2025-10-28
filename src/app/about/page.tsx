import { fetchAboutSectionText, fetchContactSection } from '@/services/api';
import { AboutComponent } from './AboutComponent';

const AboutPage = async () => {
  const { data: contactData } = await fetchContactSection();
  const { data: aboutData } = await fetchAboutSectionText();

  return (
    <div>
      <AboutComponent contactData={contactData[0].content} aboutData={aboutData[0]} />
    </div>
  );
};

export default AboutPage;
