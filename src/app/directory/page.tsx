import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromToken } from '@/services/auth';
import { DirectoryComponent } from './DirectoryComponent';

const CompanyDirectoryPage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) {
    redirect('/');
  }

  const user = await getUserFromToken(token);

  console.log('user', user);
  console.log('token', token);

  if (!user) {
    redirect('/');
  }

  return (
    <div>
      <DirectoryComponent />
    </div>
  );
};

export default CompanyDirectoryPage;
