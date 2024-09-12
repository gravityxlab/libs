import { Axis } from './Axis';
import { ms, format, getTimeSlot } from '../../time';
import { text } from '../../canvas';

export class AxisBottom extends Axis {
  constructor(chart, settings) {
    super('axis_bottom', chart, settings);

    this.left = 0;
    this.height = this.chart.padding.bottom;
    this.top = this.chart.innerHeight - 1;
    this.width = this.chart.width;

    this.benchmark = {
      point: this.chart.innerWidth - 20,
      value: null,
    };

    
    this.tickInterval = settings.interval || ms('15m');
    this.tickIntervalCount = settings.tickIntervalCount;
    this.tickSizeUnit = 6;
    this.tickCount = Math.ceil(this.chart.innerWidth / (this.tickIntervalCount * this.tickSizeUnit));
    this.tickSize = this.tickIntervalCount * this.tickSizeUnit;

    this.ticks = [];
  }

  x(value) {
    // value = typeof value === 'object' ? value[this.key] : value;
    return this.benchmark.point + ((value - this.benchmark.value) / this.tickInterval) * this.tickSize;
  }

  value(x) {
    return Math.floor(((x - this.benchmark.point) / this.tickSize) * this.tickInterval + this.benchmark.value);
  }

  draw(dataStash) {
    let oldest = dataStash.oldest?.[this.key];
    let latest = dataStash.latest?.[this.key];
    if (!oldest || !latest) {
      const now = Date.now();

      if (!oldest) {
        oldest = now;
      }

      if (!latest) {
        latest = now;
      }

    }
    const range = {
      start: getTimeSlot(oldest, this.tickInterval).start,
      end: getTimeSlot(latest, this.tickInterval).end
    };

    const values = [range.end];

    while (values[0] - this.tickInterval >= range.start && values.length <= this.tickCount) {
      values.unshift(values[0] - this.tickInterval);
    };

    while (values.length <= this.tickCount) {
      values.push(values[values.length - 1] + this.tickInterval);
    }

    this.benchmark.value = values[values.length - 2];

    if (this.x(latest) > this.benchmark.point) {
      this.benchmark.value = latest;
    }

    this.chart.ctx.clearRect(this.left, this.top, this.width, this.height);

    this.chart.ctx.beginPath();
    this.chart.ctx.strokeStyle = '#2B3139';
    this.chart.ctx.lineWidth = 1;
    this.chart.ctx.moveTo(this.left, this.top);
    this.chart.ctx.lineTo(this.width, this.top);
    this.chart.ctx.stroke();

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
