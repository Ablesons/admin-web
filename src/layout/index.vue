<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />

    <el-container class="app-container">
      <el-aside class="sidebar-container">
        <Sidebar></Sidebar>
      </el-aside>

      <el-container :class="{ hasTagsView: showTagsView }" class="main-container">
        <el-header :class="{ 'fixed-header': fixedHeader }" height="auto">
          <Navbar></Navbar>
          <TagsView v-if="showTagsView"></TagsView>
        </el-header>

        <el-main>
          <MainContent></MainContent>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, onBeforeUnmount, onMounted } from 'vue';
  import { DeviceType, useAppStore } from '../store/modules/app';
  import { useSettingStore } from '../store/modules/setting';
  import { MainContent, Sidebar, Navbar, TagsView } from './components/index';

  //////////////////////////////////////////////////
  // 属性
  //////////////////////////////////////////////////
  const appStore = useAppStore();
  const classObj = computed(() => {
    return {
      hideSidebar: !appStore.sidebar.opened,
      openSidebar: appStore.sidebar.opened,
      mobile: device.value === DeviceType.Mobile,
    };
  });

  const device = computed(() => {
    return appStore.device;
  });
  const sidebar = computed(() => {
    return appStore.sidebar;
  });

  const settingStore = useSettingStore();
  const showTagsView = computed(() => {
    return settingStore.showTagsView;
  });
  const fixedHeader = computed(() => {
    return settingStore.fixedHeader;
  });

  //////////////////////////////////////////////////
  // 生命周期
  //////////////////////////////////////////////////
  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler);
  });

  onMounted(() => {
    resizeMounted();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
  });

  //////////////////////////////////////////////////
  // 监听页面布局
  //////////////////////////////////////////////////
  const WIDTH = 992; // refer to Bootstrap's responsive design
  const isMobile = () => {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  };

  const resizeMounted = () => {
    if (isMobile()) {
      appStore.setDevice(DeviceType.Mobile);
      appStore.setSidebarClosed();
    }
  };

  const resizeHandler = () => {
    if (!document.hidden) {
      appStore.setDevice(isMobile() ? DeviceType.Mobile : DeviceType.Desktop);

      if (isMobile()) {
        appStore.setSidebarClosed();
      }
    }
  };

  //////////////////////////////////////////////////
  // 函数
  //////////////////////////////////////////////////
  /**
   * 折叠侧边栏
   */
  function handleClickOutside() {
    appStore.setSidebarClosed();
  }
</script>

<style scoped lang="scss">
  .app-wrapper {
    width: 100%;
    height: 100%;

    .app-container {
      height: 100%;

      .sidebar-container {
        width: var(--sideBarWidth);
        height: 100%;
        overflow: hidden;
        background-color: #ffffff;
        transition: width 0.28s;

        .horizontal-collapse-transition {
          transition: 0s width ease-in-out, 0s padding-left ease-in-out,
            0s padding-right ease-in-out;
        }
      }

      .main-container {
        min-height: 100%;
        background: #f0f2f5;
        transition: margin-left 0.28s;

        .el-header {
          padding: 0;
        }

        .el-main {
          padding: 10px;
        }
      }
    }

    &.hideSidebar {
      .sidebar-container {
        width: 54px;
      }

      .fixed-header {
        width: calc(100% - 54px);
      }
    }
  }
</style>
