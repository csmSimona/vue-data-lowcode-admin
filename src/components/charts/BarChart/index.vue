<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, nextTick, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  id: {
    type: [Number, String]
  },
  width: {
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 300
  },
  chartOption: {
    type: Object
  },
  chartData: {
    type: Object
  }
});

const echart = echarts;
let chart;

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  chart.dispose();
});

watch(
  () => [props.width, props.height],
  () => {
    nextTick(() => {
      chart.resize();
    });
  }
);

watch(
  [props.chartOption, props.chartData],
  () => {
    nextTick(() => {
      loadChart();
    });
  },
  {
    deep: true
  }
);

// 初始化图表
function initChart() {
  chart = echart.init(document.getElementById(props.id));
  window.onresize = () => {
    // 自适应大小
    chart.resize();
  };
  loadChart();
}

// 加载图表配置和数据
function loadChart() {
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      x: 10,
      y: 30,
      x2: 10,
      y2: 10,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.chartData.xData,
      axisLabel: {
        show: props.chartOption.xLabelShow,
        color: props.chartOption.xLabelColor
      },
      axisLine: {
        show: props.chartOption.xLineShow,
        lineStyle: {
          color: props.chartOption.xLineColor
        }
      },
      axisTick: {
        // x轴刻度线
        show: props.chartOption.xTickShow
      },
      splitLine: {
        // 网格线
        show: props.chartOption.xGridLineShow
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: props.chartOption.yLabelShow,
        color: props.chartOption.yLabelColor
      },
      axisLine: {
        show: props.chartOption.yLineShow,
        lineStyle: {
          color: props.chartOption.yLineColor
        }
      },
      axisTick: {
        // y轴刻度线
        show: props.chartOption.yTickShow
      },
      splitLine: {
        // 网格线
        show: props.chartOption.yGridLineShow
      }
    },
    series: [
      {
        data: props.chartData.yData,
        type: 'bar',
        itemStyle: {
          color: props.chartOption.barColor
        }
      }
    ]
  };
  chart.setOption(option);
}
</script>

<template>
  <div :id="id" class="chartBox"></div>
</template>

<style scoped>
.chartBox {
  width: 100%;
  height: 100%;
}
</style>
