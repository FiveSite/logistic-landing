import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromToken } from '@/services/auth';
import { DirectoryComponent } from './DirectoryComponent';

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
