import { cookies } from 'next/headers';
import { getUserFromToken } from '@/services/auth';
import { ProfileComponent } from './ProfileComponent';
import { redirect } from 'next/navigation';

export const EditProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const user = await getUserFromToken(token ?? '');
  console.log('user', user);

  if (!user) {
    redirect('/');
  }

  return (
    <div className='bg-[#F6F6F6]'>
      <ProfileComponent user={user} />
    </div>
  );
};

export default EditProfilePage;
