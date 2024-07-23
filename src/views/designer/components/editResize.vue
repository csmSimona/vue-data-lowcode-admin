<!-- eslint-disable no-nested-ternary -->
<script setup lang="jsx">
import { useChartEditStore } from '@/store/modules/chartEditStore';

const chartEditStore = useChartEditStore();

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  i: {
    type: Number,
    required: true
  },
  selected: {
    type: Boolean
  },
  scale: {
    type: Number,
    required: true
  }
});

// 锚点
const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb'];
// 光标朝向
const cursorResize = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se'];

// 自定义锚点样式
function getPointStyle(point, index) {
  const { width, height } = props.item;

  const isTop = /t/.test(point);
  const isBottom = /b/.test(point);
  const isLeft = /l/.test(point);
  const isRight = /r/.test(point);

  let newLeft = 0;
  let newTop = 0;

  // 四个角的点
  if (point.length === 2) {
    newLeft = isLeft ? 0 : width;
    newTop = isTop ? 0 : height;
  } else {
    // 上下两点的点，宽度居中
    if (isTop || isBottom) {
      newLeft = width / 2;
      newTop = isTop ? 0 : height;
    }

    // 左右两边的点，高度居中
    if (isLeft || isRight) {
      newLeft = isLeft ? 0 : width;
      newTop = Math.floor(height / 2);
    }
  }

  const style = {
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: `${cursorResize[index]}-resize`
  };

  return style;
}

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
</script>

<template>
  <div
    v-for="(point, index) in selected ? pointList : []"
    :key="index"
    :class="`shape-point ${point}`"
    :style="getPointStyle(point, index)"
    @mousedown="handleMouseDown($event, point)"
  ></div>

  <slot></slot>
</template>

<style scoped lang="scss">
/* 自定义缩放句柄 */
.shape-point {
  z-index: 1001;
  position: absolute;
  width: 7px;
  height: 7px;
  border: 1px solid #b6bfce;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
</style>
