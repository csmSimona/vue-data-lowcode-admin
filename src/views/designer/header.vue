<script setup lang="jsx">
import { useRouterPush } from '@/hooks/common/router';
const { routerPushByKey } = useRouterPush();
</script>

<template>
  <div class="header-wrapper h-50px">
    <NButton @click="routerPushByKey('cockpit-manage_list')">返回</NButton>
    <div>大屏设计器</div>
    <div class="flex gap-4">
      <NButton type="primary">保存</NButton>
      <NButton>预览</NButton>
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
