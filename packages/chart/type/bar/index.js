import { render } from './render';
import { dataset } from './dataset';
import { ArrayStash } from '../../DataStash/ArrayStash';

class Bar {
  constructor() {
    this._settings = {};
    this.type = 'bar';
    this.render = render;
    this.dataset = dataset;
    this.DataStash = ArrayStash;
  }

  settings(settings) {
    const bar = new Bar();
    bar._settings = settings;
    return bar;
  }
}

const bar = new Bar();

export { bar };
