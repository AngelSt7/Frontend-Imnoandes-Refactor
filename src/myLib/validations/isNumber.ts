export function isNumber(value: any): boolean {
  if (value === null || value === undefined) return false;

  const num = Number(value);

  // Verifica que sea número, no NaN, mayor que 0, y finito
  return !isNaN(num) && isFinite(num) && num > 0;
}
