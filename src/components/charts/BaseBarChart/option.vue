<script setup lang="jsx">
import { computed, defineProps } from 'vue';
import CollapseItem from '@/components/CollapseItem/index.vue';
import PositionRange from '@/components/PositionRange/index.vue';

const props = defineProps({
  config: {
    type: Object,
    default: () => {}
  },
  data: {
    type: Object,
    default: () => {},
  },
});

const chartConfig = computed(() => {
  return props.config;
});

const chartData = computed(() => {
  return props.data;
});

const grid = computed(() => {
  return props.config.grid;
});

const title = computed(() => {
  return props.config.title;
});

const legend = computed(() => {
  return props.config.legend;
});

const xAxis = computed(() => {
  return props.config.xAxis;
});

const yAxis = computed(() => {
  return props.config.yAxis;
});

const seriesConfig = computed(() => {
  return props.config.seriesConfig
})

const color = computed(() => {
  return props.config.color
})

// 图例布局方式
const legendOrientOptions = [
  {
    label: '横向',
    value: 'horizontal',
  },
  {
    label: '纵向',
    value: 'vertical',
  },
];

// 图例形状
const legendIconOptions = [
  {
    label: '圆形',
    value: 'circle',
  },
  {
    label: '矩形',
    value: 'rect',
  },
  {
    label: '圆角矩形',
    value: 'roundRect',
  },
  {
    label: '三角形',
    value: 'triangle',
  },
  {
    label: '菱形',
    value: 'diamond',
  },
];
</script>

<template>
  <NFormItemRow label="排列方向">
    <n-radio-group v-model:value="chartConfig.orient">
      <n-radio-button
        v-for="option in legendOrientOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </n-radio-button>
    </n-radio-group>
  </NFormItemRow>

  <CollapseItem name="距离">
    <NFormItemRow label="距离(上)">
      <NInputNumber v-model:value="grid.top" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="距离(下)">
      <NInputNumber v-model:value="grid.bottom" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="距离(左)">
      <NInputNumber v-model:value="grid.left" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="距离(右)">
      <NInputNumber v-model:value="grid.right" class="w-full" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="标题">
    <template #header>
      <NSwitch v-model:value="title.show" size="small" />
    </template>

    <NFormItemRow label="文本">
      <NInput v-model:value="title.text" />
    </NFormItemRow>
    <NFormItemRow label="标题位置(X)">
      <PositionRange v-model:position="title.left" type="x" />
    </NFormItemRow>
    <NFormItemRow label="标题位置(Y)">
      <PositionRange v-model:position="title.top" type="y" />
    </NFormItemRow>
    <NFormItemRow label="标题颜色">
      <NColorPicker v-model:value="title.textStyle.color" />
    </NFormItemRow>
    <NFormItemRow label="标题字号">
      <NInputNumber v-model:value="title.textStyle.fontSize" :min="10" class="w-full" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="图例">
    <template #header>
      <NSwitch v-model:value="legend.show" size="small" />
    </template>
    <NFormItemRow label="图例布局方式">
      <NSelect v-model:value="legend.orient" :options="legendOrientOptions" />
    </NFormItemRow>
    <NFormItemRow label="图例形状">
      <NSelect v-model:value="legend.icon" :options="legendIconOptions" />
    </NFormItemRow>
    <NFormItemRow label="图例位置(X)">
      <PositionRange v-model:position="legend.x" type="x" />
    </NFormItemRow>
    <NFormItemRow label="图例位置(Y)">
      <PositionRange v-model:position="legend.y" type="y" />
    </NFormItemRow>
    <NFormItemRow label="图例文本颜色">
      <NColorPicker v-model:value="legend.textStyle.color" />
    </NFormItemRow>
    <NFormItemRow label="图例字号">
      <NInputNumber v-model:value="legend.textStyle.fontSize" :min="10" class="w-full" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="X轴">
    <template #header>
      <NSwitch v-model:value="xAxis.show" size="small" />
    </template>

    <NFormItemRow label="展示轴线">
      <NSwitch v-model:value="xAxis.axisLine.show" />
    </NFormItemRow>
    <NFormItemRow label="轴线颜色">
      <NColorPicker v-model:value="xAxis.axisLine.lineStyle.color" />
    </NFormItemRow>

    <NFormItemRow label="展示网格线">
      <NSwitch v-model:value="xAxis.splitLine.show" />
    </NFormItemRow>
    <NFormItemRow label="网格线颜色">
      <NColorPicker v-model:value="xAxis.splitLine.lineStyle.color" />
    </NFormItemRow>

    <NFormItemRow label="展示刻度线">
      <NSwitch v-model:value="xAxis.axisTick.show" />
    </NFormItemRow>
    <NFormItemRow label="刻度线颜色">
      <NColorPicker v-model:value="xAxis.axisTick.lineStyle.color" />
    </NFormItemRow>

    <NFormItemRow label="展示标签">
      <NSwitch v-model:value="xAxis.axisLabel.show" />
    </NFormItemRow>
    <NFormItemRow label="标签颜色">
      <NColorPicker v-model:value="xAxis.axisLabel.color" />
    </NFormItemRow>

    <NFormItemRow label="单位">
      <NInput v-model:value="xAxis.name" />
    </NFormItemRow>
    <NFormItemRow label="单位文本颜色">
      <NColorPicker v-model:value="xAxis.nameTextStyle.color" />
    </NFormItemRow>
    <NFormItemRow label="单位文本字号">
      <NInputNumber v-model:value="xAxis.nameTextStyle.fontSize" :min="10" class="w-full" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="Y轴">
    <template #header>
      <NSwitch v-model:value="yAxis.show" size="small" />
    </template>

    <NFormItemRow label="展示轴线">
      <NSwitch v-model:value="yAxis.axisLine.show" />
    </NFormItemRow>
    <NFormItemRow label="轴线颜色">
      <NColorPicker v-model:value="yAxis.axisLine.lineStyle.color" />
    </NFormItemRow>

    <NFormItemRow label="展示网格线">
      <NSwitch v-model:value="yAxis.splitLine.show" />
    </NFormItemRow>
    <NFormItemRow label="网格线颜色">
      <NColorPicker v-model:value="yAxis.splitLine.lineStyle.color" />
    </NFormItemRow>

    <NFormItemRow label="展示刻度线">
      <NSwitch v-model:value="yAxis.axisTick.show" />
    </NFormItemRow>
    <NFormItemRow label="刻度线颜色">
      <NColorPicker v-model:value="yAxis.axisTick.lineStyle.color" />
    </NFormItemRow>

    <NFormItemRow label="展示标签">
      <NSwitch v-model:value="yAxis.axisLabel.show" />
    </NFormItemRow>
    <NFormItemRow label="标签颜色">
      <NColorPicker v-model:value="yAxis.axisLabel.color" />
    </NFormItemRow>

    <NFormItemRow label="单位">
      <NInput v-model:value="xAxis.name" />
    </NFormItemRow>
    <NFormItemRow label="单位文本颜色">
      <NColorPicker v-model:value="xAxis.nameTextStyle.color" />
    </NFormItemRow>
    <NFormItemRow label="单位文本字号">
      <NInputNumber v-model:value="xAxis.nameTextStyle.fontSize" :min="10" class="w-full" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="柱状图">
    <NFormItemRow label="柱子宽度">
      <NInputNumber v-model:value="seriesConfig.barWidth" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="柱间距离">
      <NInputNumber v-model:value="seriesConfig.barGap" class="w-full">
        <template #suffix> % </template>
      </NInputNumber>
    </NFormItemRow>
    <NFormItemRow label="显示柱子背景">
      <NSwitch v-model:value="seriesConfig.showBackground" size="small" />
    </NFormItemRow>
    <NFormItemRow label="柱子背景颜色" v-if="seriesConfig.showBackground">
      <NColorPicker v-model:value="seriesConfig.backgroundStyle.color" />
    </NFormItemRow>
    <NFormItemRow label="柱子圆角">
      <NInputNumber v-model:value="seriesConfig.itemStyle.borderRadius" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="显示文本标签">
      <NSwitch v-model:value="seriesConfig.label.show" size="small" />
    </NFormItemRow>
    <NFormItemRow label="文本颜色">
      <NColorPicker v-model:value="seriesConfig.label.color" />
    </NFormItemRow>
    <NFormItemRow label="文本字号">
      <NInputNumber v-model:value="seriesConfig.label.fontSize" :min="10" class="w-full" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="柱子颜色" v-if="color">
    <ColorRange v-model:color="color" :data-length="chartData?.dimensions.length - 1" />
  </CollapseItem>
</template>

<style scoped></style>
