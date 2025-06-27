import { truncateText } from '../truncateText';

describe('truncateText', () => {
  it('returns the original string if it is shorter than maxLength', () => {
    expect(truncateText('Hello', 10)).toBe('Hello');
    expect(truncateText('Short text', 20)).toBe('Short text');
  });

  it('truncates and adds ellipsis if longer than maxLength', () => {
    expect(truncateText('This is a long sentence', 10)).toBe('This is a ...');
    expect(truncateText('BitBloom is great', 7)).toBe('BitBloo...');
  });

  it('returns empty string if input is empty', () => {
    expect(truncateText('', 5)).toBe('');
  });

  it('returns empty string if maxLength is 0 or negative', () => {
    expect(truncateText('Hello', 0)).toBe('');
    expect(truncateText('Hello', -3)).toBe('');
  });
});
