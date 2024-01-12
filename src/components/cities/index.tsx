import Image from 'next/image';
import Link from 'next/link';

interface Props {
  cities: string[];
  removeCityFromLocalStorage: (city: string) => void;
}

export const Cities = ({ cities, removeCityFromLocalStorage }: Props) => {
  return (
    <ul className='mt-4 flex flex-col gap-2'>
      {cities.map((city) => (
        <li
          key={city}
          className='flex h-14 w-full items-center justify-between gap-2  rounded-md bg-white px-4 text-black shadow-md'
        >
          <Link href={city.toLocaleLowerCase()} className='break-all'>
            {city}
          </Link>
          <Image
            src='/icons/delete.svg'
            width={30}
            height={30}
            alt='delete icon'
            className='cursor-pointer'
            onClick={() => removeCityFromLocalStorage(city)}
          />
        </li>
      ))}
    </ul>
  );
};
