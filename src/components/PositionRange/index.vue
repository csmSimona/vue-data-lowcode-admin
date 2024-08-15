<script setup>
import { computed, defineProps, ref } from 'vue';
import {
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignBottomOutlined,
  EditOutlined,
} from '@vicons/antd';

const props = defineProps({
  position: {
    type: [String, Number],
  },
  type: {
    type: String,
  },
});

// 图例位置x
const legendPositionXOptions = [
  {
    label: AlignLeftOutlined,
    value: 'left',
  },
  {
    label: AlignCenterOutlined,
    value: 'center',
  },
  {
    label: AlignRightOutlined,
    value: 'right',
  },
  {
    label: EditOutlined,
    value: 'edit',
  },
];

// 图例位置y
const legendPositionYOptions = [
  {
    label: VerticalAlignTopOutlined,
    value: 'top',
  },
  {
    label: VerticalAlignMiddleOutlined,
    value: 'center',
  },
  {
    label: VerticalAlignBottomOutlined,
    value: 'bottom',
  },
  {
    label: EditOutlined,
    value: 'edit',
  },
];

const options = computed(() => {
  return props.type === 'x' ? legendPositionXOptions : legendPositionYOptions;
});

const emit = defineEmits(['update:position']);

const localPosition = ref(props.position);

// 当内部状态改变时触发
function onPositionChange(newPosition) {
  localPosition.value = newPosition;
  emit('update:position', newPosition);
}
</script>

<template>
  <div class="flex flex-col">
    <n-radio-group :value="localPosition" :on-update:value="onPositionChange">
      <n-radio-button
        v-for="option in options"
        :key="option.value"
        :value="option.value === 'edit' ? (isNaN(localPosition) ? 0 : localPosition) : option.value"
      >
        <n-icon :component="option.label" class="text-[14px]" />
      </n-radio-button>
    </n-radio-group>
    <NInputNumber
      v-if="!isNaN(localPosition)"
      :value="localPosition"
      class="w-full mt-[10px]"
      :on-update:value="onPositionChange"
    />
  </div>
</template>
