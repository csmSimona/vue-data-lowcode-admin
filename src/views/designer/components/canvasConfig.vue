<script setup lang="jsx">
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useChartEditStore } from '@/store/modules/chartEditStore';

const message = useMessage();
const chartEditStore = useChartEditStore();
const { canvasConfig } = chartEditStore.designData;

const fileList = ref([
  {
    status: 'finished',
    url: canvasConfig.backgroundImageUrl
  }
]);

function updateFileList(value) {
  if (value?.length === 0) {
    fileList.value = undefined;
    canvasConfig.backgroundImageUrl = undefined;
  }
}

// 自定义上传
const customRequest = ({ file, withCredentials, action, onFinish, onError, onProgress }) => {
  const formData = new FormData();
  formData.append(file.name, file.file);
  fetch(action, {
    method: 'POST',
    withCredentials,
    body: formData,
    onUploadProgress: ({ percent }) => {
      onProgress({ percent: Math.ceil(percent) });
    }
  })
    .then(response => response.json())
    .then(({ data }) => {
      // MOCK
      data.url = 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg';
      fileList.value = [
        {
          ...data,
          status: 'finished'
        }
      ];
      canvasConfig.backgroundImageUrl = data?.url;
      onFinish();
    })
    .catch(error => {
      message.error(error.message);
      onError();
    });
};
</script>

<template>
  <NForm label-placement="left" label-width="auto" :model="canvasConfig">
    <NFormItemRow label="名称" path="name">
      <NInput v-model:value="canvasConfig.name" />
    </NFormItemRow>
    <NFormItemRow label="宽度" path="width"><NInputNumber v-model:value="canvasConfig.width" :min="50" /></NFormItemRow>
    <NFormItemRow label="高度" path="height">
      <NInputNumber v-model:value="canvasConfig.height" :min="50" />
    </NFormItemRow>
    <NFormItemRow label="背景应用" path="backgroundType">
      <NRadioGroup v-model:value="canvasConfig.backgroundType" name="radiogroup">
        <NSpace>
          <NRadio value="color">背景颜色</NRadio>
          <NRadio value="image" :disabled="!canvasConfig.backgroundImageUrl">背景图片</NRadio>
        </NSpace>
      </NRadioGroup>
    </NFormItemRow>
    <NFormItemRow label="背景颜色" path="background">
      <NColorPicker v-model:value="canvasConfig.backgroundColor" />
    </NFormItemRow>
    <NFormItemRow label="背景图片">
      <NUpload
        action="https://mock.apipark.cn/m1/1845243-0-default/api/v1/file/upload"
        :file-list="fileList"
        list-type="image-card"
        :max="1"
        :on-update:file-list="updateFileList"
        :custom-request="customRequest"
      />
    </NFormItemRow>
  </NForm>
</template>

<style scoped></style>
