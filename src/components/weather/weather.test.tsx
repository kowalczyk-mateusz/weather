import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Weather as WeatherType } from '@/types/responses/weather';

import { Weather } from '.';

const mockData = {
  name: 'City',
  sys: {
    sunrise: 1629878400,
    sunset: 1629921600,
  },
  weather: [
    {
      icon: '01d',
      description: 'Clear sky',
    },
  ],
  main: {
    temp: 25.0,
  },
} as WeatherType;
//as WeatherType is used here to not mock all of the data

let clipboardData = '';
const mockClipboard = {
  writeText: jest.fn((data) => {
    clipboardData = data;
  }),
  readText: jest.fn(() => {
    return clipboardData;
  }),
};

Object.defineProperty(global.navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
});

describe('Weather', () => {
  test('should render city name', () => {
    render(<Weather isLoading={false} data={mockData} />);

    const cityNameElement = screen.getByText(mockData.name);
    expect(cityNameElement).toBeInTheDocument();
  });

  test('should render correct weather icon', () => {
    render(<Weather isLoading={false} data={mockData} />);

    const weatherIconElement = screen.getByAltText(
      `${mockData.weather[0].description} icon`
    );
    expect(weatherIconElement).toBeInTheDocument();
  });

  test('should render temperature correctly', () => {
    render(<Weather isLoading={false} data={mockData} />);

    const temperatureElement = screen.getByText(
      `${mockData.main.temp.toFixed(1)}°C`
    );
    expect(temperatureElement).toBeInTheDocument();
  });

  test('should render sunrise timestamp correctly', () => {
    render(<Weather isLoading={false} data={mockData} />);

    const sunriseElement = screen.getByText('Sunrise at 10:00');
    expect(sunriseElement).toBeInTheDocument();
  });

  test('should render sunset timestamp correctly', () => {
    render(<Weather isLoading={false} data={mockData} />);

    const sunsetElement = screen.getByText('Sunset at 22:00');
    expect(sunsetElement).toBeInTheDocument();
  });

  test('should render loading skeleton', () => {
    render(<Weather isLoading={true} data={undefined} />);

    const skeletonElement = screen.getByTestId('weather-skeleton');
    expect(skeletonElement).toBeInTheDocument();
  });

  test('should copy url to clipboard', async () => {
    render(<Weather isLoading={false} data={mockData} />);
    const copyIcon = screen.getByAltText('copy icon');
    await userEvent.click(copyIcon);
    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe('http://localhost/');
  });
});
