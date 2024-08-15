<script setup lang="jsx">
import { computed, defineProps } from 'vue';
import CollapseItem from '@/components/CollapseItem/index.vue';

const props = defineProps({
  config: {
    type: Object,
    default: () => {}
  }
});

const grid = computed(() => {
  return props.config.grid;
});

const xAxis = computed(() => {
  return props.config.xAxis;
});

const yAxis = computed(() => {
  return props.config.yAxis;
});

const seriesList = computed(() => {
  return props.config.series
})
</script>

<template>
  <CollapseItem name="距离">
    <NFormItemRow label="距离（上）">
      <NInputNumber v-model:value="grid.top" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="距离（下）">
      <NInputNumber v-model:value="grid.bottom" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="距离（左）">
      <NInputNumber v-model:value="grid.left" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="距离（右）">
      <NInputNumber v-model:value="grid.right" class="w-full" />
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
  </CollapseItem>

  <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`折线图-${index + 1}`">
    <NFormItemRow label="线条颜色">
      <NColorPicker v-model:value="item.itemStyle.color" />
    </NFormItemRow>
  </CollapseItem>
</template>

<style scoped></style>
