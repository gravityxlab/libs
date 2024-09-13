import { render } from './render';
import { dataset } from './dataset';
import { ArrayStash } from '../../DataStash/ArrayStash';

class Line {
  constructor() {
    this._settings = {};
    this.type = 'line';
    this.render = render;
    this.dataset = dataset;
    this.DataStash = ArrayStash;
  }

  settings(settings) {
    const bar = new Line();
    bar._settings = settings;
    return bar;
  }
}

const line = new Line();

export { line };