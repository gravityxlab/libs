export const timeUnitMsMap = new Map([
  [/^(\d+)d$/, (match) => parseInt(match[1], 10) * 24 * 60 * 60 * 1000],
  [/^(\d+)h$/, (match) => parseInt(match[1], 10) * 60 * 60 * 1000],
  [/^(\d+)m$/, (match) => parseInt(match[1], 10) * 60 * 1000],
  [/^(\d+)s$/, (match) => parseInt(match[1], 10) * 1000],
]);

export function ms(input) {
  for (const [regex, calc] of timeUnitMsMap) {
    const match = regex.exec(input);
    if (match) {
      return calc(match);
    }
  }

  throw new Error('No match any time format.');
}

export function getTimeSlot(date, interval = ms('15m')) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const totalMilliseconds = 
    (hours * 60 * 60 * 1000) +
    (minutes * 60 * 1000) +
    (seconds * 1000) +
    milliseconds;

  const slot = Math.floor(totalMilliseconds / interval);

  const startOfSlotMilliseconds = slot * interval;
  const endOfSlotMilliseconds = (slot + 1) * interval;

  const startTimestamp = date.setHours(0, 0, 0, 0) + startOfSlotMilliseconds;
  const endTimestamp = date.setHours(0, 0, 0, 0) + endOfSlotMilliseconds;

  return {
      start: startTimestamp,
      end: endTimestamp
  };
}
