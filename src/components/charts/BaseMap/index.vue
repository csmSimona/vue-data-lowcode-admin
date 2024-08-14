<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, nextTick, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';
import { useMessage } from 'naive-ui';
// import textureImg from "@/assets/texture.webp";

const message = useMessage();

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

// 投影地图
// const isRotateMap = false;

// const mapProject = (point) => {
//   return [0.5 * point[0] + 0.5 * point[1], -0.4 * point[1] + 0.2 * point[0]];
// };

// const mapUnproject = (point) => {
//   return [point[0], point[1]];
// };

// 加载图表配置和数据
async function loadChart() {
  // 注册地图
  const newMapJson = await getMapJson(props.chartOption.mapName);
  echart.registerMap(props.chartOption.mapName, newMapJson);

  const option = {
    title: {
      show: props.chartOption.showTitle,
      text: props.chartOption.seriesName,
      left: props.chartOption.titleX,
      top: props.chartOption.titleY,
      textStyle: {
        fontSize: props.chartOption.titleFontSize,
        color: props.chartOption.titleColor,
      },
    },
    tooltip: {
      show: props.chartOption.showTooltip,
      backgroundColor: props.chartOption.tooltipBg,
      textStyle: {
        color: props.chartOption.tooltipColor,
      },
    },
    visualMap: {
      show: props.chartOption.showLegend,
      orient: props.chartOption.legendOrient,
      type: props.chartOption.legendType,
      top: props.chartOption.legendY,
      left: props.chartOption.legendX,
      showLabel: true,
      textStyle: {
        color: props.chartOption.legendTextColor,
      },
      pieces: props.chartOption.pieces,
      calculable: false,
      inRange: {
        color: props.chartOption.colorRange,
        symbolSize: [30, 100],
      },
    },
    geo: {
      map: props.chartOption.mapName,
      zoom: props.chartOption.zoom,
      label: {
        normal: {
          show: props.chartOption.showLabel,
          fontSize: props.chartOption.labelFontSize,
          color: props.chartOption.labelColor,
        },
      },
      itemStyle: {
        normal: {
          borderColor: props.chartOption.borderColor,
        },
        emphasis: {
          areaColor: props.chartOption.emphasisAreaColor,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          borderWidth: 0,
        },
      },
      // 投影相关
      // projection: isRotateMap
      //   ? {
      //       project: (point) => mapProject(point),
      //       unproject: (point) => mapUnproject(point),
      //     }
      //   : null,
    },
    series: [
      {
        name: props.chartOption.seriesName,
        type: 'map',
        geoIndex: 0,
        data: props.chartData.dataList,
      },
    ],
  };

  myChart.setOption(option);
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
