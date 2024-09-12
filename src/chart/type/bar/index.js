import { render } from './render';
import { dataset } from './dataset';
import { ArrayStash } from '../DataStash/ArrayStash';

const bar = {
  _settings: {},
  type: 'bar',
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

export { bar };
