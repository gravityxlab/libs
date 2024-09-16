import { Axis } from './Axis';
import { text } from '../../canvas';

export class AxisVertical extends Axis {
  constructor(type, chart, bounds, settings) {
    super(type, chart, settings);

    this.top = bounds.top;
    this.left = bounds.left;
    this.width = bounds.width;
    this.height = bounds.height;

    this.benchmark = {
      point: this.chart.innerBottom - 10,
      value: null,
    };

    this.ticks = [];
  }

  get tickSize() {
    return Math.abs(Math.floor((this.benchmark.point - this.top - 24) / 4));
  }

  y(value) {
    return Math.min(
      this.benchmark.point + ((this.benchmark.value - value) / this.tickInterval) * this.tickSize,
      this.chart.innerBottom - 1,
    );
  }

  draw(data) {
    this.chart.ctx.clearRect(this.left, this.top, this.width, this.height);

    const lowHigh = this.chart.dataStash.helpers.lowHigh(data);

    const low = this.low(Math.floor(lowHigh[0] / 20) * 20);
    const high = this.high(Math.ceil(lowHigh[1] / 20) * 20);

    this.chart.ctx.beginPath();
    this.chart.ctx.strokeStyle = '#2B3139';
    this.chart.ctx.lineWidth = 1;
    if (this.type === 'axis_left') {
      this.chart.ctx.moveTo(this.left + this.width, this.top);
      this.chart.ctx.lineTo(this.left + this.width, this.height);
    } else {
      this.chart.ctx.moveTo(this.left, this.top);
      this.chart.ctx.lineTo(this.left, this.height);
    }

    if (low !== 0) {
      this.chart.ctx.moveTo(this.left, this.chart.axisBottom.top);
      this.chart.ctx.lineTo(this.chart.width, this.chart.axisBottom.top);
    }
    
    this.chart.ctx.stroke();

    if (this.settings.unit) {
      text(this.chart.ctx, { fillStyle: this.chart.theme.text })(
        `(${this.settings.unit})`,
        this.left + this.width / 2,
        this.top + 10,
      );
    }

    if (low === 0) {
      this.benchmark.point = this.chart.axisBottom.top;
      this.benchmark.value = 0;
    } else {
      this.benchmark.value = low;
    }

    this.tickInterval = Math.ceil((high - low) / 4);

    const ticks = [];

    let x
    if (this.type === 'axis_left') {
      x = this.chart.padding.left + this.width / 2;
    } else {
      x =  this.left + this.width / 2
    }

    for (let index = 0; index < 5; index++) {
      const value = low + this.tickInterval * index;

      const tick = {
        label: value,
        value,
        x,
        y: this.y(value),
      };

      ticks.push(tick);

      text(this.chart.ctx, { fillStyle: this.chart.theme.text })(tick.label, tick.x, tick.y);   
    }

    this.ticks = ticks;
  }
}
