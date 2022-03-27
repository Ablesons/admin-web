<!--
 * @Description: TW 布局组件
 * @Author: DHL
 * @Date: 2021-12-24 08:58:33
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-23 15:47:41
-->

<template>
  <section class="tw-layout-wrapper">
    <toolbar ref="toolbarRef" :more-btns-width="moreBtnsWidth" @foldClick="hanldeFold">
      <slot name="btns"></slot>
    </toolbar>

    <el-divider class="toolbar-divider"></el-divider>

    <div v-show="headerOpened" ref="headerRef" class="header-wrapper">
      <slot name="header"></slot>
    </div>

    <div class="mian-wrapper" :style="{ height: `calc(100vh - ${subHeight}px)` }">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, ref } from 'vue';
  import toolbar from './components/toolbar.vue';

  /**
   * 更多按钮布局
   */
  defineProps({
    moreBtnsWidth: {
      type: Number,
      default: 90,
    },
  });

  /**
   * 数据表格默认减掉高度
   */
  const subHeight = ref(137);

  /**
   * 工具条容器
   */
  const toolbarRef = ref();

  /**
   * 工具条容器高度
   */
  const toolbarHeight = ref(0);

  /**
   * 是否展开头部
   */
  const headerOpened = ref(true);

  /**
   * 头部容器
   */
  const headerRef = ref(null);

  /**
   * 头部容器高度
   */
  const headerHeight = ref(0);

  //////////////////////////////////////////////////
  // 生命周期
  //////////////////////////////////////////////////
  onMounted(() => {
    nextTick(() => {
      toolbarHeight.value = toolbarRef.value?.getToolbarHeight();

      const headerElement: HTMLDivElement = headerRef.value as any;
      headerHeight.value = headerElement.offsetHeight;

      hanldeFold(true);
    });
  });

  //////////////////////////////////////////////////
  // 函数
  //////////////////////////////////////////////////
  /**
   * 查询表单折叠事件
   */
  function hanldeFold(opened: boolean) {
    headerOpened.value = opened;

    if (opened) {
      subHeight.value = toolbarHeight.value + headerHeight.value + 137;
    } else {
      subHeight.value = toolbarHeight.value + 137;
    }
  }
</script>
