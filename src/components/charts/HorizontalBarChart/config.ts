import chartData from './data.json';

const chartOption = {
  orient: 'horizontal',
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
  tooltip: {
    trigger: 'axis',
  },
  // 距离
  grid: {
    containLabel: true,
    left: 20,
    top: 40,
    right: 20,
    bottom: 20,
  },
  xAxis: {
    show: true,
    type: 'value',
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
  series: new Array(chartData?.dimensions?.length - 1).fill(0).map((_) => ({
    type: 'bar',
    barWidth: 15,
    showBackground: false,
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
  })),
};

const chartConfig = {
  chartKey: 'HorizontalBarChart',
  chartName: '横向柱状图',
  width: 550,
  height: 400,
  chartOption,
  chartData,
};

export default chartConfig;
