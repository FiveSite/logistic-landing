const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signIn(email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier: email, password: password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

export async function getUserFromToken(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store', // важливо, щоб не кешувалось
    });

    if (!res.ok) return null;

    const user = await res.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
