<script setup lang="jsx">
import { defineProps } from 'vue';
import BasePieChartOption from '@/components/Charts/BasePieChart/option.vue';

defineProps({
  config: {
    type: Object,
    default: () => {}
  },
  data: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <BasePieChartOption :id="id" :config="config" :data="data" />
</template>

<style scoped></style>
