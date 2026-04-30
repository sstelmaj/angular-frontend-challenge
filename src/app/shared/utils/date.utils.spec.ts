import { addYearsToIsoDate, getTodayIsoDate, isIsoDateOnOrAfter } from './date.utils';

describe('date utils', () => {
  it('should format today as an ISO date', () => {
    expect(getTodayIsoDate(new Date(2026, 3, 30))).toBe('2026-04-30');
  });

  it('should add years to a valid ISO date', () => {
    expect(addYearsToIsoDate('2026-04-30')).toBe('2027-04-30');
  });

  it('should return an empty string when the ISO date is invalid', () => {
    expect(addYearsToIsoDate('30/04/2026')).toBe('');
  });

  it('should compare ISO dates lexicographically by day', () => {
    expect(isIsoDateOnOrAfter('2026-04-30', '2026-04-30')).toBe(true);
    expect(isIsoDateOnOrAfter('2026-05-01', '2026-04-30')).toBe(true);
    expect(isIsoDateOnOrAfter('2026-04-29', '2026-04-30')).toBe(false);
  });
});
