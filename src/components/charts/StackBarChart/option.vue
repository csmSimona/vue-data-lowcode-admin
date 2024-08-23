<script setup lang="jsx">
import { defineProps } from 'vue';
import BaseBarChartOption from '@/components/Charts/BaseBarChart/option.vue';

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
  <BaseBarChartOption :id="id" :config="config" :data="data" />
</template>

<style scoped></style>
