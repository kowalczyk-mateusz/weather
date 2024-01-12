import { WeatherForecastTableSkeleton } from '@/components/weather-forecast-table/skeleton';
import { WeatherForecastByDay } from '@/utils/grouped-temperatures-by-day';

interface Props {
  data: WeatherForecastByDay[] | undefined;
  isLoading: boolean;
}

const columns = [
  {
    title: 'Day',
    id: 1,
  },
  {
    title: 'Average Temp',
    id: 2,
  },
  {
    title: 'Min Temp',
    id: 3,
  },
  {
    title: 'Max temp',
    id: 4,
  },
];

export const WeatherForecastTable = ({ data, isLoading }: Props) => {
  if (isLoading) return <WeatherForecastTableSkeleton />;

  return (
    <>
      <p className='mt-6 text-center text-3xl font-bold text-white'>
        Next 5 Days Forecast
      </p>
      <div className='flex justify-center overflow-y-scroll'>
        <div className='mt-2 w-full max-w-md'>
          <table className='w-full overflow-hidden rounded-lg bg-white text-center text-black'>
            <thead className='bg-blue-500 text-white'>
              <tr>
                {columns.map(({ id, title }) => (
                  <th key={id} className='p-2'>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map(({ avgTemp, dayName, maxTemp, minTemp }, index) => (
                <tr key={dayName + index}>
                  <td className='p-2 '>{dayName}</td>
                  <td className='p-2'>{avgTemp}°C</td>
                  <td className='p-2'>{minTemp}°C</td>
                  <td className='p-2'>{maxTemp}°C</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
