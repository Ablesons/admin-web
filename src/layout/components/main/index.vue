<!--
 * @Description: 主页面
 * @Author: DHL
 * @Date: 2021-12-23 13:03:06
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-17 15:00:21
-->
<template>
  <section class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useTagsViewStore } from '/@/store/modules/tagsView';

  const tagsViewStore = useTagsViewStore();

  const cachedViews = computed(() => {
    return tagsViewStore.cachedViews;
  });
</script>

<style scoped lang="scss">
  .app-main {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
