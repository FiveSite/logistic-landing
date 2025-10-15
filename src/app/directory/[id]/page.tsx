import { CompanyProfileComponent } from '@/app/profile/CompanyProfileComponent';
import { fetchMember } from '@/services/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type DirectoryDetailsPageProps = {
  params: {
    id: string;
  };
};

const DirectoryDetailsPage = async ({ params }: DirectoryDetailsPageProps) => {
  const { id } = params;

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const data = await fetchMember(id, token ?? '');

  if (!data.data) {
    redirect('/');
  }

  return (
    <div className='bg-[#F6F6F6]'>
      <CompanyProfileComponent user={data.data} />
    </div>
  );
};

export default DirectoryDetailsPage;
