import Axis from './Axis';
import { ms, getTimeSlot } from '../../time';
import { text } from '../../canvas';

class AxisBottom extends Axis {
  constructor(chart, unit) {
    super(chart, unit);

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
    this.tickInterval = ms('15m');
    this.tickSize = Math.floor((this.width - 50 ) / 8);

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
      start: getTimeSlot(new Date(oldest[this.unit]), ms('15m')).start,
      end: getTimeSlot(new Date(latest[this.unit]), ms('15m')).end
    };

    const values = [range.end];

    while (values[0] - ms('15m') >= range.start && values.length <= 8) {
      values.unshift(values[0] - ms('15m'));
    };

    while (values.length <= 8) {
      values.push(values[values.length - 1] + ms('15m'));
    }

    this.benchmark.value = values[values.length - 2];

    if (this.x(latest[this.unit]) > this.benchmark.point) {
      this.benchmark.value = latest[this.unit];
    }

    this.chart.ctx.clearRect(this.left, this.top, this.width, this.height);

    this.ticks = values.map((value) => {
      const date = new Date(value);
      return {
        label: `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`,
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

export default AxisBottom;