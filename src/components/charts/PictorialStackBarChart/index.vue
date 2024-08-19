<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, nextTick, onMounted, onUnmounted, watch, ref } from 'vue';
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

function processData(data, sortIndex, maxValue) {
  const xAxisLabel = props.chartData.dimensions[0];
  const newData = data.map((item) => {
    let total = 0;
    const newItem = {};

    sortIndex.forEach((key) => {
      total += item[key];
      newItem.actualItem = item;
      newItem[key] = total;
      newItem[xAxisLabel] = item[xAxisLabel];
      newItem.max = maxValue;
    });

    return newItem;
  });

  return newData;
}

function getArrMax(arr = []) {
  const xAxisLabel = props.chartData.dimensions[0];
  const maxTotal = arr.reduce((max, item) => {
    let total = 0;

    Object.keys(item).forEach((key) => {
      if (key !== xAxisLabel) {
        total += item[key];
      }
    });

    return Math.max(max, total);
  }, 0);
  return maxTotal;
}

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
  const maxValue = getArrMax(props.chartData.source);
  const sortIndex = props.chartData.dimensions.slice(1);
  const chartData = processData(props.chartData.source, sortIndex, maxValue);

  const seriesMapArr = props.chartOption?.seriesMap?.map((item, index) => ({
    ...item,
    ...props.chartOption.series[index],
    name: item.desc,
    color: index === 0 ? 'rgba(215, 246, 255,0.2)' : props.chartOption.color[index - 1],
    data: chartData.map((i) => {
      const dealData = {
        name: item.desc,
        value: Number(i[item.code]),
      };

      return {
        name: dealData.name,
        value: dealData?.value,
        itemValue: i,
      };
    }),
  }));

  const option = {
    ...props.chartOption,
    // 图例
    legend: {
      ...props.chartOption.legend,
      data: seriesMapArr?.filter((item) => item?.name !== '背景').map((item) => item.desc),
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: (params) => {
        let str = `${params[0].axisValue}<br/>`;
        params.map((item) => {
          if (item?.name !== '背景') {
            const itemCode = seriesMapArr.find((v) => v?.desc === item?.name);
            const actualValue = item?.data?.itemValue?.actualItem?.[itemCode?.code];
            str += `${item.marker} ${item.name} <span style="color:${item.color}">${
              actualValue || 0
            }</span><br/>`;
          }
          return item;
        });
        return str;
      },
    },
    xAxis: {
      ...props.chartOption.xAxis,
      data: chartData.map((item) => item[props.chartData.dimensions[0]]),
    },
    yAxis: {
      ...props.chartOption.yAxis,
      max: maxValue,
    },
    series: seriesMapArr,
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
