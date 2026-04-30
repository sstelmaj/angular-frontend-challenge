import { FormControl, FormGroup } from '@angular/forms';

import { dateRevisionValidator } from './date-revision.validator';

describe('dateRevisionValidator', () => {
  it('should be valid only when date_revision is exactly one year after date_release', () => {
    const validator = dateRevisionValidator('date_release', 'date_revision');

    const validGroup = new FormGroup({
      date_release: new FormControl('2026-04-30'),
      date_revision: new FormControl('2027-04-30')
    });

    const invalidGroup = new FormGroup({
      date_release: new FormControl('2026-04-30'),
      date_revision: new FormControl('2027-05-01')
    });

    expect(validator(validGroup)).toBeNull();
    expect(validator(invalidGroup)).toEqual({ dateRevisionMismatch: true });
  });
});
