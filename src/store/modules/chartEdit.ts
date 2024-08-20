import { defineStore } from 'pinia';
import { reactive } from 'vue';
import bg from '@/assets/bg.jpg';

export const useChartEditStore = defineStore('chartEditStore', () => {
  const dragData = reactive({});
  const selectComponent = reactive({});
  const designData = reactive({
    // 画布属性
    canvasConfig: {
      id: undefined,
      name: '首页',
      width: 1920,
      height: 1080,
      backgroundType: 'color',
      backgroundColor: '#232324',
      backgroundImageUrl: bg,
    },
    // 图表数组
    componentList: [],
  });

  function addComponentList(data: any) {
    designData.componentList.push(data);
  }

  function removeComponent(id: number) {
    const index = designData.componentList?.findIndex((item) => item?.id === id);
    if (index !== -1) {
      designData.componentList.splice(index, 1);
    }
  }

  function updateComponent(index: number, data: any) {
    designData.componentList[index] = {
      ...designData.componentList[index],
      ...data,
    };
  }

  return {
    designData,
    dragData,
    selectComponent,
    addComponentList,
    removeComponent,
    updateComponent,
  };
});
