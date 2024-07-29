<script setup lang="ts">
// eslint-disable-next-line vue/define-props-declaration
defineProps({
  name: {
    type: String,
    required: true
  },
  expanded: {
    type: Boolean,
    required: false,
    default: false
  }
});

const click = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
};
</script>

<template>
  <NDivider class="my-10px"></NDivider>
  <NCollapse arrow-placement="right" :default-expanded-names="expanded ? name : null" accordion>
    <!-- 右侧 -->
    <template #header-extra>
      <div @click="click">
        <slot name="header"></slot>
      </div>
    </template>

    <NCollapseItem :title="name" :name="name">
      <slot></slot>
    </NCollapseItem>
  </NCollapse>
</template>
