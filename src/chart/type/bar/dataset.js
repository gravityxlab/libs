import { getTimeSlotTimestamp } from '../../../time';

export const dataset = (chart, key, transform) => {
  const data = chart.data;

  const transformData = (item) => {
    const {
      xAxis: xAxisSettings,
      xAxis: { interval, tickIntervalCount }
    } = chart.settings;
    const value = item[key];
    const { start, end } = getTimeSlotTimestamp(value.time || item[xAxisSettings.key], interval / tickIntervalCount);
    
    const x = transform.x(start);
    const h = transform.y(value);
    const dx = transform.x(end) - x;
    const dy = chart.innerHeight - h

    return [
      x,
      h,
      dx,
      dy,
    ]
  };

  return {
    get start() {
      return transformData(data[0]);
    },
    get end() {
      return transformData(data[data.length - 1]);
    },
    [Symbol.iterator]() {
      let i = 0;

      return {
        next() {
          const item = data[i++];
          if (!item) return { done: true, value: null };
          return { 
            done: false,
            value: transformData(item)
          };
        }
      };
    }
  };
};
