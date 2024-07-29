<script setup lang="jsx">
import { ref, watch } from 'vue';
import { useChartEditStore } from '@/store/modules/chartEditStore';
import MonacoEditor from '@/components/MonacoEditor/index.vue';
import CanvasConfig from './components/canvasConfig.vue';

const editJson = ref('');
const monacoEditRef = ref();

const chartEditStore = useChartEditStore();
const { selectComponent } = chartEditStore;
const { canvasConfig } = chartEditStore.designData;

watch(
  () => selectComponent.value?.chartData,
  () => {
    editJson.value = JSON.stringify(selectComponent.value.chartData, null, 2);
  }
);
const updateComponentData = () => {
  selectComponent.value.chartData = JSON.parse(editJson.value);
};
</script>

<template>
  <div class="w-300px">
    <NTabs v-show="!selectComponent?.value?.id" default-value="canvas" size="large" justify-content="space-evenly">
      <NTabPane name="canvas" tab="大屏配置" class="configPaneWrapper"><CanvasConfig /></NTabPane>
    </NTabs>

    <NTabs v-if="selectComponent?.value?.id" default-value="chart" size="large" justify-content="space-evenly">
      <NTabPane name="chart" tab="图表" class="configPaneWrapper">
        <NForm label-placement="left" label-width="100" :model="selectComponent.value">
          <NFormItemRow label="名称" path="name">
            <NInput v-model:value="selectComponent.value.chartName" />
          </NFormItemRow>
          <NFormItemRow label="宽度" path="width">
            <NInputNumber
              v-model:value="selectComponent.value.width"
              :min="50"
              :max="canvasConfig.width"
              class="w-full"
            />
          </NFormItemRow>
          <NFormItemRow label="高度" path="height">
            <NInputNumber
              v-model:value="selectComponent.value.height"
              :min="50"
              :max="canvasConfig.height"
              class="w-full"
            />
          </NFormItemRow>
          <NFormItemRow label="坐标x" path="x">
            <NInputNumber v-model:value="selectComponent.value.x" :min="0" :max="canvasConfig.width" class="w-full" />
          </NFormItemRow>
          <NFormItemRow label="坐标y" path="y">
            <NInputNumber v-model:value="selectComponent.value.y" :min="0" :max="canvasConfig.height" class="w-full" />
          </NFormItemRow>
          <!-- 各图表实例相关配置 -->
          <component :is="selectComponent.value.chartKey + 'Option'" :config="selectComponent.value.chartOption" />
        </NForm>
      </NTabPane>
      <NTabPane name="data" tab="数据" class="configPaneWrapper">
        <MonacoEditor ref="monacoEditRef" v-model:modelValue="editJson" language="json" height="calc(100% - 45px)" />
        <NButton class="mt-10px w-full" size="medium" type="primary" @click="updateComponentData">更新数据</NButton>
        <!-- TODO 另一种获取数据的方式：接口调用 -->
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
