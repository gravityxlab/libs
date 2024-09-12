import { AxisVertical } from './AxisVertical';
import { text } from '../../canvas';

export class AxisRight extends AxisVertical {
  constructor(chart, settings) {
    const bounds = {
      top: 0,
      width: chart.padding.right,
      left: chart.width - chart.padding.right,
      height: chart.height,
    };

    super('axis_right', chart, bounds, settings);
  }
}
