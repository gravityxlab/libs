import { getTimeSlot, getTimeSlotTimestamp } from '../../../time';

export class OhlcStash {
  constructor(chart, { onChange = () => {}}) {
    this.chart = chart;

    this.onChange = onChange;
    this._data = new Map();
  }

  get tickIntervalUnit() {
    return this.chart.axisBottom.tickInterval / this.chart.axisBottom.tickIntervalCount;
  }

  get unit() {
    return {
      x: this.chart.axisBottom.unit,
      y: this.chart.axisRight.unit,
    };
  }

  get data() {
    return [...this._data.values()];
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
    const unitX = this.unit.x;
    const unitY = this.unit.y;
    
    const { timestamp, start, end } = getTimeSlotTimestamp(item[unitX], this.tickIntervalUnit);
    let ohlc = this._data.get(timestamp);

    if (!ohlc) {
      const open = this.latest ? this.latest.close : item[unitY];
      ohlc = {
        t: timestamp,
        start,
        end,
        open,
        close: open,
        low: open,
        high: open,
      };
    } else {
      if (item[unitY] < ohlc.low) {
        ohlc.low = item[unitY];
      } else if (item[unitY] > ohlc.high) {
        ohlc.high = item[unitY];
      }

      ohlc.close = item[unitY];
    }

    this._data.set(timestamp, ohlc);
  }

  get oldest() {
    return this.data[0];
  }

  get latest() {
    return this.data[this.data.length - 1];
  }

  get helpers() {
    return {
      lowHigh(data) {
        return data.reduce((acc, item) => {
          if (acc[0] === undefined || item.low < acc[0]) {
            acc[0] = item.low;
          }
      
          if (acc[1] === undefined || item.high > acc[1]) {
            acc[1] = item.high;
          }
          return acc;
        }, []);
      },
    }
  }
}

