class DataStash {
  constructor(type, change) {
    this.type = type;
    this.change = change;
    this.data = [];
  }

  set(data) {
    this.data = data;
    this.change(this.data);
  }

  add(item) {
    this.data.push(item);
    this.change(this.data);
  }

  get oldest() {
    return this.data[0];
  }

  get latest() {
    return this.data[this.data.length - 1];
  }
}

export default DataStash;