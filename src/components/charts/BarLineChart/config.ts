import chartData from './data.json';

const chartOption = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    containLabel: true,
    left: 10,
    top: 30,
    right: 10,
    bottom: 10,
  },
  // 标题
  title: {
    show: false,
    text: '一周用电量分布',
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
    icon: 'circle',
    x: 'center',
    y: 'top',
    textStyle: {
      color: '#ddd',
      fontSize: 16,
    },
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
  lineConfig: {
    type: 'line',
    smooth: false,
    symbol: 'circle',
    symbolSize: 8,
    label: {
      show: false,
      position: 'top',
      color: '#fff',
      fontSize: 12,
    },
  },
  barConfig: {
    type: 'bar',
    barWidth: 15,
    barGap: 20,
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
  },
  color: ['#4992ff', '#7cffb2'],
};

const chartConfig = {
  chartKey: 'BarLineChart',
  chartName: '折柱图',
  width: 500,
  height: 300,
  chartOption,
  chartData,
};

export default chartConfig;
