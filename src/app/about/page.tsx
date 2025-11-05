import { fetchAboutSectionText, fetchBenefits, fetchContactSection } from '@/services/api';
import { AboutComponent } from './AboutComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Benefits & Mission & History  | African Alliance Logistics Network',
  description:
    'Discover the history and mission of the African Alliance Logistic Network. See how our commitment to trust and B2B growth benefits our freight forwarding members.', // Унікальний опис
};

const AboutPage = async () => {
  const { data: contactData } = await fetchContactSection();
  const { data: aboutData } = await fetchAboutSectionText();
  const { data: benefits } = await fetchBenefits();

  return (
    <div>
      <AboutComponent contactData={contactData.content} aboutData={aboutData} benefits={benefits} />
    </div>
  );
};

export default AboutPage;
