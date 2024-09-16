export class Axis {
  constructor(type, chart, settings) {
    this.type = type;
    this.chart = chart;
    this.settings = settings;
  }

  get key() {
    return this.settings.key;
  }

  get range() {
    return this.settings.range || ['auto', 'auto'];
  }

  low(value) {
    if (typeof this.range[0] === 'number') {
      return this.range[0];
    }

    return value;
  }

  high(value) {
    if (typeof this.range[1] === 'number') {
      return this.range[1];
    }
    
    return value;
  }
}
