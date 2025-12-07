import formatDate from '../utils/date';

describe('formatDate util', () => {
  test('formatDate returns empty string for falsy', () => {
    expect(formatDate(null)).toBe('');
  });

  test('formatDate returns a string for timestamp', () => {
    const ts = 1690000000000;
    const out = formatDate(ts);
    expect(typeof out).toBe('string');
    expect(out.length).toBeGreaterThan(0);
  });
});
