import { axiosInstance } from '@/utils/axios';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'No auth token' }, { status: 401 });
    }

    const body = await request.json();

    const response = await axiosInstance.post('/api/auth/change-password', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.error?.message || error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }

    throw new Error('Unexpected error occurred');
  }
}
