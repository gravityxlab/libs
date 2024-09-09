import AxisBottom from './Axis/AxisBottom';
import AxisRight from './Axis/AxisRight';
import Grid from './Grid';
import DataStash from './DataStash';
import renderer from './renderer';
import dataset from './dataset';
import { binarySearch } from '../array';

export { CHART_TYPE } from './constants';

class Chart {
  constructor({ id, width, height, x, y, type }) {
    this.$el = document.getElementById(id);
    this.ctx = this.$el.getContext('2d');
    this.$el.width = width;
    this.$el.height = height;
    this.width = width;
    this.height = height;

    this.type = type;
    this.x = x;
    this.y = y;

    this.padding = {
      top: 0,
      bottom: 40,
      left: 0,
      right: 70,
    };

    this.axisBottom = new AxisBottom(this, this.x);
    this.axisRight = new AxisRight(this, this.y);
    this.grid = new Grid(this);
    this.dataStash = new DataStash(this.type, this.draw.bind(this));
  }

  get innerHeight() {
    return this.height - this.padding.top - this.padding.bottom;
  }

  get innerWidth() {
    return this.width - this.padding.left - this.padding.right;
  }

  get data() {
    const startIndex = binarySearch(this.dataStash.data, this.axisBottom.value(0), this.x);
    return this.dataStash.data.slice(startIndex);
  }

  draw() {
    this.axisBottom.draw(this.dataStash);
    this.axisRight.draw(this.data);
    this.grid.draw(this.axisBottom, this.axisRight);

    renderer[this.type](this, dataset[this.type](this), { gradient: true });
  }
}

export default Chart;