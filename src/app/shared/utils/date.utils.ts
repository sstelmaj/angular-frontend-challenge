export function getTodayIsoDate(referenceDate = new Date()): string {
  return formatDatePartsToIso(
    referenceDate.getFullYear(),
    referenceDate.getMonth() + 1,
    referenceDate.getDate()
  );
}

export function addYearsToIsoDate(isoDate: string, years = 1): string {
  const parsedDate = parseIsoDate(isoDate);

  if (!parsedDate) {
    return '';
  }

  const shiftedDate = new Date(
    Date.UTC(parsedDate.year + years, parsedDate.month - 1, parsedDate.day)
  );

  return formatDatePartsToIso(
    shiftedDate.getUTCFullYear(),
    shiftedDate.getUTCMonth() + 1,
    shiftedDate.getUTCDate()
  );
}

export function isIsoDateOnOrAfter(isoDate: string, minimumIsoDate: string): boolean {
  return isoDate >= minimumIsoDate;
}

function parseIsoDate(isoDate: string): { year: number; month: number; day: number } | null {
  const match = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/.exec(isoDate);

  if (!match?.groups) {
    return null;
  }

  return {
    year: Number(match.groups['year']),
    month: Number(match.groups['month']),
    day: Number(match.groups['day'])
  };
}

function formatDatePartsToIso(year: number, month: number, day: number): string {
  return `${year}-${padToTwoDigits(month)}-${padToTwoDigits(day)}`;
}

function padToTwoDigits(value: number): string {
  return value.toString().padStart(2, '0');
}
