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
  // visualMap: {
  //   show: true,
  //   orient: 'vertical',
  //   type: 'continuous',
  //   top: 'bottom',
  //   left: 'left',
  //   showLabel: true,
  //   textStyle: {
  //     color: '#eee',
  //   },
  //   pieces: [
  //     {
  //       min: 101,
  //       label: '> 100 人',
  //       color: '#7f1100',
  //     },
  //     {
  //       min: 10,
  //       max: 100,
  //       label: '10 - 100 人',
  //       color: '#ff5428',
  //     },
  //     {
  //       min: 1,
  //       max: 10,
  //       label: '1 - 9 人',
  //       color: '#ff8c71',
  //     },
  //     {
  //       min: 0,
  //       max: 0,
  //       label: '无',
  //       color: '#ffffff',
  //     },
  //   ],
  //   calculable: false,
  //   inRange: {
  //     color: ['#e0ffff', '#006edd'],
  //     // symbolSize: [30, 100],
  //   },
  // },
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
      name: '确诊病例',
      type: 'map',
      geoIndex: 0,
    },
    {
      name: '散点',
      type: 'scatter',
      // type: 'effectScatter',
      coordinateSystem: 'geo', // 使用的坐标系
      symbol: 'circle',
      symbolSize: 8,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false,
        },
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          color: 'rgba(255,255,0,0.8)',
        },
      },
      // data: convertData(geoCoordMap, data),
      data: [
        {
          name: '内蒙古',
          value: [111.670801, 40.818311],
        },
        {
          name: '新疆',
          value: [87.617733, 43.792818],
        },
        {
          name: '广西',
          value: [108.320004, 22.82402],
        },
        {
          name: '贵州',
          value: [106.713478, 26.578343],
        },
        {
          name: '江西',
          value: [115.892151, 28.676493],
        },
      ],
    },
  ],
};

const chartConfig = {
  chartKey: 'ScatterMap',
  chartOptionKey: 'BaseMapOption',
  chartName: '散点地图',
  width: 700,
  height: 700,
  chartOption,
  chartData,
};

export default chartConfig;
