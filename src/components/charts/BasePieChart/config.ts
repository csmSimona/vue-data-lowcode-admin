import chartData from './data.json';

const chartOption = {
  // 饼图颜色
  color: ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#5470c6', '#ff8c71'],
  // 标题
  title: {
    show: true,
    text: '这是标题',
    left: 'center',
    top: 'top',
    textStyle: {
      fontSize: 18,
      color: '#ccc',
    },
  },
  tooltip: {
    trigger: 'item',
  },
  // 图例
  legend: {
    show: true,
    orient: 'horizontal',
    icon: 'circle',
    x: 'center',
    y: 'bottom',
    textStyle: {
      color: '#ddd',
      fontSize: 12,
    },
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      // 内环大小
      radiusInside: 0,
      // 外环大小
      radiusOutside: 60,
      // 起始角度
      startAngle: 90,
      // 是否展示成南丁格尔图
      roseType: 'none',
      itemStyle: {
        // 圆角
        borderRadius: 0,
        borderColor: '#232324',
        // 边框宽度
        borderWidth: 0,
      },
      // 文本标签
      label: {
        position: 'outside',
        fontSize: 12,
        color: '#ddd',
        labelShowType: 'name',
      },
      emphasis: {
        label: {
          show: true,
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(255, 0, 0, 0.5)',
        },
      },
    },
  ],
  // 自动轮播
  autoPlay: false,
  // 轮播间隔
  interval: 3000,
  // 轮播显示提示
  showTooltip: false,
};

const chartConfig = {
  chartKey: 'BasePieChart',
  chartName: '基础饼图',
  width: 500,
  height: 400,
  chartOption,
  chartData,
};

export default chartConfig;
