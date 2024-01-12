import clsx from 'clsx';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

interface Props {
  isLoading: boolean;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  requestCurrentLocation: () => void;
}

export const Search = ({
  isLoading,
  query,
  setQuery,
  onSubmit,
  requestCurrentLocation,
}: Props) => {
  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className='flex w-full gap-2'>
        <input
          className='w-full rounded-md border border-solid border-gray-200 px-4 invalid:border-red-500 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 focus:invalid:ring-red-500'
          placeholder='Add city'
          value={query}
          type='text'
          minLength={2}
          onChange={handleChangeQuery}
        />

        <button
          className='rounded-md bg-black px-4 py-2 font-medium text-white'
          onClick={onSubmit}
        >
          Add
        </button>
      </div>
      {query && query.length < 2 ? (
        <span className='text-xs text-red-500'>
          City name must contain at least 2 characters
        </span>
      ) : null}

      <button
        className={clsx(
          'mt-2 w-full rounded-md border border-solid border-gray-200 bg-white px-4 py-2 font-medium text-black',
          isLoading ? 'cursor-not-allowed opacity-50  ' : ''
        )}
        onClick={requestCurrentLocation}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Request current location'}
      </button>
    </form>
  );
};
