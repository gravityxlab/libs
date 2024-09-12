import { getTimeSlotTimestamp } from '../../../time';

export const dataset = (chart) => {
  const data = chart.data;

  const transform = (item) => {
    const {
      xAxis: xAxisSettings,
      yAxis: yAxisSettings,
      xAxis: { interval, tickIntervalCount }
    } = chart.settings;
    const value = item[yAxisSettings.unit];
    const { start, end } = getTimeSlotTimestamp(value.time || item[xAxisSettings.unit], interval / tickIntervalCount);
    
    const x = chart.axisBottom.x(start);
    const h = chart.axisRight.y(value);
    const dx = chart.axisBottom.x(end) - x;
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
      return transform(data[0]);
    },
    get end() {
      return transform(data[data.length - 1]);
    },
    [Symbol.iterator]() {
      let i = 0;

      return {
        next() {
          const item = data[i++];
          if (!item) return { done: true, value: null };
          return { 
            done: false,
            value: transform(item)
          };
        }
      };
    }
  };
};
