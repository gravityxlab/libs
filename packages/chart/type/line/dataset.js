
export const dataset = (chart, key, transform) => {
  const {
    axisBottom: axisBottomSettings,
  } = chart.settings;
  const maxTickUnit = (axisBottomSettings.interval / axisBottomSettings.tickIntervalCount) * 1.2;
  const data = chart.data;

  const transformData = (item) => ({
    x: transform.x(item.time || item[axisBottomSettings.key]),
    y: transform.y(item[key]),
  });

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
            value: {
              current: transformData(item),
              next: () => {
                const nextPoint = data[i];
                if (!nextPoint) return null;
                if (nextPoint._time - item._time >= maxTickUnit) {
                  return;
                }
                return transformData(nextPoint);
              } 
            }
          };
        }
      };
    }
  };
};
