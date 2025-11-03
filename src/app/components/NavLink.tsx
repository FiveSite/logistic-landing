'use client';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export const NavLink = ({
  href,
  text,
  onClick,
  isFooter = false,
}: {
  href: string;
  text: string;
  onClick?: () => void;
  isFooter?: boolean;
}) => {
  const pathname = usePathname();

  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(
        'px-2 py-3 text-[16px] font-medium transition-colors',
        isFooter ? 'text-white hover:text-orange-400' : 'hover:border-b-1 hover:border-orange-600',
        !isFooter && pathname === href && 'border-b-1 border-orange-600'
      )}
    >
      {text}
    </Link>
  );
};
