import { isToday } from '../is-today';

describe('isToday', () => {
  it('should return true when the given date is today', () => {
    const today = new Date();
    expect(isToday(today)).toBe(true);
  });

  it('should return false when the given date is not today', () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    expect(isToday(today)).toBe(false);
  });
});
