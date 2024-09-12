import { BaseChart } from './BaseChart';
import { AxisBottom } from './Axis/AxisBottom';
import { AxisRight } from './Axis/AxisRight';
import { Grid } from './Grid';
import { binarySearch } from '../array';

export class Chart extends BaseChart {
  constructor(ctx, settings) {
    super(ctx, settings);
    
    this.axisBottom = new AxisBottom(this, this.settings.xAxis);
    this.axisRight = new AxisRight(this, this.settings.yAxis);
    this.grid = new Grid(this);

    this.dataStash = new this.settings.chart.DataStash(this, {
      onChange: this.draw.bind(this),
    });
  }

  get key() {
    return {
      x: this.settings.xAxis.key,
      y: this.settings.yAxis.key,
    };
  }

  get data() {
    const startIndex = binarySearch(this.dataStash.data, this.axisBottom.value(0), this.settings.xAxis.key);
    return this.dataStash.data.slice(startIndex);
  }

  get render() {
    return this.settings.chart.render;
  }

  get dataset() {
    return this.settings.chart.dataset(this, this.key.y, {
      x: this.axisBottom.x.bind(this.axisBottom),
      y: this.axisRight.y.bind(this.axisRight),
    });
  }

  draw() {
    this.axisBottom.draw(this.dataStash);
    
    this.grid.draw(this.axisBottom, this.axisRight);
    this.render(this, this.dataset, this.settings.chart._settings);

    this.axisRight.draw(this.data);
  }
}
