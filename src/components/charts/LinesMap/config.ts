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
    trigger: 'item',
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
    },
    seriesIndex: 0,
  },
  geo: {
    // 注册地图名
    map: 'china',
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
        areaColor: {
          type: 'linear',
          x: 1200,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(3,27,78,0.75)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(58,149,253,0.75)', // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
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
    showProjection: false,
    projectionType: 'custom',
  },
  series: [
    {
      name: '区域',
      type: 'map',
      geoIndex: 0,
    },
    {
      name: '',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      symbol: 'circle',
      symbolSize: 4,
      legendHoverLink: true,
      // 配置何时显示特效
      showEffectOn: 'render',
      // 涟漪特效相关配置
      rippleEffect: {
        scale: 6,
        color: '#FFFFFF',
        brushType: 'fill', // 涟漪的绘制方式
      },
      label: {
        formatter: '{b}',
        fontSize: 12,
        position: 'bottom',
        color: '#FFFFFF',
        show: true,
      },
      itemStyle: {
        color: '#FFFFFF',
      },
      tooltip: {
        show: true,
        formatter: (dataItem) => dataItem.marker + dataItem.name + '：' + dataItem.value[2],
      },
    },
    {
      type: 'lines',
      zlevel: 2,
      // 线特效的配置
      effect: {
        show: true,
        period: 4, // 特效动画的时间
        symbol: 'arrow', // 图标
        symbolSize: 7, // 图标大小
        color: '#05A422', // 特效标记的颜色
        trailLength: 0.4, // 特效尾迹长度[0,1]值越大，尾迹越长重
      },
      lineStyle: {
        normal: {
          color: '#05A422',
          width: 1, // 线条宽度
          opacity: 0.1, // 尾迹线条透明度
          curveness: 0.3, // 尾迹线条曲直度
        },
      },
      tooltip: {
        show: false,
      },
    },
  ],
};

const chartConfig = {
  chartKey: 'LinesMap',
  chartName: '飞线地图',
  width: 700,
  height: 700,
  chartOption,
  chartData,
};

export default chartConfig;
