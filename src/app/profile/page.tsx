import { CompanyProfileComponent } from './CompanyProfileComponent';
import { cookies } from 'next/headers';
import { getUserFromToken } from '@/services/auth';
import { redirect } from 'next/navigation';

const CompanyProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const user = await getUserFromToken(token ?? '');

  if (!user) {
    redirect('/');
  }

  return (
    <div className='bg-[#F6F6F6]'>
      <CompanyProfileComponent user={user ?? null} isEditMode />
    </div>
  );
};

export default CompanyProfilePage;
