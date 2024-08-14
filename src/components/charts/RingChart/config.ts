import chartData from './data.json';

const chartOption = {
  // 标题
  showTitle: true,
  text: '这是标题',
  titleX: 'center',
  titleY: 'top',
  titleColor: '#ccc',
  titleFontSize: 18,
  subtext: '这是副标题',
  subtextColor: '#aaa',
  subtextFontSize: 18,
  // 图例
  showLegend: true,
  legendOrient: 'horizontal',
  legendIcon: 'circle',
  legendX: 'center',
  legendY: 'bottom',
  legendTextColor: '#ddd',
  legendFontSize: 12,
  // 文本标签
  labelPosition: 'outside',
  labelFontSize: 12,
  labelColor: '#ddd',
  labelShowType: 'name',
  // 图表
  startAngle: 90,
  radiusInside: 40,
  radiusOutside: 60,
  roseType: 'false',
  borderRadius: 0,
  borderColor: '#232324',
  borderWidth: 0,
  // 饼图颜色
  pieColor: ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#5470c6', '#ff8c71'],
  // 自动轮播
  autoPlay: false,
  // 轮播间隔
  interval: 3000,
  // 轮播显示提示
  showTooltip: false,
};

const chartConfig = {
  chartKey: 'RingChart',
  chartName: '环图',
  width: 500,
  height: 400,
  chartOption,
  chartData
};

export default chartConfig;
