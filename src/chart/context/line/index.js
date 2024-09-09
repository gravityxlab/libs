import { render } from './render';
import { dataset } from './dataset';
import { OhlcStash } from '../DataStash/OhlcStash';

const line = {
  render,
  dataset,
  DataStash: OhlcStash,
};

export { line };