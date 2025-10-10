import { axiosInstance } from '@/utils/axios';
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
  } catch (error: any) {
    console.log('Error changing password:', error);
    return NextResponse.json(
      { 
        message: error.response?.data?.message || 'Failed to change password',
        error: error.response?.data?.error || 'Internal server error'
      }, 
      { status: error.response?.status || 500 }
    );
  }
}
