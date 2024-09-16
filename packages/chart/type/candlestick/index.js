import { render } from './render';
import { dataset } from './dataset';
import { OhlcStash } from '../../DataStash/OhlcStash';

class Candlestick {
  constructor() {
    this._settings = {};
    this.type = 'candlestick';
    this.render = render;
    this.dataset = dataset;
    this.DataStash = OhlcStash;
  }

  settings(settings) {
    const bar = new Candlestick();
    bar._settings = settings;
    return bar;
  }
}

const candlestick = new Candlestick();

export { candlestick };
