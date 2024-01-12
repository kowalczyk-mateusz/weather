export const WeatherSkeleton = () => {
  return (
    <div data-testid='weather-skeleton'>
      <h1 className='mt-10 animate-pulse text-center text-5xl font-bold text-white'>
        Loading...
      </h1>
      <div className='mt-5 flex animate-pulse items-center justify-center gap-2 text-white'>
        <div className='flex h-[100px] w-[100px] items-center justify-center'>
          <div className='h-12 w-12 rounded-full bg-gray-300' />
        </div>
        <div className='text-6xl font-bold'>--°C</div>
      </div>
      <div className='mt-4 flex animate-pulse items-center justify-center gap-4 text-white'>
        <div className='h-6 w-6 rounded-full bg-gray-300' />
        <p className='text-lg'>Sunrise at --:-- AM</p>
      </div>
      <div className='mt-2 flex animate-pulse items-center justify-center gap-4  text-white'>
        <div className='h-6 w-6 rounded-full bg-gray-300' />
        <p className='text-lg'>Sunset at --:-- PM</p>
      </div>
    </div>
  );
};
