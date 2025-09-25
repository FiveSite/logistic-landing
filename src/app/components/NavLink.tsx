'use client';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export const NavLink = ({ href, text }: { href: string; text: string }) => {
  const pathname = usePathname();

  return (
    <Link
      href={`${href}`}
      className={clsx(
        'px-2 py-3 text-[16px] font-medium hover:border-b-1 hover:border-orange-600',
        pathname === href && 'border-b-1 border-orange-600'
      )}
    >
      {text}
    </Link>
  );
};
