import Image from 'next/image';
import Link from 'next/link';

export const CityNotFound = () => {
  return (
    <div className='mt-32 flex flex-col items-center justify-center text-white'>
      <Image src='/icons/sad.svg' width={150} height={150} alt='sad icon' />
      <h1 className='mb-4 text-center text-4xl font-bold'>City Not Found</h1>
      <p className='mb-8 text-center text-2xl'>
        Sorry, we couldn&apos;t find the city you were looking for.
      </p>
      <Link className='underline' href='/'>
        Go back to the home page
      </Link>
    </div>
  );
};
