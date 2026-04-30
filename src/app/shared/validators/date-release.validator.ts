import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { getTodayIsoDate, isIsoDateOnOrAfter } from '../utils/date.utils';

export function dateReleaseValidator(
  getToday = () => getTodayIsoDate()
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string | null;

    if (!value) {
      return null;
    }

    return isIsoDateOnOrAfter(value, getToday()) ? null : { dateReleaseInPast: true };
  };
}
