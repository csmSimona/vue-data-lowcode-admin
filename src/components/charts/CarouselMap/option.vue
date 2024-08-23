<script setup lang="jsx">
import { defineProps } from 'vue';
import BaseMapOption from '@/components/Charts/BaseMap/option.vue';

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
  <BaseMapOption :id="id" :config="config" :data="data" />
</template>

<style scoped></style>
