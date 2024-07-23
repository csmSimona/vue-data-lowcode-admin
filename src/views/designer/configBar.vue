<script setup lang="jsx">
import { useChartEditStore } from '@/store/modules/chartEditStore';
import CanvasConfig from './components/canvasConfig.vue';

const chartEditStore = useChartEditStore();
const { selectComponent } = chartEditStore;
const { canvasConfig } = chartEditStore.designData;
</script>

<template>
  <div class="w-300px">
    <NTabs v-show="!selectComponent?.value?.id" default-value="canvas" size="large" justify-content="space-evenly">
      <NTabPane name="canvas" tab="大屏配置" class="configPaneWrapper"><CanvasConfig /></NTabPane>
    </NTabs>

    <NTabs v-if="selectComponent?.value?.id" default-value="chart" size="large" justify-content="space-evenly">
      <NTabPane name="chart" tab="图表" class="configPaneWrapper">
        <NForm label-placement="left" label-width="auto" :model="selectComponent.value">
          <NFormItemRow label="名称" path="name">
            <NInput v-model:value="selectComponent.value.chartName" />
          </NFormItemRow>
          <NFormItemRow label="宽度" path="width">
            <NInputNumber
              v-model:value="selectComponent.value.width"
              :min="50"
              :max="canvasConfig.width"
              class="w-100%"
            />
          </NFormItemRow>
          <NFormItemRow label="高度" path="height">
            <NInputNumber
              v-model:value="selectComponent.value.height"
              :min="50"
              :max="canvasConfig.height"
              class="w-100%"
            />
          </NFormItemRow>
          <NFormItemRow label="X轴" path="x">
            <NInputNumber v-model:value="selectComponent.value.x" :min="0" :max="canvasConfig.width" class="w-100%" />
          </NFormItemRow>
          <NFormItemRow label="Y轴" path="y">
            <NInputNumber v-model:value="selectComponent.value.y" :min="0" :max="canvasConfig.height" class="w-100%" />
          </NFormItemRow>
          <component :is="selectComponent.value.chartKey + 'Option'" :config="selectComponent.value.chartOption" />
        </NForm>
      </NTabPane>
      <NTabPane name="data" tab="数据" class="configPaneWrapper">
        <NForm label-placement="left" label-width="auto">
          <NFormItemRow label="用户名">
            <NInput />
          </NFormItemRow>
          <NFormItemRow label="密码">
            <NInput />
          </NFormItemRow>
        </NForm>
      </NTabPane>
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
