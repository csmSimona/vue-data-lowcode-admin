<script setup>
import { SketchRule } from 'vue3-sketch-ruler';
import 'vue3-sketch-ruler/lib/style.css';
import { computed, defineExpose, nextTick, onMounted, reactive, ref, toRef, watch } from 'vue';

const props = defineProps({
  width: {
    type: Number,
    default: 1920,
  },
  height: {
    type: Number,
    default: 1080,
  },
});

const step = 0.01;
const minScale = 0.05;
const maxScale = 2;
const sketchRuleRef = ref(null);
const screensRef = ref(null);
const containerRef = ref(null);
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

const shadow = computed(() => {
  return {
    x: 0,
    y: 0,
    width: props.width,
    height: props.height,
  };
});

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

// ctrl+鼠标滚动控制缩放值
const handleWheel = (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    const nextScale = Number.parseFloat(
      Math.max(minScale, state.scale - e.deltaY / 500).toFixed(2)
    );
    state.scale = nextScale > maxScale ? maxScale : nextScale;
  }
  nextTick(() => {
    handleScroll();
  });
};

// 缩放比例
const cpuScale = computed(() => {
  const num = Number(state.scale);
  return Number(num.toFixed(2));
});

// 滚动条居中
const canvasPosCenter = () => {
  const screensRect = screensRef.value.getBoundingClientRect();
  const containerRect = containerRef.value.getBoundingClientRect();
  screensRef.value.scrollLeft = Math.abs(containerRect.width - screensRect.width) / 2;
  screensRef.value.scrollTop = Math.abs(containerRect.height - screensRect.height) / 2;
};

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

onMounted(() => {
  canvasPosCenter();
});

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

defineExpose({
  canvasScale: toRef(state, 'scale'),
});
</script>

<template>
  <div class="wrapper">
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
      <div
        ref="containerRef"
        class="screen-container"
        :style="{
          width: `${width * maxScale}px`,
          height: `${height * maxScale}px`,
        }"
      >
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

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.toolBox {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  background: #fff;
}
#screens {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  user-select: none;
  padding-bottom: 0px;

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

.screen-container {
  position: absolute;
  top: 0;
  left: 0;
  /* 实现点阵背景 */
  background: radial-gradient(circle, #5a5a5a 0.5px, #000 0.5px);
  background-size: 15px 15px;
}

#canvas {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
</style>

<style>
.corner {
  background: #18181c;
}
.line .action {
  color: #fff;
}
</style>
