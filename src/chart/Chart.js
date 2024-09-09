import { BaseChart } from './BaseChart';
import { AxisBottom } from './Axis/AxisBottom';
import { AxisRight } from './Axis/AxisRight';
import { Grid } from './Grid';
import { binarySearch } from '../array';

export class Chart extends BaseChart {
  constructor(ctx, settings) {
    super(ctx, settings);
    
    this.axisBottom = new AxisBottom(this);
    this.axisRight = new AxisRight(this);
    this.grid = new Grid(this);

    this.dataStash = new this.settings.type.DataStash(this, {
      onChange: this.draw.bind(this),
    });
  }

  get data() {
    const startIndex = binarySearch(this.dataStash.data, this.axisBottom.value(0), this.settings.xAxis.unit);
    return this.dataStash.data.slice(startIndex);
  }

  get render() {
    return this.settings.type.render;
  }

  get dataset() {
    return this.settings.type.dataset(this);
  }

  draw() {
    this.axisBottom.draw(this.dataStash);
    this.axisRight.draw(this.data);
    this.grid.draw(this.axisBottom, this.axisRight);
    this.render(this, this.dataset, this.settings);
  }
}
