export const render = (chart, dataset, settings = {}) => {
  for (const item of dataset) {
    chart.ctx.fillStyle = settings.color;
    chart.ctx.fillRect(...item);
  }
};
