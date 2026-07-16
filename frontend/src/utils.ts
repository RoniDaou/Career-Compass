/** Shared display helpers for academic status fields. */
export const GRADUATE_YEAR_VALUE = 13

export const academicYearOptions = [
  ...Array.from({ length: 12 }, (_, index) => ({ value: index + 1, label: `Year ${index + 1}` })),
  { value: GRADUATE_YEAR_VALUE, label: 'Graduate' },
]

export function academicYearLabel(value?: number) {
  if (value === GRADUATE_YEAR_VALUE) return 'Graduate'
  return value ? `Year ${value}` : 'Year not specified'
}
