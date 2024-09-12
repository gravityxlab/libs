export class ArrayStash {
  constructor(chart, { onChange = () => {}}) {
    this.chart = chart;
    this.onChange = onChange;
    this.data = [];
  }

  get unit() {
    return {
      x: this.chart.axisBottom.unit,
      y: this.chart.axisRight.unit,
    };
  }

  set(data) {
    for (let index = 0; index < data.length; index++) {
      this._add(data[index]);
    }

    this.onChange(this.data);
  }

  add(item) {
    this._add(item);
    this.onChange(this.data);
  }

  _add(item) {
    item.time = new Date(item[this.unit.x])
    this.data.push(item);
  }

  get oldest() {
    return this.data[0];
  }

  get latest() {
    return this.data[this.data.length - 1];
  }

  get helpers() {
    const unitY = this.unit.y;
    return {
      lowHigh(data) {
        return data.reduce((acc, item) => {
          if (acc[0] === undefined || item[unitY] < acc[0]) {
            acc[0] = item[unitY];
          }
      
          if (acc[1] === undefined || item[unitY] > acc[1]) {
            acc[1] = item[unitY];
          }
          return acc;
        }, []);
      },
    }
  }
}
