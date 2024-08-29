import chartData from './data.json';

const geoOptions = [
  // 所有区域的边框轮廓 map
  {
    zlevel: 6,
    // 取消高亮
    emphasis: {
      disabled: true,
    },
    silent: true, // 不响应和触发鼠标事件
    layoutCenter: ['50%', '50%'], // 位置
    // 边框颜色
    itemStyle: {
      color: 'transparent',
      opacity: 1,
      borderWidth: 1,
      borderColor: 'rgba(146, 193, 240, 1)',
      borderCap: 'round',
      shadowColor: 'rgba(146, 193, 240, 1)', // 阴影颜色
      shadowBlur: 20, // 阴影模糊大小，呈现边框发光效果
    },
  },
  // 顶层map
  {
    zlevel: 5,
    z: 4,
    // 取消高亮
    emphasis: {
      disabled: true,
    },
    silent: true, // 不响应和触发鼠标事件
    layoutCenter: ['50%', '50%'], // 位置
    // 调整颜色
    itemStyle: {
      // areaColor: '#264684',
      // 设置渐变色背景
      areaColor: {
        type: 'linear',
        x: 980,
        y: 400,
        x2: 150,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(56,96,155,1)', // 50% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(2,20,42,1)', // 0% 处的颜色
          },
        ],
        global: true, // 缺省为 false
      },
      borderWidth: 1.2,
      borderCap: 'round',
      borderColor: 'rgba(81, 123, 165, 1)',
    },
  },
  // 第二层，下层地图，仿3d效果
  {
    zlevel: 4,
    z: 3,
    // 取消高亮
    emphasis: {
      disabled: true,
    },
    silent: true, // 不响应和触发鼠标事件
    layoutCenter: ['50%', '50%'], // 位置
    // 调整颜色
    itemStyle: {
      borderWidth: 0,
      borderCap: 'round',
      areaColor: 'rgba(56,96,155,1)',
    },
  },
  // 第三层，下层地图，仿3d效果
  {
    zlevel: 3,
    z: 2,
    // 取消高亮
    emphasis: {
      disabled: true,
    },
    silent: true, // 不响应和触发鼠标事件
    layoutCenter: ['50%', '51%'], // 位置
    // 颜色
    itemStyle: {
      borderWidth: 0,
      borderCap: 'round',
      areaColor: 'rgba(56,96,155,1)',
    },
  },
  // 第四层，下层地图，仿3d效果
  {
    zlevel: 2,
    z: 1,
    // 取消高亮
    emphasis: {
      disabled: true,
    },
    silent: true, // 不响应和触发鼠标事件
    layoutCenter: ['50%', '51.3%'], // 位置
    // 颜色
    itemStyle: {
      borderColor: 'rgba(0, 0, 0, 0.3)',
      borderWidth: 1,
      borderCap: 'round',
      areaColor: 'rgba(56,96,155,1)',
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.6)',
    },
  },
];

const chartOption = {
  // 自动轮播
  autoPlay: false,
  interval: 3000,
  title: {
    show: false,
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
  geoConfig: {
    map: 'china',
    silent: false, // 不响应和触发鼠标事件
    layoutSize: 100, // 大小
    aspectScale: 0.84, // 地图的长宽比，如果设置了projection则无效
    areaColor: 'rgba(0,254,233,0.5)', // 鼠标悬停聚焦颜色
    // 文本标签
    label: {
      normal: {
        show: false,
        fontSize: 14,
        color: '#fff',
      },
    },
  },
  geo: geoOptions,
  series: [
    {
      name: '确诊病例',
      type: 'map',
      geoIndex: 0,
    },
    {
      name: '',
      type: 'effectScatter',
      zlevel: 7,
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
      zlevel: 8,
      // 线特效的配置
      effect: {
        show: true,
        period: 4, // 特效动画的时间
        symbol: 'arrow', // 图标
        symbolSize: 7, // 图标大小
        color: '#4fb6d2', // 特效标记的颜色
        trailLength: 0.4, // 特效尾迹长度[0,1]值越大，尾迹越长重
      },
      lineStyle: {
        normal: {
          color: '#4fb6d2',
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
  chartKey: 'Pseudo3DMap',
  chartName: '伪3D地图',
  width: 740,
  height: 700,
  chartOption,
  chartData,
};

export default chartConfig;
