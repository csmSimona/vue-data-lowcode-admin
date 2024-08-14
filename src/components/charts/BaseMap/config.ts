import chartData from './data.json';

const chartOption = {
  // 图例
  showLegend: true,
  legendOrient: 'vertical',
  legendType: 'piecewise',
  legendX: 'left',
  legendY: 'bottom',
  legendTextColor: '#eee',
  colorRange: ['#e0ffff', '#006edd'],
  pieces: [
    {
      min: 101,
      label: '> 100 人',
      color: '#7f1100',
    },
    {
      min: 10,
      max: 100,
      label: '10 - 100 人',
      color: '#ff5428',
    },
    {
      min: 1,
      max: 10,
      label: '1 - 9 人',
      color: '#ff8c71',
    },
    {
      min: 0,
      max: 0,
      label: '无',
      color: '#ffffff',
    },
  ],
  // 地图
  mapName: 'china',
  zoom: 1.23,
  showLabel: true,
  labelColor: 'rgba(0,0,0,0.7)',
  labelFontSize: 14,
  showTooltip: true,
  tooltipBg: '#00000060',
  tooltipColor: '#fff',
  borderColor: 'rgba(0, 0, 0, 0.2)',
  emphasisAreaColor: '#f2d5ad',
  // 标题
  showTitle: true,
  seriesName: '确诊病例',
  titleX: 'center',
  titleY: 'top',
  titleColor: '#ccc',
  titleFontSize: 18,
  // 自动轮播
  autoPlay: false,
  interval: 3000,
  // 自定义投影
  showProjection: false,
  projectionType: 'custom'
};

const chartConfig = {
  chartKey: 'BaseMap',
  chartName: '基础地图',
  width: 700,
  height: 700,
  chartOption,
  chartData
};

export default chartConfig;
