import { CHART_TYPE } from './constants';

const dataset = {
  [CHART_TYPE.LINE]: (chart) => {
    const data = chart.data;

    const transform = (value) => ({
      x: chart.axisBottom.x(value),
      y: chart.axisRight.y(value),
    });

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
              value: {
                current: transform(item),
                next: () => {
                  const nextPoint = data[i];
                  return transform(nextPoint);
                } 
              }
            };
          }
        };
      }
    };
  },
};

export default dataset;