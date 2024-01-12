import Image from 'next/image';
import Link from 'next/link';

interface Props {
  href: string;
}

export const Back = ({ href }: Props) => {
  return (
    <Link href={href}>
      <div className='mt-10 flex items-center justify-center gap-2 text-white'>
        <Image src='/icons/back.svg' width={30} height={30} alt='back icon' />
        <p className='text-center'>Back</p>
      </div>
    </Link>
  );
};
