import { render } from './render';
import { dataset } from './dataset';
import { ArrayStash } from '../DataStash/ArrayStash';

const bar = {
  render,
  dataset,
  DataStash: ArrayStash,
};

export { bar };
