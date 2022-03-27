<!--
 * @Description: 全屏组件
 * @Author: DHL
 * @Date: 2022-01-10 20:47:26
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-11 17:19:09
-->

<template>
  <div class="fullscreen" @click="handleFull()">
    <IconSvg :icon="isFullscreen ? 'fullscreenExit' : 'fullscreen'" svg />
  </div>
</template>

<script setup lang="ts">
  import screenfull from 'screenfull';
  import { ref } from 'vue';

  const isFullscreen = ref(false);

  function handleFull() {
    screenfull.toggle();
    isFullscreen.value = !isFullscreen.value;
  }
</script>
<style scoped lang="scss">
  .fullscreen {
    padding: 0 10px;

    .svg-icon {
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>
