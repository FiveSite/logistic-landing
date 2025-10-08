import { CompanyProfileComponent } from './CompanyProfileComponent';
import { cookies } from 'next/headers';
import { getUserFromToken } from '@/services/auth';

export const CompanyProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const user = await getUserFromToken(token ?? '');
  console.log('user', user);
  return (
    <div className='bg-[#F6F6F6]'>
      <CompanyProfileComponent user={user} />
    </div>
  );
};

export default CompanyProfilePage;
