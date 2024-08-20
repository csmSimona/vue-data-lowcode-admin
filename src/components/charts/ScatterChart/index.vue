<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, nextTick, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

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
  myChart.setOption({
    ...props.chartOption,
    series: new Array(props.chartData?.dimensions?.length - 1).fill(props.chartOption.seriesConfig),
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
