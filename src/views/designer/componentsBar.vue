<script setup lang="jsx">
import { ChartList } from '@/components/charts';
import { useChartEditStore } from '@/store/modules/chartEditStore';
const chartEditStore = useChartEditStore();

function dragStart(_, item) {
  chartEditStore.setDragData(item);
}
</script>

<template>
  <div class="w-200px">
    <NTabs default-value="signin" size="large" justify-content="space-evenly">
      <NTabPane name="signin" tab="组件" class="configPaneWrapper">
        <!-- TODO 组件库样式修改 -->
        <div v-for="item in ChartList" :key="item.chartKey">
          <NButton draggable="true" @dragstart="e => dragStart(e, item)">{{ item.chartName }}</NButton>
        </div>
      </NTabPane>
      <NTabPane name="signup" tab="图层" class="configPaneWrapper">图层图层图层图层</NTabPane>
    </NTabs>
  </div>
</template>

<style scoped lang="scss">
.configPaneWrapper {
  padding: 15px !important;
  height: calc(100vh - 100px);
  overflow-y: auto;

  /* firefox */
  scrollbar-color: rgba(144, 146, 152, 0.3) transparent;
  scrollbar-width: thin;

  /* chrome */
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(144, 146, 152, 0.3);
  }
  // 修复右下角白点用的
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
</style>
