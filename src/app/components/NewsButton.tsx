'use client';
import Link from 'next/link';
import Image from 'next/image';
import Popover from '@mui/material/Popover';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const NewsButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const pathname = usePathname();

  return (
    <div>
      <button
        aria-describedby={id}
        onClick={handleClick}
        className={clsx(
          'cursor-pointer px-2 py-3 text-[16px] font-medium flex gap-2',
          (pathname.startsWith('/news') || pathname.startsWith('/events')) && 'border-b-1 border-orange-600'
        )}
      >
        What’s new
        <Image src='/icons/chevron-down.svg' alt='arrow-down' width={24} height={24} />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className='w-[132px] h-[88px] flex flex-col justify-center gap-2'>
          <Link href='/news' onClick={handleClose} className='cursor-pointer py-2 px-3 hover:bg-gray-100'>
            News
          </Link>
          <Link href='/events' onClick={handleClose} className='cursor-pointer py-2 px-3 hover:bg-gray-100'>
            Events
          </Link>
        </div>
      </Popover>
    </div>
  );
};
