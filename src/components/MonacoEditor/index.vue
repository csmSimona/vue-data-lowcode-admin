<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useMonacoEditor } from './index.hook';

const props = withDefaults(
  defineProps<{
    width?: string | number;
    height?: string | number;
    language?: string;
    editorOption?: Object;
    modelValue?: string;
  }>(),
  {
    width: '100%',
    height: '100%',
    language: 'javascript',
    editorOption: () => ({}),
    modelValue: '',
  }
);

const emit = defineEmits<{
  (e: 'blur'): void;
  (e: 'update:modelValue', val: string): void;
}>();

const monacoEditorStyle = computed(() => {
  return {
    width: typeof props.width === 'string' ? props.width : `${props.width}px`,
    height: typeof props.height === 'string' ? props.height : `${props.height}px`,
  };
});

const { monacoEditorRef, createEditor, updateVal, updateOptions, getEditor } = useMonacoEditor(
  props.language
);

onMounted(() => {
  const monacoEditor = createEditor(props.editorOption);
  updateMonacoVal(props.modelValue);
  monacoEditor?.onDidChangeModelContent(() => {
    emit('update:modelValue', monacoEditor!.getValue());
  });
  monacoEditor?.onDidBlurEditorText(() => {
    emit('blur');
  });
});

watch(
  () => props.modelValue,
  () => {
    updateMonacoVal(props.modelValue);
  }
);

function updateMonacoVal(val: string) {
  if (val !== getEditor()?.getValue()) {
    updateVal(val);
  }
}

defineExpose({ updateOptions });
</script>

<template>
  <div ref="monacoEditorRef" :style="monacoEditorStyle" />
</template>
