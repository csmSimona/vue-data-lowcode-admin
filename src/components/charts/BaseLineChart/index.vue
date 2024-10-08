<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, nextTick, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';
import { graphic } from 'echarts/core';

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
function loadChart() {
  const series = new Array(props.chartData?.dimensions?.length - 1).fill(0).map((_, index) => ({
    ...props.chartOption.seriesConfig,
    itemStyle: {
      color: props.chartOption?.color?.[index],
    },
    areaStyle: props.chartOption?.areaColor
      ? {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: props.chartOption?.areaColor?.[index],
            },
            {
              offset: 1,
              color: 'rgba(0,0,0,0)',
            },
          ]),
        }
      : null,
  }));

  myChart.setOption({
    ...props.chartOption,
    series,
    dataset: props.chartData,
  });
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
