class Grid {
  constructor(chart) {
    this.chart = chart;
  }

  draw(axisBottom, axisRight) {
    this.left = this.chart.innerLeft;
    this.top = 0;
    this.width = this.chart.width - axisRight.width - this.left;
    this.height = this.chart.innerBottom;

    this.chart.ctx.clearRect(this.left, this.top, this.width, this.height);
    this.chart.ctx.beginPath();
    this.chart.ctx.strokeStyle = '#2B3139';
    this.chart.ctx.lineWidth = 1;

    axisBottom.ticks.forEach((tick) => {
      if (tick.x > axisRight.left) {
        return;
      }
      this.chart.ctx.moveTo(tick.x, this.top);
      this.chart.ctx.lineTo(tick.x, this.height);
    });

    axisRight.ticks.forEach((tick) => {
      if (tick.y >= this.chart.innerBottom - 2) {
        return;
      }

      this.chart.ctx.moveTo(this.left + this.chart.ctx.lineWidth, tick.y);
      this.chart.ctx.lineTo(this.width + this.left, tick.y);
    });
    this.chart.ctx.stroke();
  }
}

export { Grid };