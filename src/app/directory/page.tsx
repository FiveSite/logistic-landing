import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromToken } from '@/services/auth';
import { DirectoryComponent } from './DirectoryComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search African Logistics Partners | African Alliance Logistic Network',
  description:
    'Browse the African Alliance Logistic Network directory to find trusted freight forwarders and logistics partners. Connect with experienced professionals and expand your global network.',
};

const CompanyDirectoryPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/');
  }

  const user = await getUserFromToken(token);

  if (!user) {
    redirect('/');
  }

  return (
    <div className='bg-[#F6F6F6]'>
      <DirectoryComponent />
    </div>
  );
};

export default CompanyDirectoryPage;
