export const dataset = (chart) => {
  const data = chart.data;

  const transform = (value) => {
    const x0 = chart.axisBottom.x(value.start);
    const y0 = chart.axisRight.y(value.open);
    const w = chart.axisBottom.x(value.end) - x0;
    const h = chart.axisRight.y(value.close) - y0;

    const x = chart.axisBottom.x(value.t);

    return {
      rect: [
        x0,
        y0,
        w,
        h,
      ],
      line: {
        p0: [x, chart.axisRight.y(value.low)],
        p1: [x, chart.axisRight.y(value.high)],
      },
      color: h > 0 ? '#F6465D' : '#2DBC85',
    }
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
