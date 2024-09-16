export class ArrayStash {
  constructor(chart, { onChange = () => {}}) {
    this.chart = chart;
    this.onChange = onChange;
    this._data = new Map();
  }

  get key() {
    return {
      x: this.chart.axisBottom.key,
      y: this.chart.axisRight.key,
    };
  }

  get data() {
    return [...this._data.values()];
  }

  add(data) {
    data = Array.isArray(data) ? data : [data];

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      item._time = new Date(item[this.key.x])
      this._data.set(item[this.key.x], item);
    }

    this.onChange(this.data);
  }

  get oldest() {
    return this.data[0];
  }

  get latest() {
    return this.data[this.data.length - 1];
  }

  get helpers() {
    const keyY = this.key.y;
    return {
      lowHigh(data) {
        return data.reduce((acc, item) => {
          if (acc[0] === undefined || item[keyY] < acc[0]) {
            acc[0] = item[keyY];
          }
      
          if (acc[1] === undefined || item[keyY] > acc[1]) {
            acc[1] = item[keyY];
          }
          return acc;
        }, []);
      },
    }
  }
}
