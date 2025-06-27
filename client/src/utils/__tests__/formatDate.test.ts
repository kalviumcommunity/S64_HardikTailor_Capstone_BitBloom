import { formatDate } from '../formatDate';

describe('formatDate()', () => {
  test('formats 2024-12-01 as Dec 1, 2024', () => {
    expect(formatDate('2024-12-01')).toBe('1 Dec 2024');
  });

  test('formats 2020-01-15 as Jan 15, 2020', () => {
    expect(formatDate('2020-01-15')).toBe('15 Jan 2020');
  });

 it('handles invalid date gracefully', () => {
  expect(formatDate('invalid-date')).toBe('Invalid date');
  expect(formatDate('')).toBe('Invalid date');
});

});
