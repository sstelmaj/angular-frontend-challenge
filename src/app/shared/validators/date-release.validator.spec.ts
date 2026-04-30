import { FormControl } from '@angular/forms';

import { dateReleaseValidator } from './date-release.validator';

describe('dateReleaseValidator', () => {
  it('should mark date_release as invalid when it is before today', () => {
    const control = new FormControl('2026-04-29');
    const validator = dateReleaseValidator(() => '2026-04-30');

    expect(validator(control)).toEqual({ dateReleaseInPast: true });
  });

  it('should mark date_release as valid when it is today or later', () => {
    const validator = dateReleaseValidator(() => '2026-04-30');

    expect(validator(new FormControl('2026-04-30'))).toBeNull();
    expect(validator(new FormControl('2026-05-01'))).toBeNull();
  });
});
