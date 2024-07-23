import { commonOption } from '../common';
import chartData from './data.json';

const chartOption = {
  ...commonOption,
  barColor: '#409eff' // 柱子颜色
};

const chartConfig = {
  chartKey: 'BarChart',
  chartName: '柱状图',
  width: 500,
  height: 300,
  chartOption,
  chartData
};

export default chartConfig;
