import { axiosInstance } from '@/utils/axios';
import axios from 'axios';
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
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // err - це AxiosError
      console.error('Axios error:', err.response?.data || err.message);
    } else {
      // якась інша помилка
      console.error('Unknown error:', err);
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
