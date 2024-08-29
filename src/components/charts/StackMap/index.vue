<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, nextTick, onMounted, onUnmounted, watch, ref } from 'vue';
import * as echarts from 'echarts';
import { useMessage } from 'naive-ui';

const message = useMessage();
const tooltipIntervalRef = ref(null);

const props = defineProps({
  id: {
    type: [Number, String],
  },
  width: {
    type: Number,
    default: 500,
  },
  height: {
    type: Number,
    default: 300,
  },
  chartOption: {
    type: Object,
  },
  chartData: {
    type: Object,
  },
});

const echart = echarts;
// 踩坑注意：echarts不应被设置为响应式
let myChart;

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  myChart.dispose();
});

watch(
  () => [props.width, props.height],
  () => {
    nextTick(() => {
      myChart.resize();
    });
  }
);

watch(
  () => [props.chartOption, props.chartData],
  () => {
    nextTick(() => {
      loadChart();
    });
  },
  {
    deep: true,
  }
);

// 获取对应区域json文件
const getMapJson = async (name) => {
  // 读取本地json文件
  let jsonData;
  const url = `../../../assets/map/${name}.json`;
  try {
    jsonData = await import(url);
  } catch (error) {
    message.error(`${name}.json文件不存在`);
    return {};
  }
  return jsonData?.default;
};

// 初始化图表
function initChart() {
  myChart = echart.init(document.getElementById(props.id));
  window.onresize = () => {
    // 自适应大小
    myChart.resize();
  };
  loadChart();
}

// 加载图表配置和数据
async function loadChart() {
  const geoConfig = props.chartOption.geoConfig;
  // 注册地图
  const mapName = geoConfig.map;
  const newMapJson = await getMapJson(mapName);
  echart.registerMap(mapName, newMapJson);

  myChart.setOption({
    ...props.chartOption,
    geo: props.chartOption.geo?.map((item, index) => ({
      ...item,
      ...geoConfig,
      emphasis: {
        disabled: index === 0 ? geoConfig.silent : true,
      },
      silent: index === 0 ? geoConfig.silent : true,
      itemStyle: {
        ...item.itemStyle,
        emphasis:
          index === 0
            ? {
                areaColor: geoConfig.areaColor,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0,
              }
            : {},
      },
      label: index === 0 ? geoConfig.label : {},
      layoutSize: geoConfig.layoutSize + '%',
    })),
    series: props.chartOption.series?.map((item) => {
      switch (item.type) {
        case 'map':
          item.data = props.chartData.map;
          break;
        case 'effectScatter':
          item.data = props.chartData.point;
          break;
        case 'lines':
          item.data = props.chartData.line;
          break;
      }

      return item;
    }),
  });

  // 自动轮播
  if (tooltipIntervalRef.value) clearInterval(tooltipIntervalRef.value);
  if (props.chartOption.autoPlay) {
    var count = 0;
    var dataLength = props.chartData.source.length;

    function highlight() {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
      });
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: count % dataLength,
      });
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: count % dataLength,
      });
      count++;
    }
    highlight();
    tooltipIntervalRef.value = setInterval(function () {
      highlight();
    }, props.chartOption.interval);

    myChart.on('mouseover', function (params) {
      tooltipIntervalRef.value && clearInterval(tooltipIntervalRef.value);
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
      });
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
    });
    myChart.on('mouseout', function (params) {
      tooltipIntervalRef.value && clearInterval(tooltipIntervalRef.value);
      tooltipIntervalRef.value = setInterval(function () {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
        });
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: count % dataLength,
        });
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: count % dataLength,
        });
        count++;
      }, props.chartOption.interval);
    });
  } else {
    myChart.dispatchAction({
      type: 'hideTip',
    });
    myChart.off('mouseover');
    myChart.off('mouseout');
  }
}
</script>

<template>
  <div :id="id" class="chartBox" />
</template>

<style scoped>
.chartBox {
  width: 100%;
  height: 100%;
}
</style>
