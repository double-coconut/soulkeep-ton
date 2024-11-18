export const toHoursMinutesAndSeconds = (
  seconds: number
): { h: string; m: string; s: string } => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return { h: appendZero(h), m: appendZero(m), s: appendZero(s) };
};

const appendZero = (num: number): string =>
  num >= 10 ? num.toString() : '0' + num;

