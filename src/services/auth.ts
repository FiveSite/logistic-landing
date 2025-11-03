import { axiosInstance } from '@/utils/axios';
import { nextAxios } from '@/utils/axios-next';
import { AxiosError } from 'axios';

export async function signIn(email: string, password: string) {
  try {
    const res = await axiosInstance.post('/api/auth/local', {
      identifier: email,
      password,
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.error?.message || error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }

    throw new Error('Unexpected error occurred');
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
  formData.append('files', file);

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

  const fileRes = await nextAxios.get(`/api/upload/files/${uploadedFile.id}`);
  const fileData = fileRes.data;

  if (!fileData.url) {
    throw new Error('Failed to retrieve file URL');
  }

  const fullUrl = fileData.url;

  return { fullUrl, id: uploadedFile.id };
}
