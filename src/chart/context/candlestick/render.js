export const render = (chart, dataset, settings = {}) => {
  for (const ohlc of dataset) {
    chart.ctx.fillStyle = ohlc.color;
    chart.ctx.strokeStyle = ohlc.color;
    chart.ctx.lineWidth = 1;

    chart.ctx.fillRect(...ohlc.rect);

    chart.ctx.beginPath();
    chart.ctx.moveTo(...ohlc.line.p0);
    chart.ctx.lineTo(...ohlc.line.p1);
    chart.ctx.closePath();
    chart.ctx.stroke();
  }
};
