import { commonOption } from '../common';
import chartData from './data.json';

const chartOption = {
  ...commonOption,
  lineColor: '#409eff', // 折线颜色
  smooth: false // 是否平滑展示
};

const chartConfig = {
  chartKey: 'LineChart',
  chartName: '折线图',
  width: 500,
  height: 300,
  chartOption,
  chartData
};

export default chartConfig;
