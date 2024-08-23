<script setup>
import { defineProps } from 'vue';
import BaseMap from '@/components/Charts/BaseMap/index.vue';

defineProps({
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
</script>

<template>
  <BaseMap
    :id="id"
    :width="width"
    :height="height"
    :chart-option="chartOption"
    :chart-data="chartData"
  />
</template>

<style scoped>
</style>
