import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Cities } from './index';

describe('Cities', () => {
  const citiesArray = ['London', 'New York', 'Berlin'];
  const removeFromLocalStorage = jest.fn();

  it('should render component', () => {
    render(
      <Cities
        cities={citiesArray}
        removeCityFromLocalStorage={removeFromLocalStorage}
      />
    );

    expect(screen.getByText(citiesArray[0])).toBeInTheDocument();
  });

  it('should render 3 links with cities', () => {
    render(
      <Cities
        cities={citiesArray}
        removeCityFromLocalStorage={removeFromLocalStorage}
      />
    );

    expect(screen.queryAllByRole('link')).toHaveLength(3);
  });

  it('should call removeCityFromLocalStorage when a city is removed', async () => {
    render(
      <Cities
        cities={citiesArray}
        removeCityFromLocalStorage={removeFromLocalStorage}
      />
    );

    const removeIcon = screen.getAllByAltText('delete icon');
    await userEvent.click(removeIcon[0]);

    expect(removeFromLocalStorage).toHaveBeenCalled();
  });
});
