
export const dataset = (chart) => {
  const data = chart.data;

  const transform = (item) => ({
    x: chart.axisBottom.x(item),
    y: chart.axisRight.y(item),
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
};
