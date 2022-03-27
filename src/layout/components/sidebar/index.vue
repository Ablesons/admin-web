<!--
 * @Description: 左侧导航
 * @Author: DHL
 * @Date: 2021-12-10 11:47:57
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-07 08:50:21
-->

<template>
  <div :class="{ 'has-logo': showLogo }" class="sidebar-wrapper">
    <SidebarLogo v-if="showLogo" :collapse="isCollapse" />

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="menuBg"
        :text-color="menuText"
        :active-text-color="menuActiveText"
      >
        <sidebar-item v-for="item in menus" :key="`si_${item.id}`" :item="item"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useAppStore } from '/@/store/modules/app';
  import { useSettingStore } from '/@/store/modules/setting';
  import { useRoute } from 'vue-router';
  import { usePermissionStore } from '/@/store/modules/permission';
  import SidebarLogo from './sidebarLogo.vue';
  import SidebarItem from './sidebarItem.vue';

  const settingStore = useSettingStore();
  const appStore = useAppStore();
  const permissionStore = usePermissionStore();
  const route = useRoute();

  const showLogo = computed(() => {
    return settingStore.getShowSidebarLogo;
  });

  const isCollapse = computed(() => {
    return !appStore.sidebar.opened;
  });

  const menuBg = computed(() => {
    return appStore.sidebar.menuBg;
  });

  const menuText = computed(() => {
    return appStore.sidebar.menuText;
  });

  const menuActiveText = computed(() => {
    return appStore.sidebar.menuActiveText;
  });

  const activeMenu = computed(() => {
    const { meta, name } = route;
    if (meta !== null || meta !== undefined) {
      if (meta.activeMenu) {
        return meta.activeMenu as any;
      }
    }
    return name;
  });

  /**
   * 菜单集合
   */
  const menus = computed(() => {
    return permissionStore.getMenuTree;
  });
</script>

<style scoped lang="scss">
  .sidebar-wrapper {
    background-color: var(--menuBg);

    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }

    .scrollbar-wrapper {
      overflow-x: hidden;
    }

    .el-scrollbar__view {
      height: 100%;
    }

    .el-scrollbar__bar {
      &.is-vertical {
        right: 0px;
      }

      &.is-horizontal {
        display: none;
      }
    }
  }

  .el-scrollbar {
    height: 100%;
  }

  .has-logo {
    .el-scrollbar {
      height: calc(100vh - 50px);
    }
  }

  .el-menu {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
