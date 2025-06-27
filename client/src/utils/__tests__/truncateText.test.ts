import { truncateText } from '../truncateText';

describe('truncateText', () => {
  it('returns the original string if it is shorter than maxLength', () => {
    const input = 'Hello';
    const result = truncateText(input, 10);
    expect(result).toBe('Hello');
  });

  it('returns a truncated string with ellipsis if longer than maxLength', () => {
    const input = 'This is a long sentence';
    const result = truncateText(input, 10);
    expect(result).toBe('This is a ...');
  });

  it('returns empty string if input is empty', () => {
    const result = truncateText('', 5);
    expect(result).toBe('');
  });

  it('returns only ellipsis if maxLength is 0', () => {
    const result = truncateText('Hello', 0);
    expect(result).toBe('...');
  });
});
