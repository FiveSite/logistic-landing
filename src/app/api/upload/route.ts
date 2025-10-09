import { axiosInstance } from '@/utils/axios';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No JWT cookie' }, { status: 401 });
    }

    const formData = await req.formData(); // FormData з файлом

    const strapiRes = await axiosInstance.post('/api/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = strapiRes.data;

    return NextResponse.json(data);
  } catch (err) {
    console.error('Unexpected error during upload:', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}

