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

export function getTimeSlotTimestamp(date, interval = ms('15m')) {
  const { start, end } = getTimeSlot(date, interval);

  return {
    start,
    end,
    timestamp: start + ((end - start) / 2),
  };
}

export function format(date, pattern) {
  if (pattern.includes('MM')) {
    pattern = pattern.replace(/MM/g, String(date.getMonth() + 1).padStart(2, '0'));
  }

  if (pattern.includes('DD')) {
    pattern = pattern.replace(/DD/g, String(date.getDate()).padStart(2, '0'));
  }

  if (pattern.includes('HH')) {
    pattern = pattern.replace(/HH/g, String(date.getHours()).padStart(2, '0'));
  }

  if (pattern.includes('mm')) {
    pattern = pattern.replace(/mm/g, String(date.getMinutes()).padStart(2, '0'));
  }

  return pattern;
}