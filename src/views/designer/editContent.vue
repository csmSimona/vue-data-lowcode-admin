<script setup lang="jsx">
import { computed, onMounted, ref } from 'vue';
import { useChartEditStore } from '@/store/modules/chartEditStore';
import EditRule from './components/editRule.vue';
import EditResize from './components/editResize.vue';

const chartEditStore = useChartEditStore();
const { dragData, selectComponent } = chartEditStore;
const { canvasConfig, componentList } = chartEditStore.designData;

const editRuleRef = ref();

onMounted(() => {
  // 到时候换成方法：参考 goview componentInstall
  // if(!window['$vue'].component(key) && node) {
  //   console.log('key', key)
  //   window['$vue'].component(key, node)
  // }
});

const canvasScale = computed(() => (editRuleRef.value ? editRuleRef.value.canvasScale : 0.4));

// 组件库组件拖拽放入画布
function drop(e) {
  const newComponent = {
    ...dragData.value,
    x: e.offsetX - dragData.value.width / 2,
    y: e.offsetY - dragData.value.height / 2,
    id: Math.random().toFixed(6).slice(-6)
  };
  chartEditStore.addComponentList(newComponent);
  chartEditStore.setDragData({});
  selectComponent.value = newComponent;
}

// 点击画布空白处
function handleClickBlank() {
  selectComponent.value = {};
  console.log('componentList', componentList)
}

// 选中图表实例
function handleSelectItem(e, item) {
  e.stopPropagation();
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

// 图表实例拖拽移动
function handleMouseDown(e, item, index) {
  const mousemove = event => {
    const x = item.x + (event.clientX - e.clientX) / canvasScale.value;
    const y = item.y + (event.clientY - e.clientY) / canvasScale.value;
    chartEditStore.updateComponent(index, {
      x: Math.round(x),
      y: Math.round(y)
    });
  };

  const mouseup = () => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
  };

  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mouseup', mouseup);
}
</script>

<template>
  <div class="edit-content-wrapper flex-1">
    <EditRule ref="editRuleRef" :width="canvasConfig.width" :height="canvasConfig.height">
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
        @dragover="e => e.preventDefault()"
        @drop="drop"
        @click="handleClickBlank"
      >
        <div
          v-for="(item, index) in componentList"
          :key="item.id"
          class="edit-content-chart"
          :style="{
            top: item.y + 'px',
            left: item.x + 'px',
            width: item.width + 'px',
            height: item.height + 'px'
          }"
          @click="e => handleSelectItem(e, item)"
          @mousedown="e => handleMouseDown(e, item, index)"
        >
          <EditResize :item="item" :i="index" :selected="selectComponent.value?.id === item.id" :scale="canvasScale">
            <div class="activeMask" :class="selectComponent.value?.id === item.id ? 'selectMask' : ''" />
            <div class="toolBox" :class="selectComponent.value?.id === item.id ? 'selectToolBox' : ''">
              <icon-material-symbols-content-copy-outline class="text-icon" @click="e => handleCopy(e, item)" />
              <icon-material-symbols-delete-outline-sharp class="text-icon" @click="e => handleDelete(e, item)" />
            </div>
            <component
              :is="item.chartKey"
              :id="item.id"
              :width="item.width"
              :height="item.height"
              :chart-option="item.chartOption"
              :chart-data="item.chartData"
            />
          </EditResize>
        </div>
      </div>
    </EditRule>
  </div>
</template>

<style scoped>
.edit-content-wrapper {
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  position: relative;
  background: #000;
}
.web-container {
  position: relative;
  overflow: hidden;
}

.edit-content-chart {
  position: absolute;
}

.activeMask {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
  cursor: move;
}

.toolBox {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  display: none;
}

.edit-content-chart:hover .activeMask {
  border: 1px dashed #b6bfce;
}
.selectMask {
  border: 1px solid #b6bfce !important;
}
.edit-content-chart:hover .toolBox,
.selectToolBox {
  display: flex;
}
.text-icon {
  cursor: pointer;
  z-index: 1000;
}
</style>
