<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, nextTick, onMounted, onUnmounted, watch, ref } from 'vue';
import * as echarts from 'echarts';

const pieIntervalRef = ref(null);

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
  const option = {
    color: props.chartOption.pieColor,
    title: {
      show: props.chartOption.showTitle,
      text: props.chartOption.text,
      left: props.chartOption.titleX,
      top: props.chartOption.titleY,
      textStyle: {
        fontSize: props.chartOption.titleFontSize,
        color: props.chartOption.titleColor,
      },
      subtext: props.chartOption.subtext,
      // 副标题文本样式设置
      subtextStyle: {
        fontSize: props.chartOption.subtextFontSize,
        color: props.chartOption.subtextColor,
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: props.chartOption.showLegend,
      orient: props.chartOption.legendOrient,
      icon: props.chartOption.legendIcon,
      x: props.chartOption.legendX,
      y: props.chartOption.legendY,
      textStyle: {
        color: props.chartOption.legendTextColor,
        fontSize: props.chartOption.legendFontSize,
      },
    },
    series: [
      {
        name: props.chartOption.chartTitle,
        type: 'pie',
        startAngle: props.chartOption.startAngle,
        roseType: props.chartOption.roseType === 'false' ? false : props.chartOption.roseType,
        radius: [props.chartOption.radiusInside + '%', props.chartOption.radiusOutside + '%'],
        label: {
          show: props.chartOption.labelPosition !== 'center',
          position: props.chartOption.labelPosition,
          fontSize: props.chartOption.labelFontSize,
          color: props.chartOption.labelColor,
          // formatter: '{d_style|{c}}\n\n{b_style|{b}}',
          formatter:
            props.chartOption.labelShowType === 'name'
              ? '{b}'
              : props.chartOption.labelShowType === 'data'
              ? '{c}\n\n{b}'
              : '{d}%\n\n{b}',
          // rich: {
          //   d_style: {
          //     fontSize: 18,
          //     color: '#fff',
          //   },
          //   b_style: {
          //     fontSize: props.chartOption.labelFontSize,
          //     color: props.chartOption.labelColor,
          //   },
          // },
        },
        itemStyle: {
          borderRadius: props.chartOption.borderRadius,
          borderColor: props.chartOption.borderColor,
          borderWidth: props.chartOption.borderWidth,
        },
        data: props.chartData.data,
        emphasis: {
          label: {
            show: true,
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(255, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  myChart.setOption(option);

  // 自动轮播
  if (pieIntervalRef.value) clearInterval(pieIntervalRef.value);
  if (props.chartOption.autoPlay) {
    let currentIndex = -1; // 当前高亮图形在饼图数据中的下标

    const highlightPie = () => {
      // 取消所有高亮并高亮当前图形
      // 遍历饼图数据，取消所有图形的高亮效果
      for (var idx in props.chartData.data) {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: idx,
        });
      }
      // 高亮当前图形
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });

      // 显示tooltip
      if (props.chartOption.showTooltip) {
        myChart.dispatchAction({
          type: 'hideTip',
        });
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
      } else {
        myChart.dispatchAction({
          type: 'hideTip',
        });
      }
    };
    const selectPie = () => {
      // 高亮效果切换到下一个图形
      var dataLen = props.chartData.data.length;
      currentIndex = (currentIndex + 1) % dataLen;
      highlightPie();
    };
    selectPie();

    pieIntervalRef.value = setInterval(selectPie, props.chartOption.interval); // 设置自动切换高亮图形的定时器

    myChart.on('mouseover', (params) => {
      // 用户鼠标悬浮到某一图形时，停止自动切换并高亮鼠标悬浮的图形
      clearInterval(pieIntervalRef.value);
      currentIndex = params.dataIndex;
      highlightPie();
    });

    myChart.on('mouseout', () => {
      // 用户鼠标移出时，重新开始自动切换
      if (pieIntervalRef.value) clearInterval(pieIntervalRef.value);
      pieIntervalRef.value = setInterval(selectPie, props.chartOption.interval);
    });
  } else {
    // 遍历饼图数据，取消所有图形的高亮效果
    for (var idx in props.chartData.data) {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: idx,
      });
    }
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
