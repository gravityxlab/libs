import { render } from './render';
import { dataset } from './dataset';
import { ArrayStash } from '../DataStash/ArrayStash';

const line = {
  render,
  dataset,
  DataStash: ArrayStash,
};

export { line };