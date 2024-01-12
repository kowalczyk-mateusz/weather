import { getDayOfWeek } from '../get-day-of-the-week';
import '@testing-library/jest-dom';

describe('getDayOfWeek', () => {
  it('should return the correct day of the week for a given date', () => {
    const date = new Date('2024-01-01');
    expect(getDayOfWeek(date)).toBe('Monday');
  });

  it('should return the correct day of the week for another date', () => {
    const date = new Date('2024-01-12');
    expect(getDayOfWeek(date)).toBe('Friday');
  });
});
