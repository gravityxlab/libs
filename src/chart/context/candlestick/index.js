import { render } from './render';
import { dataset } from './dataset';
import { OhlcStash } from '../DataStash/OhlcStash';

const candlestick = {
  render,
  dataset,
  DataStash: OhlcStash,
};

export { candlestick };
