import { fetchContactSection } from '@/services/api';
import { AboutComponent } from './AboutComponent';

const AboutPage = async () => {
  const { data: contactData } = await fetchContactSection();

  return (
    <div>
      <AboutComponent contactData={contactData[0].content} />
    </div>
  );
};

export default AboutPage;
