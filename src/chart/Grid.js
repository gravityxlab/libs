class Grid {
  constructor(chart) {
    this.chart = chart;
  }

  draw(axisBottom, axisRight) {
    this.left = 0;
    this.top = 0;
    this.width = this.chart.width - axisRight.width - 1;
    this.height = this.chart.height - axisBottom.height - 1;

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
      this.chart.ctx.moveTo(this.left, tick.y);
      this.chart.ctx.lineTo(this.width, tick.y);
    });
    this.chart.ctx.stroke();
  }
}

export { Grid };