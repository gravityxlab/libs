import { getTimeSlot, getTimeSlotTimestamp } from '../../time';

export class OhlcStash {
  constructor(chart, { onChange = () => {}}) {
    this.chart = chart;

    this.onChange = onChange;
    this._data = new Map();
  }

  get tickIntervalUnit() {
    return this.chart.axisBottom.tickInterval / this.chart.axisBottom.tickIntervalCount;
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
      this.format(data[index]);
    }

    this.onChange(this.data);
  }

  format(item) {
    const keyX = this.key.x;
    const keyY = this.key.y;
    
    const { timestamp, start, end } = getTimeSlotTimestamp(item[keyX], this.tickIntervalUnit);
    let ohlc = this._data.get(timestamp);

    if (!ohlc) {
      const open = this.latest ? this.latest.close : item[keyY];
      ohlc = {
        _time: timestamp,
        start,
        end,
        open,
        close: open,
        low: open,
        high: open,
      };
    } else {
      if (item[keyY] < ohlc.low) {
        ohlc.low = item[keyY];
      } else if (item[keyY] > ohlc.high) {
        ohlc.high = item[keyY];
      }

      ohlc.close = item[keyY];
    }

    this._data.set(ohlc._time, ohlc);
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

