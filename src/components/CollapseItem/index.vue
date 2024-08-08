<script setup lang="ts">
// eslint-disable-next-line vue/define-props-declaration
defineProps({
  name: {
    type: String,
    required: true,
  },
  expanded: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const click = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
};
</script>

<template>
  <NCollapse arrow-placement="right" :default-expanded-names="expanded ? name : null" accordion>
    <!-- 右侧 -->
    <template #header-extra>
      <div @click="click">
        <slot name="header" />
      </div>
    </template>

    <NCollapseItem :title="name" :name="name">
      <slot />
    </NCollapseItem>
  </NCollapse>
  <NDivider />
</template>
