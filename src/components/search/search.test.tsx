import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Search } from '.';

describe('Search', () => {
  const onSubmit = jest.fn();
  const setQuery = jest.fn();
  const requestCurrentLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input correctly', () => {
    render(
      <Search
        isLoading={false}
        query=''
        setQuery={setQuery}
        onSubmit={onSubmit}
        requestCurrentLocation={requestCurrentLocation}
      />
    );
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });

  test('should call setQuery function when input value changes', async () => {
    render(
      <Search
        isLoading={false}
        query=''
        setQuery={setQuery}
        onSubmit={onSubmit}
        requestCurrentLocation={requestCurrentLocation}
      />
    );
    const inputElement = screen.getByRole('textbox');

    await userEvent.type(inputElement, 'New York');

    expect(setQuery).toHaveBeenCalled();
  });

  test('should call onSubmit function when form is submitted', async () => {
    render(
      <Search
        isLoading={false}
        query='test'
        setQuery={setQuery}
        onSubmit={onSubmit}
        requestCurrentLocation={requestCurrentLocation}
      />
    );
    const confirmButton = screen.getByRole('button', { name: 'Add' });
    await userEvent.click(confirmButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('should display error message when query length is less than 2', () => {
    render(
      <Search
        isLoading={false}
        query='N'
        setQuery={setQuery}
        onSubmit={onSubmit}
        requestCurrentLocation={requestCurrentLocation}
      />
    );
    const errorMessage = screen.getByText(
      'City name must contain at least 2 characters'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test('should call requestCurrentLocation function when button is clicked', async () => {
    render(
      <Search
        isLoading={false}
        query=''
        setQuery={setQuery}
        onSubmit={onSubmit}
        requestCurrentLocation={requestCurrentLocation}
      />
    );
    const buttonElement = screen.getByText('Request current location');
    await userEvent.click(buttonElement);
    expect(requestCurrentLocation).toHaveBeenCalled();
  });

  test('should disable button and show loading text when isLoading is true', () => {
    render(
      <Search
        isLoading={true}
        query=''
        setQuery={setQuery}
        onSubmit={onSubmit}
        requestCurrentLocation={requestCurrentLocation}
      />
    );
    const buttonElement = screen.getByText('Loading...');
    expect(buttonElement).toBeDisabled();
  });
});
