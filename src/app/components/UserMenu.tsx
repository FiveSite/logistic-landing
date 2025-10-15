'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ArrowIcon from '../../../public/icons/chevron-down.svg';
import LogoutIcon from '../../../public/icons/logout-icon.svg';
import { Popover } from '@mui/material';
import { useState } from 'react';
import { nextAxios } from '@/utils/axios-next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UserMenu({ user }: { user: any }) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  {
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const router = useRouter();

  const handleLogout = async () => {
    await nextAxios.post('/api/auth/logout');

    router.push('/');
    router.refresh();
  };

  return (
    <div className='flex gap-3 items-center'>
      <div
        onClick={() => router.push('/profile')}
        className='cursor-pointer text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center bg-gray-100'
      >
        {user.companyLogo && user.companyLogo.url ? (
          <Image
            src={user.companyLogo.url}
            alt='user'
            width={40}
            height={40}
            className='rounded-full shrink-0 object-cover w-full h-full'
          />
        ) : (
          <Image src='/images/avatar.png' alt='user' width={40} height={40} />
        )}
      </div>
      <div aria-describedby={id} className='flex items-center gap-1 cursor-pointer' onClick={handleClick}>
        {user.contactName}
        <div className='flex items-center justify-center w-5 h-5'>
          <ArrowIcon className='' />
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            borderRadius: '12px',
          },
        }}
      >
        <div className=' flex flex-col '>
          <div onClick={() => router.push('/profile')} className='cursor-pointer py-2 px-4 hover:bg-gray-100'>
            Profile
          </div>
          <div
            className='cursor-pointer py-2 px-4 hover:bg-gray-100 flex items-center gap-2 text-[#D21717]'
            onClick={handleLogout}
          >
            Logout
            <div className='flex items-center justify-center w-5 h-5'>
              <LogoutIcon className='' />
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
