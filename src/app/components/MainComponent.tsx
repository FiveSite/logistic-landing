import { cookies } from 'next/headers';
import { getUserFromToken } from '@/services/auth';
import { Main } from './Main';

export const MainComponent = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  const user = await getUserFromToken(token ?? '');

  return (
    <div>
      <Main user={user} />
    </div>
  );
};
