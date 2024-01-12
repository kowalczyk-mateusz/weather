export const WeatherForecastTableSkeleton = () => {
  return (
    <>
      <p className='mt-6 text-center text-3xl font-bold text-white'>
        Next 5 Days Forecast
      </p>
      <div className='flex justify-center'>
        <div className='mt-2 w-full max-w-md animate-pulse'>
          <table className='w-full overflow-hidden rounded-lg bg-gray-300 text-center text-gray-400'>
            <thead>
              <tr>
                <th className='p-2'>Day</th>
                <th className='p-2'>Average Temp</th>
                <th className='p-2'>Min Temp</th>
                <th className='p-2'>Max Temp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-2'>--</td>
                <td className='p-2'>--°C</td>
                <td className='p-2'>--°C</td>
                <td className='p-2'>--°C</td>
              </tr>
              <tr>
                <td className='p-2'>--</td>
                <td className='p-2'>--°C</td>
                <td className='p-2'>--°C</td>
                <td className='p-2'>--°C</td>
              </tr>
              <tr>
                <td className='p-2'>--</td>
                <td className='p-2'>--°C</td>
                <td className='p-2'>--°C</td>
                <td className='p-2'>--°C</td>
              </tr>
              <tr>
                <td className='p-2'>--</td>
                <td className='p-2'>--°C</td>
                <td className='p-2'>--°C</td>
                <td className='p-2'>--°C</td>
              </tr>
              <tr>
                <td className='p-2'>--</td>
                <td className='p-2'>--°C</td>
                <td className='p-2'>--°C</td>
                <td className='p-2'>--°C</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
