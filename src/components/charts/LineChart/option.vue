<script setup lang="jsx">
import { computed, defineProps } from 'vue';
import CollapseItem from '@/components/CollapseItem/index.vue';

const props = defineProps({
  config: {
    type: Object,
    default: () => {}
  }
});

const chartConfig = computed(() => {
  return props.config;
});
</script>

<template>
  <CollapseItem name="容器">
    <NFormItemRow label="距离(上)" path="top">
      <NInputNumber v-model:value="chartConfig.grid.top" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="距离(右)" path="right">
      <NInputNumber v-model:value="chartConfig.grid.right" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="距离(下)" path="bottom">
      <NInputNumber v-model:value="chartConfig.grid.bottom" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="距离(左)" path="left">
      <NInputNumber v-model:value="chartConfig.grid.left" class="w-full" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="X轴">
    <template #header>
      <NSwitch v-model:value="chartConfig.xAxisShow" size="small"></NSwitch>
    </template>

    <NFormItemRow label="展示轴线" path="xLineShow">
      <NSwitch v-model:value="chartConfig.xLineShow" />
    </NFormItemRow>

    <NFormItemRow label="轴线颜色" path="xLineColor">
      <NColorPicker v-model:value="chartConfig.xLineColor" />
    </NFormItemRow>

    <NFormItemRow label="展示网格线" path="xGridLineShow">
      <NSwitch v-model:value="chartConfig.xGridLineShow" />
    </NFormItemRow>

    <NFormItemRow label="展示刻度线" path="xTickShow">
      <NSwitch v-model:value="chartConfig.xTickShow" />
    </NFormItemRow>

    <NFormItemRow label="展示标签" path="xLabelShow">
      <NSwitch v-model:value="chartConfig.xLabelShow" />
    </NFormItemRow>

    <NFormItemRow label="标签颜色" path="xLabelColor">
      <NColorPicker v-model:value="chartConfig.xLabelColor" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="Y轴">
    <template #header>
      <NSwitch v-model:value="chartConfig.yAxisShow" size="small"></NSwitch>
    </template>

    <NFormItemRow label="展示轴线" path="yLineShow">
      <NSwitch v-model:value="chartConfig.yLineShow" />
    </NFormItemRow>

    <NFormItemRow label="轴线颜色" path="yLineColor">
      <NColorPicker v-model:value="chartConfig.yLineColor" />
    </NFormItemRow>

    <NFormItemRow label="展示网格线" path="yGridLineShow">
      <NSwitch v-model:value="chartConfig.yGridLineShow" />
    </NFormItemRow>

    <NFormItemRow label="展示刻度线" path="yTickShow">
      <NSwitch v-model:value="chartConfig.yTickShow" />
    </NFormItemRow>

    <NFormItemRow label="展示标签" path="yLabelShow">
      <NSwitch v-model:value="chartConfig.yLabelShow" />
    </NFormItemRow>

    <NFormItemRow label="标签颜色" path="yLabelColor">
      <NColorPicker v-model:value="chartConfig.yLabelColor" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="折线图">
    <NFormItemRow label="折线颜色" path="lineColor">
      <NColorPicker v-model:value="chartConfig.lineColor" />
    </NFormItemRow>
    <NFormItemRow label="平滑展示" path="smooth">
      <NRadioGroup v-model:value="chartConfig.smooth" name="radiogroup">
        <NSpace>
          <NRadio :value="true">是</NRadio>
          <NRadio :value="false">否</NRadio>
        </NSpace>
      </NRadioGroup>
    </NFormItemRow>
  </CollapseItem>
</template>

<style scoped></style>
