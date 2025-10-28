import { cookies } from 'next/headers';
import { getUserFromToken } from '@/services/auth';
import { Main } from './Main';
import { fetchMainSectionText } from '@/services/api';

export const MainComponent = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  const user = await getUserFromToken(token ?? '');
  const { data } = await fetchMainSectionText();

  return (
    <div>
      <Main user={user} data={data} />
    </div>
  );
};
