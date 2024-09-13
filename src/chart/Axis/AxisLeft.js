import { AxisVertical } from './AxisVertical';
import { text } from '../../canvas';

export class AxisLeft extends AxisVertical {
  constructor(chart, settings) {
    const bounds = {
      top: chart.padding.top,
      width: settings.width,
      left: chart.padding.left,
      height: chart.height - chart.padding.bottom,
    };

    super('axis_left', chart, bounds, settings);
  }
}
