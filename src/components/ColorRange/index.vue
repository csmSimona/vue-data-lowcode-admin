<script setup>
import { defineProps, ref } from 'vue';
import { MinusCircleOutlined, PlusCircleOutlined } from '@vicons/antd';

const props = defineProps({
  color: {
    type: [String, Number],
  },
  dataLength: {
    type: Number,
  },
});

const emit = defineEmits(['update:color']);

const currentColor = ref(props.color);

// 新增颜色
const addColor = (index) => {
  currentColor.value.splice(index + 1, 0, '#ffffff');
};
// 删除颜色
const delColor = (index) => {
  currentColor.value?.length > props.dataLength && currentColor.value.splice(index, 1);
  emit('update:color', currentColor.value);
};
</script>

<template>
  <div class="flex flex-col w-full gap-[10px]">
    <div v-for="(item, index) in currentColor" :key="index" class="flex items-center">
      <NColorPicker v-model:value="currentColor[index]" class="mr-[6px]" />
      <n-icon
        :component="MinusCircleOutlined"
        @click="delColor(index)"
        class="action-icon"
        :style="{
          cursor: color?.length > dataLength ? 'pointer' : 'not-allowed',
        }"
      />
      <n-icon :component="PlusCircleOutlined" @click="addColor(index)" class="action-icon" />
    </div>
  </div>
</template>

<style scoped>
.action-icon {
  cursor: pointer;
  margin-left: 3px;
  font-size: 16px;
}
</style>