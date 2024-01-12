import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { WeatherIconText } from '.';

describe('WeatherIconText', () => {
  const iconSrc = '/next.svg';
  const iconAlt = 'Weather Icon';
  const text = 'Sunny';
  it('renders component correctly', () => {
    render(<WeatherIconText iconSrc={iconSrc} iconAlt={iconAlt} text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('renders alt correctly', () => {
    render(<WeatherIconText iconSrc={iconSrc} iconAlt={iconAlt} text={text} />);

    expect(screen.getByAltText(iconAlt)).toBeInTheDocument();
  });

  it('renders image correctly', () => {
    render(<WeatherIconText iconSrc={iconSrc} iconAlt={iconAlt} text={text} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
