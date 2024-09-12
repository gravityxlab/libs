export class BaseChart {
  constructor(ctx, settings) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;

    this.settings = settings;
  }

  get padding() {
    return this.settings.padding || {
      top: 30,
      bottom: 40,
      left: 50,
      right: 50,
    };
  }

  get innerHeight() {
    return this.height - this.padding.bottom;
  }

  get innerWidth() {
    return this.width - this.padding.right;
  }
}

