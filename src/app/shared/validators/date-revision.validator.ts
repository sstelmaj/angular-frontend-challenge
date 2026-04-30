import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { addYearsToIsoDate } from '../utils/date.utils';

export function dateRevisionValidator(
  dateReleaseControlName: string,
  dateRevisionControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateRelease = control.get(dateReleaseControlName)?.value as string | null;
    const dateRevision = control.get(dateRevisionControlName)?.value as string | null;

    if (!dateRelease || !dateRevision) {
      return null;
    }

    return addYearsToIsoDate(dateRelease) === dateRevision
      ? null
      : { dateRevisionMismatch: true };
  };
}
