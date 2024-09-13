import { AxisVertical } from './AxisVertical';
import { text } from '../../canvas';

export class AxisRight extends AxisVertical {
  constructor(chart, settings) {
    const bounds = {
      top: chart.padding.top,
      width: settings.width,
      left: chart.innerLeft + chart.innerWidth,
      height: chart.height - chart.padding.bottom,
    };

    super('axis_right', chart, bounds, settings);
  }
}
