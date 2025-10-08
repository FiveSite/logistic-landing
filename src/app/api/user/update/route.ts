import { axiosInstance } from '@/utils/axios';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'No auth token' }, { status: 401 });
    }

    const body = await request.json();
    const { id, data } = body || {};

    if (!id || !data) {
      return NextResponse.json({ message: 'Missing id or data' }, { status: 400 });
    }

    const strapiRes = await axiosInstance.put(`/api/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(strapiRes.data, { status: 200 });
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
