<script setup lang="jsx">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useChartEditStore } from '@/store/modules/chartEditStore';

const chartEditStore = useChartEditStore();
const { canvasConfig, componentList } = chartEditStore.designData;
const scale = ref(1);

const updateScale = () => {
  // 获取屏幕的宽度和高度
  const fitWidth = window.innerWidth;
  const fitHeight = window.innerHeight;
  const scaleWidth = fitWidth / canvasConfig.width;
  const scaleHeight = fitHeight / canvasConfig.height;
  scale.value = Math.min(scaleWidth, scaleHeight);
};

onMounted(() => {
  window.addEventListener('resize', updateScale);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScale);
});

watch(
  () => [canvasConfig.width, canvasConfig.height],
  () => {
    nextTick(() => {
      updateScale();
    });
  },
  {
    immediate: true
  }
);
</script>

<template>
  <div
    class="edit-content-wrapper"
    :style="{
      background: canvasConfig.backgroundType === 'color' ? canvasConfig.backgroundColor : `transparent`
    }"
  >
    <div
      :style="{
        transform: `scale(${scale})`
      }"
    >
      <div
        class="web-container"
        :style="{
          width: canvasConfig.width + 'px',
          height: canvasConfig.height + 'px',
          background:
            canvasConfig.backgroundType === 'color'
              ? canvasConfig.backgroundColor
              : `url(${canvasConfig.backgroundImageUrl}) no-repeat 100% 100%`
        }"
      >
        <div
          v-for="item in componentList"
          :key="item.id"
          class="edit-content-chart"
          :style="{
            top: item.y + 'px',
            left: item.x + 'px',
            width: item.width + 'px',
            height: item.height + 'px'
          }"
        >
          <component
            :is="item.chartKey"
            :id="item.id"
            :width="item.width"
            :height="item.height"
            :chart-option="item.chartOption"
            :chart-data="item.chartData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-content-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
.web-container {
  position: relative;
  overflow: hidden;
}
.edit-content-chart {
  position: absolute;
}
</style>
