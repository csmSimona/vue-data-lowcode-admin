import chartData from './data.json';

const geoOptions = [
  // 第一层：顶层地图，还带了外部阴影
  {
    zlevel: 0,
    layoutCenter: ['50%', '50%'], // 位置
    roam: false, // 是否开启鼠标缩放和平移漫游
    silent: true, // 不响应和触发鼠标事件
    label: {
      normal: {
        show: false,
        textStyle: {
          color: '#fff',
        },
      },
      emphasis: {
        show: true,
        textStyle: {
          color: '#fff',
        },
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
        borderColor: '#c0f3fb',
        borderWidth: 1,
        shadowColor: '#8cd3ef',
        shadowOffsetY: 5,
        shadowBlur: 20,
      },
      emphasis: {
        areaColor: 'rgba(0,254,233,0.6)',
      },
    },
  },
  // 第二层
  {
    zlevel: -1,
    layoutCenter: ['50%', '51%'], // 位置
    roam: false, // 是否开启鼠标缩放和平移漫游
    silent: true, // 不响应和触发鼠标事件
    itemStyle: {
      normal: {
        borderWidth: 1,
        borderColor: 'rgba(58,149,253,0.8)',
        shadowColor: 'rgba(172, 122, 255,0.5)',
        shadowOffsetY: 5,
        shadowBlur: 15,
        areaColor: 'rgba(5,21,35,0.1)',
      },
    },
  },
  // 第三层
  {
    zlevel: -2,
    layoutCenter: ['50%', '52%'], // 位置
    roam: false, // 是否开启鼠标缩放和平移漫游
    silent: true, // 不响应和触发鼠标事件
    itemStyle: {
      normal: {
        borderWidth: 1,
        // borderColor: "rgba(57, 132, 188,0.4)",
        borderColor: 'rgba(58,149,253,0.6)',
        shadowColor: 'rgba(65, 214, 255,1)',
        shadowOffsetY: 5,
        shadowBlur: 15,
        areaColor: 'transpercent',
      },
    },
  },
  // 第四层
  {
    zlevel: -3,
    aspectScale: 1,
    layoutCenter: ['50%', '53%'], // 位置
    roam: false, // 是否开启鼠标缩放和平移漫游
    silent: true, // 不响应和触发鼠标事件
    itemStyle: {
      normal: {
        borderWidth: 1,
        // borderColor: "rgba(11, 43, 97,0.8)",
        borderColor: 'rgba(58,149,253,0.4)',
        shadowColor: 'rgba(58,149,253,1)',
        shadowOffsetY: 15,
        shadowBlur: 10,
        areaColor: 'transpercent',
      },
    },
  },
  // 第五层
  {
    zlevel: -4,
    layoutCenter: ['50%', '54%'], // 位置
    roam: false, // 是否开启鼠标缩放和平移漫游
    silent: true, // 不响应和触发鼠标事件
    itemStyle: {
      normal: {
        borderWidth: 5,
        // borderColor: "rgba(11, 43, 97,0.8)",
        borderColor: 'rgba(5,9,57,0.8)',
        shadowColor: 'rgba(29, 111, 165,0.8)',
        shadowOffsetY: 15,
        shadowBlur: 10,
        areaColor: 'rgba(5,21,35,0.1)',
      },
    },
  },
];

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
  chartKey: 'StackMap',
  chartName: '叠层地图',
  width: 740,
  height: 700,
  chartOption,
  chartData,
};

export default chartConfig;
