
import { CHART_TYPE } from './constants';

const renderer = {
  _settings: {
    line: { gradient: true, color: '#FCD435', lineWidth: 1 }
  },
  _gradient(chart, dataset, color) {
    const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.innerHeight);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, `${color}00`);

    chart.ctx.beginPath();

    let moveTo;
    for (const point of dataset) {
      if (!moveTo) {
        chart.ctx.moveTo(point.current.x, point.current.y);
        moveTo = point.current;
      } else {
        chart.ctx.lineTo(point.current.x, point.current.y);
      }
    }

    chart.ctx.lineTo(dataset.end.x, chart.innerHeight);
    chart.ctx.lineTo(dataset.start.x, chart.innerHeight);

    chart.ctx.closePath();
  
    chart.ctx.fillStyle = gradient;
    chart.ctx.fill();
  },
  [CHART_TYPE.LINE](chart, dataset, settings = {}) {
    settings = settings || this._settings.line;
    const color = settings.color || this._settings.line.color;
    const lineWidth =  settings.lineWidth || this._settings.line.lineWidth;

    if (settings.gradient) {
      this._gradient(chart, dataset, color);
    }

    chart.ctx.strokeStyle = color;
    chart.ctx.lineWidth = lineWidth;

    chart.ctx.beginPath();
    for (const point of dataset) {
      const next = point.next();
      if (next) {
        chart.ctx.moveTo(point.current.x, point.current.y);
        chart.ctx.lineTo(next.x, next.y);
      }
    }
    chart.ctx.closePath();
    chart.ctx.stroke();
  },
};

export default renderer;