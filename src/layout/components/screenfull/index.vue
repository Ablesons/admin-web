<template>
  <div class="screen-full" @click="toggle">
    <IconSvg
      :title="isFullscreen ? '退出全屏' : '全屏'"
      :icon="isFullscreen ? 'team-iconexit-fullscreen' : 'team-iconfullscreen'"
    />
  </div>
</template>

<script setup lang="ts">
  import { useFullscreen } from '@vueuse/core';

  const { isFullscreen, toggle } = useFullscreen();
</script>

<style scoped lang="scss">
  .screen-full {
    display: flex;
    width: 36px;
    height: 48px;
    align-items: center;
    justify-content: space-around;
  }
</style>
