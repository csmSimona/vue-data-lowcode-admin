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
      backgroundImageUrl: bg
    },
    // 图表数组
    componentList: [
      {
        id: 1,
        chartKey: 'BarChart',
        chartName: '柱状图',
        x: 0,
        y: 0,
        width: 500,
        height: 300,
        chartOption: {
          xAxisShow: true,
          yAxisShow: true,
          xTickShow: true,
          yTickShow: true,
          xGridLineShow: false,
          yGridLineShow: false,
          xLineShow: true,
          yLineShow: true,
          xLabelShow: true,
          yLabelShow: true,
          xLabelColor: '#fff',
          yLabelColor: '#eee',
          xLineColor: '#fff',
          yLineColor: '#eee',
          barColor: '#409eff',
          grid: {
            left: 10,
            top: 20,
            right: 10,
            bottom: 10
          }
        },
        chartData: {
          xData: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          yData: [820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 4321, 4129]
        }
      },
      {
        id: 2,
        chartKey: 'LineChart',
        chartName: '折线图',
        x: 300,
        y: 300,
        width: 500,
        height: 300,
        chartOption: {
          xAxisShow: true,
          yAxisShow: true,
          xTickShow: true,
          yTickShow: true,
          xGridLineShow: false,
          yGridLineShow: false,
          xLineShow: true,
          yLineShow: true,
          xLabelShow: true,
          yLabelShow: true,
          xLabelColor: '#fff',
          yLabelColor: '#eee',
          xLineColor: '#fff',
          yLineColor: '#eee',
          lineColor: '#409eff',
          smooth: false,
          grid: {
            left: 10,
            top: 20,
            right: 10,
            bottom: 10
          }
        },
        chartData: {
          xData: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          yData: [820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 4321, 4129]
        }
      }
    ]
  });

  function setDragData(data) {
    dragData.value = data;
  }

  function addComponentList(data) {
    designData.componentList.push(data);
  }

  function removeComponent(id) {
    const index = designData.componentList.findIndex(item => item.id === id);
    if (index !== -1) {
      designData.componentList.splice(index, 1);
    }
  }

  function updateComponent(index, data) {
    designData.componentList[index] = {
      ...designData.componentList[index],
      ...data
    };
  }

  return {
    designData,
    dragData,
    selectComponent,
    setDragData,
    addComponentList,
    removeComponent,
    updateComponent
  };
});
