import { axiosInstance } from '@/utils/axios';
import { nextAxios } from '@/utils/axios-next';

export async function signIn(email: string, password: string) {
  try {
    const res = await axiosInstance.post('/api/auth/local', {
      identifier: email,
      password,
    });
    return res.data;
  } catch (error) {
    console.log('Error login user:', error);
    return null;
  }
}

export async function getUserFromToken(token: string) {
  try {
    const res = await axiosInstance.get('/api/users/me?populate=*', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log('Error fetching user:', error);
    return null;
  }
}

export const updateMember = async (id: string, data: Record<string, string>) => {
  try {
    const res = await nextAxios.put(`/api/user/update`, { id, data });
    return res.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('files', file); // <-- важливо: "files"

  const res = await nextAxios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const uploadedFile = res.data?.[0];

  if (!uploadedFile?.id) {
    throw new Error('File upload failed');
  }

  console.log('Uploaded file info:', uploadedFile.id);

  // 2. Отримання детальної інформації про файл (включає url)
  const fileRes = await nextAxios.get(`/api/upload/files/${uploadedFile.id}`);
  const fileData = fileRes.data;

  if (!fileData.url) {
    throw new Error('Failed to retrieve file URL');
  }

  // 3. Повертаємо повний URL (з доменом Strapi)
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${fileData.url}`;

  return { fullUrl, id: uploadedFile.id };
}
