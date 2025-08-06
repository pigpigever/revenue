// 自定义 ECharts 实例
import * as echarts from 'echarts/core';
import {
  LineChart,
  BarChart,
  // 其他用到的图表类型
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  // 其他用到的组件
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册
echarts.use([
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer,
]);

export default echarts;
