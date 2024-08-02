<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useMixMenuContext } from '../../context';
import FirstLevelMenu from './first-level-menu.vue';

const router = useRouter();

defineOptions({
  name: 'HorizontalMixMenu'
});

const { activeFirstLevelMenuKey, setActiveFirstLevelMenuKey } = useMixMenuContext();

function handleSelectMixMenu(menu: App.Global.Menu) {
  setActiveFirstLevelMenuKey(menu.key);

  if (!menu.children?.length) {
    router.push({
      name: menu.routeKey
    });
  }
}
</script>

<template>
  <FirstLevelMenu :active-menu-key="activeFirstLevelMenuKey" @select="handleSelectMixMenu">
    <slot></slot>
  </FirstLevelMenu>
</template>

<style scoped></style>
