import Axis from './Axis';
import { lowHigh } from '../../array';
import { text } from '../../canvas';

class AxisRight extends Axis {
  constructor(chart, unit) {
    super(chart, unit);

    this.top = 0;
    this.width = this.chart.padding.right;
    this.left = this.chart.width - this.width;
    this.height = this.chart.height;

    this.benchmark = {
      point: 20,
      value: null,
    };

    this.tickSize = Math.floor((this.chart.innerHeight - this.benchmark.point * 2) / 4);
    this.ticks = [];
  }

  y(value) {
    value = typeof value === 'object' ? value[this.unit] : value;
    return this.benchmark.point + ((this.benchmark.value - value) / this.tickInterval) * this.tickSize;
  }

  draw(data) {
    this.chart.ctx.clearRect(this.left, this.top, this.width, this.height);

    this.chart.ctx.beginPath();
    this.chart.ctx.strokeStyle = '#2B3139';
    this.chart.ctx.lineWidth = 1;
    this.chart.ctx.moveTo(this.left, this.top);
    this.chart.ctx.lineTo(this.left, this.height);
    this.chart.ctx.moveTo(this.left, this.chart.axisBottom.top);
    this.chart.ctx.lineTo(this.chart.$el.width, this.chart.axisBottom.top);
    this.chart.ctx.stroke();

    const [low, high] = lowHigh(data, this.unit);

    this.benchmark.value = high;

    this.tickInterval = Math.ceil((high - low) / 4);

    const ticks = [];

    for (let index = 0; index < 5; index++) {
      const value = low + this.tickInterval * index;
      const tick = {
        label: value,
        value,
        x: this.left + 30,
        y: this.y(value),
      };

      ticks.push(tick);

      text(this.chart.ctx)(tick.label, tick.x, tick.y);      
    }

    this.ticks = ticks;
  }
}

export default AxisRight;