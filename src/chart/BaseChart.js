export class BaseChart {
  constructor(ctx, settings) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;

    this.settings = settings;

    if (!this.settings.config) {
      this.settings.config = [{
        chart: this.settings.chart,
        key: this.settings.axisRight.key,
      }];
    }

    if (this.settings.axisBottom && !this.settings.axisBottom.height) {
      this.settings.axisBottom.height = 40;  
    }

    if (this.settings.axisLeft && !this.settings.axisLeft.width) {
      this.settings.axisLeft.width = 50;  
    }

    if (this.settings.axisRight && !this.settings.axisRight.width) {
      this.settings.axisRight.width = 50;
    }
  }

  get padding() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      ...this.settings.padding,
    };
  }

  get innerTop() {
    return this.padding.top;
  }

  get innerLeft() {
    if (this.settings.axisLeft) {
      return this.settings.axisLeft?.width + this.padding.left;
    }

    return this.padding.left;
  }

  get innerHeight() {
    return this.height - this.padding.top - this.padding.bottom - this.settings.axisBottom.height;
  }

  get innerBottom() {
    return this.innerTop + this.innerHeight;
  }

  get innerWidth() {
    return this.width - this.innerLeft - this.padding.right - this.settings.axisRight.width;
  }

  get theme() {
    return {
      text: '#B7BDC6',
      ...this.settings.theme,
    };
  }

  clear() {
    if (this.padding.top) {
      this.ctx.clearRect(0, 0, this.width, this.padding.top);
    }

    if (this.padding.left) {
      this.ctx.clearRect(0, 0, this.padding.left, this.height);
    }

    if (this.padding.right) {
      this.ctx.clearRect(this.width - this.padding.right, 0, this.padding.right, this.height);
    }
  }
}

