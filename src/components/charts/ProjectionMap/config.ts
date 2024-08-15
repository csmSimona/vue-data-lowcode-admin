import chartData from './data.json';

const chartOption = {
  // 自动轮播
  autoPlay: false,
  interval: 3000,
  title: {
    show: true,
    text: '确诊病例',
    left: 'center',
    top: 'top',
    textStyle: {
      fontSize: 18,
      color: '#ccc',
    },
  },
  tooltip: {
    show: true,
    backgroundColor: '#00000060',
    textStyle: {
      color: '#fff',
    },
  },
  visualMap: {
    show: true,
    orient: 'vertical',
    type: 'piecewise',
    top: 'bottom',
    left: 'left',
    showLabel: true,
    textStyle: {
      color: '#eee',
    },
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
    calculable: false,
    inRange: {
      color: ['#e0ffff', '#006edd'],
      // symbolSize: [30, 100],
    },
  },
  geo: {
    // 注册地图名
    map: 330000,
    // 地图缩放
    zoom: 1.23,
    label: {
      normal: {
        show: true,
        fontSize: 14,
        color: 'rgba(0,0,0,0.7)',
      },
    },
    itemStyle: {
      normal: {
        borderColor: 'rgba(0, 0, 0, 0.2)',
      },
      emphasis: {
        areaColor: '#f2d5ad',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0,
      },
    },
    // 投影相关
    showProjection: true,
    projectionType: 'custom',
  },
  series: [
    {
      name: '确诊病例',
      type: 'map',
      geoIndex: 0,
    },
  ],
};

const chartConfig = {
  chartKey: 'ProjectionMap',
  chartName: '投影地图',
  width: 1000,
  height: 700,
  chartOption,
  chartData,
};

export default chartConfig;
