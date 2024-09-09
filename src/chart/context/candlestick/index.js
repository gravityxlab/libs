import { render } from './render';
import { dataset } from './dataset';
import { ArrayStash } from '../DataStash/ArrayStash';

const candlestick = {
  render,
  dataset,
  DataStash: ArrayStash,
};

export { candlestick };
