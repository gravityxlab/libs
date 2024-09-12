import { render } from './render';
import { dataset } from './dataset';
import { ArrayStash } from '../DataStash/ArrayStash';

const line = {
  _settings: {},
  type: 'line',
  render,
  dataset,
  DataStash: ArrayStash,
  settings(settings) {
    return {
      ...this,
      _settings: settings,
    };
  }
};

export { line };