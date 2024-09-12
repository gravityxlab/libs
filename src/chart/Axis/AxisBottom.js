import { Axis } from './Axis';
import { ms, format, getTimeSlot } from '../../time';
import { text } from '../../canvas';

export class AxisBottom extends Axis {
  constructor(chart) {
    super(chart, chart.settings.xAxis.unit);

    this.left = 0;
    this.height = this.chart.padding.bottom;
    this.top = this.chart.innerHeight;
    this.width = this.chart.width;

    this.benchmark = {
      point: this.chart.innerWidth - 20,
      value: null,
    };

    this.chart.ctx.beginPath();
    this.chart.ctx.strokeStyle = '#2B3139';
    this.chart.ctx.lineWidth = 1;
    this.chart.ctx.moveTo(this.left, this.top);
    this.chart.ctx.lineTo(this.width, this.top);
    this.chart.ctx.stroke();
    this.tickInterval = this.chart.settings.xAxis.interval || ms('15m');
    this.tickIntervalCount = this.chart.settings.xAxis.tickIntervalCount;
    this.tickSizeUnit = 6;
    this.tickCount = Math.ceil(this.chart.innerWidth / (this.tickIntervalCount * this.tickSizeUnit));
    this.tickSize = this.tickIntervalCount * this.tickSizeUnit;

    this.ticks = [];
  }

  x(value) {
    value = typeof value === 'object' ? value[this.unit] : value;
    return this.benchmark.point + ((value - this.benchmark.value) / this.tickInterval) * this.tickSize;
  }

  value(x) {
    return Math.floor(((x - this.benchmark.point) / this.tickSize) * this.tickInterval + this.benchmark.value);
  }

  draw(dataStash) {
    const oldest = dataStash.oldest;
    const latest = dataStash.latest;
    const range = {
      start: getTimeSlot(oldest[this.unit], this.tickInterval).start,
      end: getTimeSlot(latest[this.unit], this.tickInterval).end
    };

    const values = [range.end];

    while (values[0] - this.tickInterval >= range.start && values.length <= this.tickCount) {
      values.unshift(values[0] - this.tickInterval);
    };

    while (values.length <= this.tickCount) {
      values.push(values[values.length - 1] + this.tickInterval);
    }

    this.benchmark.value = values[values.length - 2];

    if (this.x(latest[this.unit]) > this.benchmark.point) {
      this.benchmark.value = latest[this.unit];
    }

    this.chart.ctx.clearRect(this.left, this.top, this.width, this.height);

    this.ticks = values.map((value) => {
      const date = new Date(value);
      return {
        label: this.chart.settings.xAxis.label(date),
        value: date.getTime(),
        x: this.x(value),
        y: this.top + 20,
      };
    });

    this.ticks.forEach((tick) => {
      text(this.chart.ctx)(tick.label, tick.x, tick.y);
    });
  }
}
