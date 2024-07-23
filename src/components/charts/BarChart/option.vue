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
  <NFormItemRow label="柱子颜色" path="barColor">
    <NColorPicker v-model:value="chartConfig.barColor" />
  </NFormItemRow>
</template>

<style scoped></style>
