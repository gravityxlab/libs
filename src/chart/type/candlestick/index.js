import { render } from './render';
import { dataset } from './dataset';
import { OhlcStash } from '../DataStash/OhlcStash';

const candlestick = {
  _settings: {},
  type: 'candlestick',
  render,
  dataset,
  DataStash: OhlcStash,
  settings(settings) {
    return {
      ...this,
      _settings: settings,
    };
  }
};

export { candlestick };
