<!--
 * @Description: 侧边栏logo (需要跟随侧边栏折叠)
 * @Author: DHL
 * @Date: 2021-12-16 14:38:35
 * @LastEditors: DHL
 * @LastEditTime: 2021-12-21 15:03:31
-->

<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img src="favicon.ico" class="sidebar-logo" />
      </router-link>

      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="favicon.ico" class="sidebar-logo" />
        <h1 class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useSetting } from '/@/hooks/setting';

  defineProps({
    collapse: {
      type: Boolean,
      default: true,
    },
  });

  const title = ref(useSetting.title);
</script>

<style scoped lang="scss">
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    text-align: center;
    background: #2b2f3a;

    & .sidebar-logo-link {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;

      & .sidebar-logo {
        width: 32px;
        height: 32px;
        margin-right: 12px;
        vertical-align: middle;
      }

      & .sidebar-title {
        display: inline-block;
        margin: 0;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        font-size: 18px;
        font-weight: 600;
        line-height: 50px;
        color: #fff;
        vertical-align: middle;
      }
    }

    &.collapse {
      .sidebar-logo {
        margin-right: 0;
      }
    }
  }
</style>
