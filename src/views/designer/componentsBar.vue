<script setup lang="jsx">
import { ChartList } from '@/components/Charts';
import { useChartEditStore } from '@/store/modules/chartEdit';
import {
  CopyOutlined,
  DeleteOutlined
} from '@vicons/antd';
import { cloneDeep } from 'lodash';

const chartEditStore = useChartEditStore();
const { selectComponent, dragData } = chartEditStore;
const { componentList } = chartEditStore.designData;

function dragStart(_, item) {
  dragData.value = cloneDeep(item);
}

// 鼠标双击添加图表实例
function dblclickHandle(item) {
  const newItem = {
    ...item,
    x: 0,
    y: 0,
    id: Math.random().toFixed(6).slice(-6)
  };
  chartEditStore.addComponentList(newItem);
  selectComponent.value = newItem;
}

function updateSelectComponent(item) {
  selectComponent.value = item;
}

// 复制选中图表实例
function handleCopy(e, item) {
  e.stopPropagation();
  const newComponent = {
    ...item,
    x: item.x + item.width / 2,
    y: item.y + item.height / 2,
    id: Math.random().toFixed(6).slice(-6)
  };
  chartEditStore.addComponentList(newComponent);
  selectComponent.value = newComponent;
}

// 删除选中图表实例
function handleDelete(e, item) {
  e.stopPropagation();
  chartEditStore.removeComponent(item.id);
  selectComponent.value = {};
}
</script>

<template>
  <div class="w-[200px]">
    <NTabs default-value="signin" size="large" justify-content="space-evenly">
      <NTabPane name="signin" tab="组件" class="configPaneWrapper">
        <!-- TODO 组件库样式修改 -->
        <n-grid :x-gap="10" :y-gap="10" :cols="2">
          <n-grid-item v-for="item in ChartList" :key="item.chartKey">
            <NButton
              draggable="true"
              @dragstart="(e) => dragStart(e, item)"
              @dblclick="dblclickHandle(item)"
              :style="{
                width: '100%',
                whiteSpace: 'break-spaces',
                lineHeight: '16px',
                fontSize: '12px',
              }"
            >
              {{ item.chartName }}
            </NButton>
          </n-grid-item>
        </n-grid>
      </NTabPane>
      <NTabPane name="signup" tab="图层" class="configPaneWrapper">
        <div v-for="item in componentList" :key="item.id" class="w-full">
          <div
            class="listItem"
            :class="selectComponent.value?.id === item.id ? 'listItemActive' : ''"
            @click="updateSelectComponent(item)"
          >
            <span>
              {{ item.chartName }}
            </span>
            <div class="toolBox">
              <n-icon
                class="text-icon"
                :component="CopyOutlined"
                @click="(e) => handleCopy(e, item)"
              />
              <n-icon
                class="text-icon"
                :component="DeleteOutlined"
                @click="(e) => handleDelete(e, item)"
              />
            </div>
          </div>
        </div>

        <!-- 图层内容 -->
        <NSpace v-if="componentList.length === 0" justify="center">
          <NText>暂无图层</NText>
        </NSpace>
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

.listItem {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.listItem:hover,
.listItemActive {
  background: #eee;
}
.toolBox {
  display: flex;
  align-items: center;
}
</style>
