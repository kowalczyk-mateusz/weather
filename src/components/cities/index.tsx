import Image from 'next/image';
import Link from 'next/link';

interface Props {
  cities: string[];
  removeCityFromLocalStorage: (city: string) => void;
}

export const Cities = ({ cities, removeCityFromLocalStorage }: Props) => (
  <div className='mt-4 flex flex-col gap-2'>
    {cities.map((city) => (
      <Link key={city} href={city.toLocaleLowerCase()} passHref>
        <div className='flex h-14 w-full items-center justify-between gap-2  rounded-md bg-white px-4 text-black shadow-md'>
          <span className='break-all'>{city}</span>
          <Image
            src='/icons/delete.svg'
            width={30}
            height={30}
            alt='delete icon'
            className='cursor-pointer transition-all hover:scale-105'
            onClick={(e) => {
              e.preventDefault();
              removeCityFromLocalStorage(city);
            }}
          />
        </div>
      </Link>
    ))}
  </div>
);
