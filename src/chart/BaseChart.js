export class BaseChart {
  constructor(ctx, settings) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;

    this.settings = settings;
  }

  get padding() {
    return this.settings.padding || {
      top: 0,
      bottom: 40,
      left: 0,
      right: 70,
    };
  }

  get innerHeight() {
    return this.height - this.padding.top - this.padding.bottom;
  }

  get innerWidth() {
    return this.width - this.padding.left - this.padding.right;
  }
}

