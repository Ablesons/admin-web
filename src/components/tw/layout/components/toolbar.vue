<!--
 * @Description: 头部工具条
 * @Author: DHL
 * @Date: 2021-12-31 08:12:12
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-23 15:50:15
-->
<template>
  <div class="tw-toolbar-wrapper">
    <div ref="toolbarLeftRef" class="toolbar-left">
      <div class="toolbar-left-title">
        <IconSvg icon="finger" class="btns-icon" color="#0099CC" svg />
        <span class="txt">操作按钮:</span>
      </div>
      <div ref="toolbarLeftBtnsRef" class="toolbar-left-btns">
        <slot></slot>
      </div>
      <div class="toolbar-left-more">
        <el-popover
          placement="bottom-start"
          trigger="hover"
          popper-class="tw-toolbar-left-more"
          :width="`${moreBtnsWidth}px`"
        >
          <template #reference>
            <el-button v-show="moreShow" type="text" size="mini">更多操作</el-button>
          </template>

          <div
            ref="toolbarLeftMoreBtnsRef"
            class="more-btns"
            :style="{ width: `${moreBtnsWidth}px` }"
          >
          </div>
        </el-popover>
      </div>
    </div>
    <div class="toolbar-right" @click="hanldeFold">
      <IconSvg :icon="opened ? 'minus' : 'plus'" class="fold-icon" color="#0099CC" svg />
      <span class="txt">{{ opened ? '展开' : '折叠' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  //////////////////////////////////////////////////
  // 属性
  //////////////////////////////////////////////////

  import { nextTick, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';

  /**
   * 参数
   */
  defineProps({
    moreBtnsWidth: {
      type: Number,
      default: 90,
    },
  });

  /**
   * 事件
   */
  const emit = defineEmits(['foldClick']);

  /**
   * 显示更多按钮
   */
  const moreShow = ref(false);

  /**
   * 展开/折叠
   */
  const opened = ref(true);

  /**
   * 操作按钮最外层容器
   */
  const toolbarLeftRef = ref(null);

  /**
   * 操作按钮容器
   */
  const toolbarLeftBtnsRef = ref(null);

  /**
   * 更多操作按钮容器
   */
  const toolbarLeftMoreBtnsRef = ref(null);

  //////////////////////////////////////////////////
  // 生命周期
  //////////////////////////////////////////////////
  onMounted(() => {
    nextTick(() => {
      handleBtnsWidth();
    });
  });

  onBeforeMount(() => {
    window.addEventListener('resize', handleBtnsWidth);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleBtnsWidth);
  });

  //////////////////////////////////////////////////
  // 函数
  //////////////////////////////////////////////////

  /**
   * 获取工具条高度
   */
  function getToolbarHeight() {
    toolbarLeftRef.value;

    const toolbarLeftElement: HTMLDivElement = toolbarLeftRef.value as any;
    return toolbarLeftElement.offsetHeight;
  }

  /**
   * 折叠/展开
   */
  function hanldeFold() {
    opened.value = !opened.value;

    emit('foldClick', opened.value);
  }

  /**
   * 计算宽度
   */
  function handleBtnsWidth() {
    let toolbarLeftElement: HTMLDivElement = toolbarLeftRef.value as any;
    let toolbarLeftBtnsElement: HTMLDivElement = toolbarLeftBtnsRef.value as any;
    let toolbarLeftMoreBtnsElement: HTMLDivElement = toolbarLeftMoreBtnsRef.value as any;

    let width = 300;
    let btnsConEleWidth = toolbarLeftElement.offsetWidth;
    let btnsEleWidth = toolbarLeftBtnsElement.offsetWidth + width;

    let btns = toolbarLeftBtnsElement.getElementsByClassName('item');

    if (btns.length > 0) {
      while (btnsEleWidth > btnsConEleWidth && btns.length > 0) {
        const btn = btns[btns.length - 1];
        moreShow.value = true;
        if (btn) {
          toolbarLeftMoreBtnsElement.insertBefore(btn, toolbarLeftMoreBtnsElement.children[0]);
        }

        btnsConEleWidth = toolbarLeftElement.offsetWidth;
        btnsEleWidth = toolbarLeftBtnsElement.offsetWidth + width;
      }
    }

    let moreBtns = toolbarLeftMoreBtnsElement.getElementsByClassName('item');
    if (moreBtns.length > 0) {
      while (btnsEleWidth < btnsConEleWidth && moreBtns.length > 0) {
        const btn = moreBtns[0];

        if (btn) {
          toolbarLeftBtnsElement.appendChild(btn);
        }

        if (moreBtns.length === 0) {
          moreShow.value = false;
        }

        btnsConEleWidth = toolbarLeftElement.offsetWidth;
        btnsEleWidth = toolbarLeftBtnsElement.offsetWidth + width;
      }
    }
  }

  defineExpose({
    getToolbarHeight,
  });
</script>
