import { BaseChart } from './BaseChart';
import { AxisBottom } from './Axis/AxisBottom';
import { AxisRight } from './Axis/AxisRight';
import { AxisLeft } from './Axis/AxisLeft';
import { Grid } from './Grid';
import { binarySearch } from '../array';

export class CombinationChart extends BaseChart {
  constructor(ctx, settings) {
    super(ctx, settings);

    this.axisBottom = new AxisBottom(this, this.settings.xAxis);

    this.settings.yAxis.forEach((yAxis, index) => {
      if (index === 0) {
        this.dataStash = new this.settings.chart[yAxis.chart.type].DataStash(this, {
          onChange: this.draw.bind(this),
        });
      }
    });

    this.axisRight = new AxisRight(this, this.settings.axisRight);

    if (this.settings.axisLeft) {
      this.axisLeft = new AxisLeft(this, this.settings.axisLeft);
    }

    this.grid = new Grid(this);
  }

  get data() {
    const startIndex = binarySearch(this.dataStash.data, this.axisBottom.value(0), this.settings.xAxis.key);
    return this.dataStash.data.slice(startIndex);
  }

  render() {

  }

  draw() {
    this.axisBottom.draw(this.dataStash);

    this.grid.draw(this.axisBottom, this.axisRight);

    this.settings.yAxis.forEach(({ chart, key }) => {
      const { render, dataset } = this.settings.chart[chart.type];

      let transform;

      if (this.axisRight.settings.key === key) {
        transform = {
          x: this.axisBottom.x.bind(this.axisBottom),
          y: this.axisRight.y.bind(this.axisRight),
        };
      } else if (this.axisLeft.settings.keys.includes(key)) {
        transform = {
          x: this.axisBottom.x.bind(this.axisBottom),
          y: this.axisLeft.y.bind(this.axisLeft),
        };
      }

      if (transform) {
        render(
          this,
          dataset(this, key, transform),
          chart._settings
        );
      }
    });

    this.axisRight.draw(this.data);
    this.axisLeft.draw(this.data);
  }
}