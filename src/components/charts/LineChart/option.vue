<script setup lang="jsx">
import { computed, defineProps } from 'vue';

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
</template>

<style scoped></style>
