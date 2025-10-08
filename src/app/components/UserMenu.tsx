'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function UserMenu({ name }: { name: string }) {
  //const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    router.refresh(); // оновити сторінку
  };

  return (
    <div className='flex gap-4 items-center'>
      <div
        onClick={() => router.push('/profile')}
        className='cursor-pointer text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center bg-gray-100'
      >
        <Image src='/images/avatar.png' alt='user' width={40} height={40} />
      </div>
      <p>{name}</p>
    </div>
  );
}
