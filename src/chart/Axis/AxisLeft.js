import { AxisVertical } from './AxisVertical';
import { text } from '../../canvas';

export class AxisLeft extends AxisVertical {
  constructor(chart, settings) {
    const bounds = {
      top: 0,
      width: chart.padding.left,
      left: 0,
      height: chart.height,
    };

    super('axis_left', chart, bounds, settings);
  }
}
