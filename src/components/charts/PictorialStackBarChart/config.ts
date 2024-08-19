import chartData from './data.json';

const chartOption = {
  // 标题
  title: {
    show: false,
    text: '用电量分布',
    left: 'center',
    top: 'top',
    textStyle: {
      fontSize: 18,
      color: '#ccc',
    },
  },
  // 图例
  legend: {
    show: true,
    orient: 'horizontal',
    icon: 'roundRect',
    x: 'center',
    y: 'top',
    textStyle: {
      color: '#ddd',
      fontSize: 16,
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  // 距离
  grid: {
    containLabel: true,
    left: 20,
    top: 60,
    right: 20,
    bottom: 20,
  },
  xAxis: {
    show: true,
    type: 'category',
    // 单位
    name: '',
    nameTextStyle: {
      color: '#fff',
      fontSize: 16,
    },
    // 坐标轴刻度标签
    axisLabel: {
      show: true,
      color: '#fff',
    },
    // 轴线
    axisLine: {
      show: true,
      lineStyle: {
        color: '#eee',
      },
    },
    // 刻度线
    axisTick: {
      show: true,
      lineStyle: {
        color: '#eee',
      },
    },
    // 网格线
    splitLine: {
      show: false,
      lineStyle: {
        color: '#eee',
      },
    },
  },
  yAxis: {
    show: true,
    type: 'value',
    max: 462,
    // 单位
    name: '',
    nameTextStyle: {
      color: '#fff',
      fontSize: 16,
    },
    // 坐标轴刻度标签
    axisLabel: {
      show: true,
      color: '#fff',
    },
    // 轴线
    axisLine: {
      show: true,
      lineStyle: {
        color: '#eee',
      },
    },
    // 刻度线
    axisTick: {
      show: true,
      lineStyle: {
        color: '#eee',
      },
    },
    // 网格线
    splitLine: {
      show: false,
      lineStyle: {
        color: '#eee',
      },
    },
  },
  series: new Array(chartData?.dimensions?.length).fill(0).map((_) => ({
    type: 'pictorialBar',
    barGap: '-100%',
    itemStyle: {
      color: null,
      borderRadius: 2,
    },
    label: {
      show: false,
      position: 'top',
      color: '#fff',
      fontSize: 12,
    },
    symbol: 'rect', // 图形类型，带圆角的矩形
    symbolMargin: 1, // 图形垂直间隔
    barWidth: 5, // 柱图宽度
    symbolRepeat: true, // 图形是否重复
    symbolSize: [20, '100%'],
  })),
  color: ['#CB5B84', '#07B382', '#FFE266', '#27CEFF'],
  seriesMap: [
    {
      code: 'max',
      desc: '背景',
    },
    {
      code: 'born',
      desc: '成案数',
    },
    {
      code: 'finish',
      desc: '办结数',
    },
    {
      code: 'change',
      desc: '转办数',
    },
    {
      code: 'acceptance',
      desc: '受理数',
    },
  ],
};

const chartConfig = {
  chartKey: 'PictorialStackBarChart',
  chartName: '象形堆叠柱状图',
  width: 500,
  height: 300,
  chartOption,
  chartData,
};

export default chartConfig;
