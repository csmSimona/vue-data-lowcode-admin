import chartData from './data.json';

const chartOption = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    containLabel: true,
    left: 10,
    top: 20,
    right: 10,
    bottom: 10,
  },
  xAxis: {
    show: true,
    type: 'category',
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
  series: new Array(chartData?.dimensions?.length - 1).fill(0).map((_) => ({
    type: 'bar',
    itemStyle: {
      color: null,
    },
  })),
};

const chartConfig = {
  chartKey: 'BaseBarChart',
  chartName: '基础柱状图',
  width: 500,
  height: 300,
  chartOption,
  chartData,
};

export default chartConfig;
