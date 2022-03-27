<template>
  <div :class="{ show: show }" class="right-panel-container">
    <div class="right-panel-background" />
    <div ref="target" class="right-panel">
      <div class="right-panel-items">
        <div class="project-configuration">
          <h3>项目配置</h3>
          <el-icon title="关闭配置" class="el-icon-close" @click="show = !show">
            <IconOffLine icon="close" />
          </el-icon>
        </div>
        <div style="border-bottom: 1px solid #dcdfe6" />
        <el-divider>主题</el-divider>
        <el-divider>导航栏模式</el-divider>
        <el-divider>界面显示</el-divider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import { emitter } from '/@/utils/mitt';

  let show = ref<Boolean>(false);
  const target = ref(null);
  onClickOutside(target, event => {
    if (event.clientX > target.value.offsetLeft) return;
    show.value = false;
  });
  emitter.on('openPanel', () => {
    show.value = true;
  });
</script>
<style scoped module>
  .isSelect {
    border: 2px solid var(--el-color-primary);
  }
</style>
<style scoped lang="scss">
  .right-panel-background {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }

  .right-panel {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 40000;
    width: 100%;
    height: 100vh;
    max-width: 300px;
    background: #fff;
    transform: translate(100%);
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  }

  .show {
    transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

    .right-panel-background {
      z-index: 20000;
      width: 100%;
      height: 100%;
      opacity: 1;
    }

    .right-panel {
      transform: translate(0);
    }
  }

  .handle-button {
    position: absolute;
    top: 45%;
    left: -48px;
    z-index: 0;
    width: 48px;
    height: 48px;
    font-size: 24px;
    line-height: 48px;
    color: #fff;
    text-align: center;
    pointer-events: auto;
    cursor: pointer;
    background: rgb(24, 144, 255);
    border-radius: 6px 0 0 6px !important;

    i {
      font-size: 24px;
      line-height: 48px;
    }
  }

  .right-panel-items {
    height: 100vh;
    margin-top: 60px;
    overflow: auto;
  }

  .project-configuration {
    position: fixed;
    top: 15px;
    display: flex;
    width: 100%;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;

    i {
      margin-right: 20px;
      font-size: 20px;

      &:hover {
        color: var(--el-color-primary);
        cursor: pointer;
      }
    }
  }

  ::v-deep(.el-divider--horizontal) {
    width: 90%;
    margin: 20px auto 0 auto;
  }

  .setting {
    width: 100%;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 25px;
    }
  }

  ::v-deep(.el-divider__text) {
    font-size: 16px;
    font-weight: 700;
  }
</style>
