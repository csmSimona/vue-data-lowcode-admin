<script setup lang="jsx">
import { defineProps } from 'vue';
import BaseLineChartOption from '@/components/Charts/BaseLineChart/option.vue';

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
  <BaseLineChartOption :id="id" :config="config" :data="data" />
</template>

<style scoped></style>
