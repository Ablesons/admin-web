<script setup lang="ts">
  import { h, reactive, computed, onMounted, defineComponent } from 'vue';
  import { setType } from '/#/layout';
  import { useAppStore } from '/@/store/modules/app';
  import { deviceDetection } from '/@/utils/device';
  import { useSettingStore } from '/@/store/modules/setting';

  // 组件
  import navbar from './components/navbar/index.vue';
  import tag from './components/tag/index.vue';
  import appMain from './components/main/index.vue';
  import setting from './components/setting/index.vue';
  import Vertical from './components/sidebar/vertical.vue';
  import Horizontal from './components/sidebar/horizontal.vue';

  const isMobile = deviceDetection();
  const pureSetting = useSettingStore();

  const set: setType = reactive({
    sidebar: computed(() => {
      return useAppStore().sidebar;
    }),
    device: computed(() => {
      return useAppStore().device;
    }),
    fixedHeader: computed(() => {
      return pureSetting.fixedHeader;
    }),
    classes: computed(() => {
      return {
        hideSidebar: !set.sidebar.opened,
        openSidebar: set.sidebar.opened,
        withoutAnimation: set.sidebar.withoutAnimation,
        mobile: set.device === 'mobile',
      };
    }),
  });

  function toggle(device: string, bool: boolean) {
    useAppStore().toggleDevice(device);
    useAppStore().toggleSideBar(bool, 'resize');
  }

  // 判断是否可自动关闭菜单栏
  let isAutoCloseSidebar = true;

  onMounted(() => {
    if (isMobile) {
      toggle('mobile', false);
    }
  });

  function onFullScreen() {}

  const layoutHeader = defineComponent({
    render() {
      return h(
        'div',
        {
          class: { 'fixed-header': set.fixedHeader },
          style: [set.hideTabs ? 'box-shadow: 0 1px 4px rgb(0 21 41 / 8%);' : ''],
        },
        {
          default: () => [
            !pureSetting.hiddenSideBar ? h(navbar) : h('div'),
            h(
              tag,
              {},
              {
                default: () => [
                  h(
                    'span',
                    { onClick: onFullScreen },
                    {
                      default: () => [!pureSetting.hiddenSideBar ? h('i') : h('i')],
                    }
                  ),
                ],
              }
            ),
          ],
        }
      );
    },
  });
</script>

<template>
  <div v-resize :class="['app-wrapper', set.classes]">
    <div
      v-show="set.device === 'mobile' && set.sidebar.opened"
      class="app-mask"
      @click="useAppStore.toggleSideBar()"
    />
    <Vertical v-show="!pureSetting.hiddenSideBar" />
    <div :class="['main-container', pureSetting.hiddenSideBar ? 'main-hidden' : '']">
      <div v-if="set.fixedHeader">
        <layout-header />
        <!-- 主体内容 -->
        <app-main :fixed-header="set.fixedHeader" />
      </div>
      <el-scrollbar v-else>
        <el-backtop title="回到顶部" target=".main-container .el-scrollbar__wrap">
          <IconSvg icon="backTop" svg />
        </el-backtop>
        <layout-header />
        <!-- 主体内容 -->
        <app-main :fixed-header="set.fixedHeader" />
      </el-scrollbar>
    </div>
    <!-- 系统设置 -->
    <setting />
  </div>
</template>

<style scoped lang="scss">
  @mixin clearfix {
    &::after {
      display: table;
      clear: both;
      content: '';
    }
  }

  .app-wrapper {
    @include clearfix;

    position: relative;
    width: 100%;
    height: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .main-hidden {
    margin-left: 0 !important;
  }

  .app-mask {
    position: absolute;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
  }

  .re-screen {
    margin-top: 12px;
  }
</style>
