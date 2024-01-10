import Link from 'next/link';

export default function Home() {
  const cities = ['Katowice', 'Bielsko Biała', 'Warszawa', 'Kraków', 'Gdańsk'];

  return (
    <main className='flex min-h-screen justify-center'>
      <div className='mt-10 w-full max-w-96'>
        <h1 className='mb-10 text-center text-3xl font-bold'>Cities</h1>
        <div className='flex w-full gap-2'>
          <input
            className='w-full rounded-md border border-solid border-gray-200 px-4'
            placeholder='Add city'
          ></input>
          <button className='rounded-md bg-black px-4 py-2 font-medium text-white'>
            Add
          </button>
        </div>
        <button className='mt-2 w-full rounded-md border border-solid border-gray-200 bg-white px-4 py-2 font-medium text-black'>
          Request current location
        </button>
        <ul className='mt-4 flex flex-col gap-2'>
          {cities.map((city) => (
            <li
              key={city}
              className='flex h-14 w-full items-center justify-start rounded-md bg-white  pl-4 text-black shadow-md'
            >
              <Link href={city.toLocaleLowerCase()}>{city}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
