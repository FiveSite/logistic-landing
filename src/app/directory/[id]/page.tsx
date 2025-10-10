import { CompanyProfileComponent } from '@/app/profile/CompanyProfileComponent';
import { fetchMember } from '@/services/api';

type DirectoryDetailsPageProps = {
  params: {
    id: string;
  };
};

const DirectoryDetailsPage = async ({ params }: DirectoryDetailsPageProps) => {
  const { id } = params;

  const data = await fetchMember(id);

  return (
    <div className='bg-[#F6F6F6]'>
      <CompanyProfileComponent user={data.data} />
    </div>
  );
};

export default DirectoryDetailsPage;
