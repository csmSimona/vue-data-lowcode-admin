<script setup lang="tsx">
import { onMounted, onUnmounted, ref } from 'vue';
import throttle from 'lodash/throttle';
import { useRouter } from 'vue-router';
import { useChartEditStore } from '@/store/modules/chartEditStore';
import { createImg } from '@/utils/utils';

const router = useRouter();

const saveInterval = 300; // 工作台自动保存间隔（s）

const loading = ref(false);

const chartEditStore = useChartEditStore();
// const { canvasConfig, componentList } = chartEditStore.designData;

// 保存
const handleSave = throttle(() => {
  const dom = document.querySelector('.web-container');

  if (dom) {
    loading.value = true;
    // dom转图片并上传
    const promise = createImg(dom as HTMLElement, '大屏.jpg', 'upload');
    // 获取图片fileKey
    promise
      .then(data => {
        // TODO 更新缩略图api
        console.log('data', data);
        // PS：缩略图上传失败不影响JSON的保存
        // TODO 更新大屏配置api
        // console.log('str', JSON.stringify(chartEditStore.designData));
        console.log('chartEditStore.designData', chartEditStore.designData);
      })
      .finally(() => {
        loading.value = false;
      });
  }
}, 3000);

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
</script>

<template>
  <div class="header-wrapper h-50px">
    <NButton @click="router.push('/cockpit-manage')">返回</NButton>
    <div>大屏设计器</div>
    <div class="flex gap-4">
      <NButton type="primary" :loading="loading" @click="handleSave">保存</NButton>
      <NButton @click="router.push('/preview')">预览</NButton>
      <NButton>发布</NButton>
    </div>
  </div>
</template>

<style scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid #d9d9d9;
}
</style>
