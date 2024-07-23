<script setup lang="jsx">
import Header from './header.vue';
import EditContent from './editContent.vue';
import ConfigBar from './configBar.vue';
import ComponentsBar from './componentsBar.vue';
</script>

<template>
  <div class="designerContainer">
    <!-- 头部 -->
    <Header />
    <!-- 内容 -->
    <div class="designerContentWrapper">
      <ComponentsBar />
      <EditContent />
      <ConfigBar />
    </div>
  </div>
</template>

<style scoped>
.designerContainer {
  height: 100vh;
  background: #fff;
  overflow: hidden;
}
.designerContentWrapper {
  display: flex;
  height: calc(100% - 50px);
}
</style>
