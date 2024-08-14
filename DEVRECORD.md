# vue-lowcode-cockpit-admin

基于 Vue3, Vite5, TypeScript, Pinia, NaiveUI 和 tailwindcss 的低代码数据可视化开发平台



管理后台模板基于[naive-ui-admin](https://github.com/jekip/naive-ui-admin)



### 功能梳理

- 大屏列表展示页
- 大屏编辑器
  - 顶部：保存、预览等
  - 左侧：组件库、图层
  - 中间：画布
  - 右侧：背景和组件编辑器

   组件拖拽或双击注册到画布上

- 大屏预览页



### **组件库**

折线图：基础折线图、基础面积图、堆叠折线图、堆叠面积图

柱状图：基础柱状图、横向柱状图、象形堆叠柱状图、折柱混合图

饼图（可轮播）

地图：基础地图、热力图、散点图、飞线、3D柱状图

滚动表格

滚动列表

按钮：配置跳转

边框

文本

滚动数字





### 具体实现

低代码原理：编辑器生成页面JSON数据，服务端负责存取JSON数据，渲染时从服务端取数据JSON交给前端模板处理。 

实现核心：全局注册自定义组件，通过[`<component>`](https://cn.vuejs.org/api/built-in-special-elements.html#component)动态渲染自定义组件



#### 1、大屏设计器布局

tailwindcss 语法查询：https://www.tailwindcss.cn/docs/aspect-ratio

上下结构：头部和内容区域

内容布局：左中右



#### 2、画布标尺

##### 安装

https://github.com/kakajun/vue3-sketch-ruler

```shell
npm install --save vue3-sketch-ruler
```

版本 1.3.15

完成之后突然发现它最近更新版本了到2.x，还没仔细看两个版本的区别，先写死老版本



引用

```typescript
import { SketchRule } from 'vue3-sketch-ruler';
import 'vue3-sketch-ruler/lib/style.css';
```



##### 标尺配置

**editRule.vue**

```javascript
const state = reactive({
  scale: 0.4,
  startX: 0,
  startY: 0,
  // 参考线
  lines: {
    h: [],
    v: [],
    // h: [0, 1920],
    // v: [0, 1080]
  },
  palette: {
    bgColor: '#18181c',
    longfgColor: '#4d4d4d',
    shortfgColor: '#4d4d4d',
    fontColor: '#4d4d4d',
    shadowColor: '#18181c',
    borderColor: '#18181c',
    cornerActiveColor: '#18181c',
  },
  thick: 20,
  isShowRuler: true, // 显示标尺
  isShowReferLine: true, // 显示参考线
});

```



##### 组件

```vue
<template>
  <div class="wrapper">
    <!-- 滑动选择控制缩放比例 -->
    <div class="toolBox">
      <div class="scale">缩放比例:{{ cpuScale }}</div>
      <NSlider
        v-model:value="state.scale"
        :step="step"
        :min="minScale"
        :max="maxScale"
        :on-update-value="scaleChange"
      />
    </div>
    <!-- 标尺 -->
    <SketchRule
      ref="sketchRuleRef"
      :thick="state.thick"
      :scale="state.scale"
      :palette="state.palette"
      :width="width"
      :height="height"
      :start-x="state.startX"
      :start-y="state.startY"
      :shadow="shadow"
      :is-show-refer-line="state.isShowReferLine"
      :lines="state.lines"
    />
    <div id="screens" ref="screensRef" @wheel="handleWheel" @scroll="handleScroll">
      <!-- 可滚动内容区 -->
      <div
        ref="containerRef"
        class="screen-container"
        :style="{
          width: `${width * maxScale}px`,
          height: `${height * maxScale}px`,
        }"
      >
        <!-- 大屏画布：水平垂直居中、元素缩放到相应比例 -->
        <div
          id="canvas"
          :style="{
            width: width + 'px',
            height: height + 'px',
            transform: `scale(${state.scale})`,
          }"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
```



实现点阵背景

```css
.screen-container {
  position: absolute;
  top: 0;
  left: 0;
  /* 实现点阵背景 */
  background: radial-gradient(circle, #5a5a5a 0.5px, #000 0.5px);
  background-size: 15px 15px;
}
```



滚动条居中

```javascript
// 滚动条居中，使可滚动内容区展示最中心位置，即可显示大屏画布
const canvasPosCenter = () => {
  const screensRect = screensRef.value.getBoundingClientRect();
  const containerRect = containerRef.value.getBoundingClientRect();
  screensRef.value.scrollLeft = Math.abs(containerRect.width - screensRect.width) / 2;
  screensRef.value.scrollTop = Math.abs(containerRect.height - screensRect.height) / 2;
};


onMounted(() => {
  canvasPosCenter();
});
```



鼠标滚动监听

```javascript
// 鼠标滚动监听
const handleScroll = () => {
  const screensRect = document.querySelector('#screens').getBoundingClientRect();
  const canvasRect = document.querySelector('#canvas').getBoundingClientRect();
  // 标尺开始的刻度
  const startX = (screensRect.left + state.thick - canvasRect.left) / state.scale;
  const startY = (screensRect.top + state.thick - canvasRect.top) / state.scale;
  state.startX = startX;
  state.startY = startY;
};
```



#### 3、画布动态缩放

使用`transform: scale()`对元素进行缩放（可以看2中贴的代码）

**editRule.vue**

进度条调整缩放

```javascript
// 进度条调整缩放
const scaleChange = (value) => {
  state.scale = Number(value);
  nextTick(() => {
    handleScroll();
    canvasPosCenter();
  });
  if (sketchRuleRef.value.panzoomInstance) {
    const panzoomInstance = sketchRuleRef.value.panzoomInstance;
    panzoomInstance.zoom(state.scale);
  }
};
```



监听设置的大屏宽高自动计算缩放比例

```javascript
// 监听设置的大屏宽高自动计算缩放比例
watch(
  () => [props.width, props.height],
  () => {
    nextTick(() => {
      if (screensRef.value) {
        const screensRect = screensRef.value.getBoundingClientRect();
        const fitWidth = screensRect.width - 100;
        const fitHeight = screensRect.height - 100;

        const scaleWidth = props.width > fitWidth ? fitWidth / props.width : 1;
        const scaleHeight = props.height > fitHeight ? fitHeight / props.height : 1;

        state.scale = Number(Math.min(scaleWidth, scaleHeight).toFixed(2));
      }

      handleScroll();
      canvasPosCenter();
    });
  },
  {
    immediate: true,
  }
);
```



ctrl+鼠标滚动控制缩放值

```javascript
// ctrl+鼠标滚动控制缩放值
const handleWheel = (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    const nextScale = Number.parseFloat(Math.max(minScale, state.scale - e.deltaY / 500).toFixed(2));
    state.scale = nextScale > maxScale ? maxScale : nextScale;
  }
  nextTick(() => {
    handleScroll();
  });
};
```



#### 4、图表组件自定义

##### 组件定义

以折线图为例

```css
├── LineChart
│   ├── config.ts [相关配置]
│   ├── data.json [示例数据]
│   ├── index.vue [图表组件]
│   └── option.vue [图表配置组件]
```



**config.ts** 相关配置文件，渲染时通过该数据进行模板渲染

```typescript
import { commonOption } from '../common';
import chartData from './data.json';

const chartOption = {
  ...commonOption,
  lineColor: '#409eff', // 折线颜色
  smooth: false // 是否平滑展示
};

const chartConfig = {
  chartKey: 'LineChart',
  chartName: '折线图',
  width: 500,
  height: 300,
  chartOption,
  chartData
};

export default chartConfig;
```



##### **全局注册图表及图表配置组件**

plugins/customComponents.ts

```python
import type { App } from 'vue';
import LineChart from '@/components/Charts/LineChart/index.vue';
import BarChart from '@/components/Charts/BarChart/index.vue';

import LineChartOption from '@/components/Charts/LineChart/option.vue';
import BarChartOption from '@/components/Charts/BarChart/option.vue';

/**
 * 全局注册自定义组件
 *
 * @param app
 */
export function setupCustomComponents(app: App) {
  // 注册图表组件
  app.component('LineChart', LineChart);
  app.component('BarChart', BarChart);

  // 注册图表配置组件
  app.component('LineChartOption', LineChartOption);
  app.component('BarChartOption', BarChartOption);
}
```

main.ts

```typescript
import { setupCustomComponents } from '@/plugins';

...
const app = createApp(App);
// 注册全局自定义组件
setupCustomComponents(app);
...
```



#### 5、画布上组件渲染

##### 数据准备

先把折线图组件中的config数据mock一份到designData.componentList中，为在画布上渲染组件做好数据准备

**store/modules/chartEdit.ts**

```typescript
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import bg from '@/assets/bg.jpg';

export const useChartEditStore = defineStore('chartEditStore', () => {
  // 大屏数据
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
      // MOCK
      {
        id: 1,
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

  return {
    designData,
    ...
  };
});

```



##### 自定义组件动态渲染

**editContent.vue**

重点：通过`component`的`is`渲染对应名字的组件

```vue
<script setup lang="jsx">
import { useChartEditStore } from '@/store/modules/chartEdit';

const chartEditStore = useChartEditStore();
const { canvasConfig, componentList } = chartEditStore.designData;
...
</script>

<template>
...
      <!-- 使用canvasConfig设置大屏基本配置 -->
      <div
        class="web-container"
        :style="{
          width: canvasConfig.width + 'px',
          height: canvasConfig.height + 'px',
          background:
            canvasConfig.backgroundType === 'color'
              ? canvasConfig.backgroundColor
              : `url(${canvasConfig.backgroundImageUrl}) no-repeat 100% 100%`,
        }"
           ...
      >
        <!-- 图表数组遍历 -->
        <div
          v-for="(item, index) in componentList"
          :key="item.id"
          class="edit-content-chart"
          <!-- 设置图标实例的位置和尺寸 -->
          :style="{
            top: item.y + 'px',
            left: item.x + 'px',
            width: item.width + 'px',
            height: item.height + 'px',
          }"
             ...
        >
          ...
            <!-- 渲染自定义图标组件 -->
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
</template>
```



#### 6、左侧组件库

Charts/index.ts   集合各自定义图表的配置文件并导出

```typescript
import BarChart from './BarChart/config';
import LineChart from './LineChart/config';
import PieChart from './PieChart/config';
...

export const ChartList = [BarChart, LineChart, PieChart...];
```



对自定义组件列表进行遍历展示

```vue
<n-grid :x-gap="10" :y-gap="10" :cols="2">
  <n-grid-item v-for="item in ChartList" :key="item.chartKey">
    <NButton :style="{ width: '100%' }" ...>
      {{ item.chartName }}
    </NButton>
  </n-grid-item>
</n-grid>
```



#### 7、从组件库拖拽组件到画布上、鼠标双击后渲染到画布上

在组件库按钮上绑定拖拽事件、鼠标双击事件

```vue
<NButton
  draggable="true"
  @dragstart="(e) => dragStart(e, item)"
  @dblclick="dblclickHandle(item)"
  :style="{ width: '100%' }"
>
  {{ item.chartName }}
</NButton>
```



##### 拖拽

1、监听拖拽事件，将对应图表组件的配置数据赋给dragData

注意：这里需要深拷贝

```javascript
function dragStart(_, item) {
  dragData.value = cloneDeep(item);
}
```



2、在大屏对应元素上绑定dragover和drop事件

```vue
<div
     class="web-container"
     ...
     @dragover="(e) => e.preventDefault()"
     @drop="drop"
>
```



3、拖拽结束，添加实例到图表数组

```javascript
// 组件库组件拖拽放入画布
function drop(e) {
  const newComponent = {
    ...dragData.value,
    x: e.offsetX - dragData.value.width / 2,
    y: e.offsetY - dragData.value.height / 2,
    id: Math.random().toFixed(6).slice(-6)
  };
  chartEditStore.addComponentList(newComponent); // 添加实例到图表数组
  dragData.value = {}; // 清空拖拽数据
  selectComponent.value = newComponent; // 更新当前选中的图表实例
}
```



##### 鼠标双击

鼠标双击添加图表实例

```javascript
// 鼠标双击添加图表实例
function dblclickHandle(item) {
  const newItem = {
    ...item,
    x: 0,
    y: 0,
    id: Math.random().toFixed(6).slice(-6)
  };
  chartEditStore.addComponentList(newItem); // 添加实例到图表数组
  selectComponent.value = newItem; // 更新当前选中的图表实例
}
```



#### 8、画布上的图表实例拖拽移动

在遍历组件上绑定mousedown事件

```vue
<div
          v-for="(item, index) in componentList"
          :key="item.id"
          @mousedown="(e) => handleMouseDown(e, item, index)"
     ...
        >
```



**监听鼠标按下和放开事件，计算移动距离**

注意：计算时要考虑缩放比例

```javascript
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
```



#### 9、画布上的图表实例放大缩小

editResize.vue

**定义及渲染8个方向的锚点，并绑定mousedown事件**

```vue
<script setup>
  ...
// 锚点
const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb'];
// 光标朝向
const cursorResize = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se'];
...
</script>

<template>
  <div
    v-for="(point, index) in selected ? pointList : []"
    :key="index"
    :class="`shape-point ${point}`"
    :style="getPointStyle(point, index)"
    @mousedown="handleMouseDown($event, point)"
  />
  <slot />
</template>
```



**监听鼠标按下和放开事件，计算移动距离，从而计算出新尺寸**

注意：计算时要考虑缩放比例

```javascript
// 移动锚点
function handleMouseDown(e, point) {
  e.stopPropagation();
  e.preventDefault();
  const { x, y, width, height } = props.item;

  const mousemove = event => {
    const moveX = (event.clientX - e.clientX) / props.scale;
    const moveY = (event.clientY - e.clientY) / props.scale;

    const isTop = /t/.test(point);
    const isBottom = /b/.test(point);
    const isLeft = /l/.test(point);
    const isRight = /r/.test(point);

    const newWidth = width + (isLeft ? -moveX : isRight ? moveX : 0);
    const newHeight = height + (isTop ? -moveY : isBottom ? moveY : 0);

    const data = {
      width: newWidth > 0 ? Math.round(newWidth) : 0,
      height: newHeight > 0 ? Math.round(newHeight) : 0,
      x: Math.round(x + (isLeft ? moveX : 0)),
      y: Math.round(y + (isTop ? moveY : 0))
    };
    chartEditStore.updateComponent(props.i, data);
  };

  const mouseup = () => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
  };

  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mouseup', mouseup);
}
```



#### 10、右侧画布编辑器



#### 11、右侧图表编辑器

##### 基础配置

名称、定位、尺寸、距离



##### 图表样式编辑

x轴、y轴、图例、提示框、具体图表样式等



同画布中图表组件渲染方式，使用`component`动态渲染图表配置组件

```vue
  <NTabPane name="chart" tab="图表" class="configPaneWrapper">
    <NForm label-placement="left" label-width="100" :model="selectComponent.value">
      <!-- 各图表实例相关配置 -->
      <component
        :is="selectComponent.value.chartKey + 'Option'"
        :config="selectComponent.value.chartOption"
      />
    </NForm>
  </NTabPane>
```



##### 图表数据编辑

**代码编辑器 monaco-editor**

安装

```shell
pnpm add monaco-editor -S

pnpm add vite-plugin-monaco-editor -D
```



**插件引入**

vite.config.ts

```typescript
import monacoEditorPlugin from 'vite-plugin-monaco-editor';


...
return {
  ...
  plugins: [
    ...,
    monacoEditorPlugin({
      languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html'],
      customWorkers: [
        {
          label: 'graphql',
          entry: 'monaco-graphql/dist/graphql.worker'
        }
      ]
    })
  ],
}
...
```



**创建组件**

具体看 components/MonacoEditor



**使用MonacoEditor**

```vue
<NTabPane name="data" tab="数据" class="configPaneWrapper">
  <MonacoEditor
    v-model:modelValue="editJson"
    language="json"
    height="calc(100% - 45px)"
  />
  <NButton class="mt-[10px] w-full" size="medium" type="primary" @click="updateComponentData">更新数据</NButton>
</NTabPane>
```



chartData 传入代码编辑器前需要先转成字符串，更新数据后再转回成对象

```javascript
import { ref, watch } from 'vue';
import { useChartEditStore } from '@/store/modules/chartEdit';
import MonacoEditor from '@/components/MonacoEditor/index.vue';

const editJson = ref('');

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
```





#### 12、大屏预览

注意：还要计算一下比例进行适配



#### 13、图层切换

切换选中图层、复制、删除



##### 使用xicons图标库的图标

Xicons：https://xicons.org/#/

安装对应库

例：使用antd风格的icon

```shell
npm i -D @vicons/antd
```

引入对应的icon组件

```vue
<script>
import { CopyOutlined } from '@vicons/antd';
</script>

<n-icon
  class="text-icon"
  :component="CopyOutlined"
  @click="(e) => handleCopy(e, item)"
/>
```



#### 14、保存

```shell
npm i html2canvas
```

dom转canvas图片并上传



定时保存、ctrl+s保存

```typescript
const saveInterval = 300; // 工作台自动保存间隔（s）

// 定时保存
const intervalDataSyncUpdate = () => {
  // 定时获取数据
  const syncTiming = setInterval(() => {
    handleSave();
  }, saveInterval * 1000);

  // 销毁
  onUnmounted(() => {
    clearInterval(syncTiming);
  });
};

// 监听 ctrl+s 保存事件
const handleEvent = (e: any) => {
  if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    handleSave();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleEvent);
  intervalDataSyncUpdate();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEvent);
});

```



#### 15、大屏缩略图列表展示

普通分页列表展示、大屏缩略图



#### 16、拓展：图表组合 
