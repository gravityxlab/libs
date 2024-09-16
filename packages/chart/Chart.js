import { BaseChart } from './BaseChart';
import { AxisBottom } from './Axis/AxisBottom';
import { AxisRight } from './Axis/AxisRight';
import { AxisLeft } from './Axis/AxisLeft';
import { Grid } from './Grid';
import { binarySearch } from '../array';

export class Chart extends BaseChart {
  constructor(ctx, settings) {
    super(ctx, settings);

    this.axisBottom = new AxisBottom(this, this.settings.axisBottom);

    this.settings.config.forEach(({ chart }, index) => {
      if (index === 0) {
        this.dataStash = new chart.DataStash(this, {
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
    const startIndex = binarySearch(this.dataStash.data, this.axisBottom.value(this.innerLeft - 10), this.settings.axisBottom.key);
    return this.dataStash.data.slice(startIndex);
  }

  draw() {
    
    this.axisBottom.draw(this.dataStash);
    this.grid.draw(this.axisBottom, this.axisRight);

    this.settings.config.forEach(({ chart, key }) => {
      const { render, dataset } = chart;

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

    if (this.settings.axisLeft) {
      this.axisLeft.draw(this.data);
    }

    super.clear();
  }
}