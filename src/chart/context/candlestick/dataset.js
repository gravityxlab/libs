export const dataset = (chart) => {
  const data = chart.data;

  const transform = (item) => {
    const x0 = chart.axisBottom.x(item.start);
    const y0 = chart.axisRight.y(item.open);
    const w = chart.axisBottom.x(item.end) - x0;
    const h = chart.axisRight.y(item.close) - y0;

    const x = chart.axisBottom.x(item.t);

    return {
      rect: [
        x0,
        y0,
        w,
        h,
      ],
      line: {
        p0: [x, chart.axisRight.y(item.low)],
        p1: [x, chart.axisRight.y(item.high)],
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
