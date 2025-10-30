import ArrowRightIcon from '../../../public/icons/arrow-right.svg';

export function AuthButtons({ onOpenLogin, onOpenMember }: { onOpenLogin: () => void; onOpenMember: () => void }) {
  return (
    <div className='max-lg:hidden w-fit flex justify-between gap-4'>
      <button
        onClick={onOpenMember}
        className='cursor-pointer flex items-center gap-2 px-4.5 py-2 rounded-[100px] text-white bg-orange-600 hover:bg-orange-700 whitespace-nowrap'
      >
        Become a Member
        <div className='flex items-center justify-center w-4 h-4'>
          <ArrowRightIcon className='stroke-white' />
        </div>
      </button>

      <button
        onClick={onOpenLogin}
        className='cursor-pointer px-4.5 py-2 rounded-[100px] text-orange-600 bg-[rgba(255,77,0,0.1)] hover:bg-[rgba(255,77,0,0.2)]  whitespace-nowrap '
      >
        Sign in
      </button>
    </div>
  );
}
