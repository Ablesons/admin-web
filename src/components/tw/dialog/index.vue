<!--
 * @Description: 对话框
 * @Author: DHL
 * @Date: 2021-12-24 17:10:40
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-26 15:53:18
-->

<template>
  <vxe-modal
    v-model="visible"
    :title="title"
    :width="width"
    :height="height"
    :show-footer="showFooter"
    :loading="loading"
    :destroy-on-close="destroyOnClose"
    :show-zoom="showZoom"
    :class-name="`tw-dialog-wrapper ${className}`"
    @show="handleOpen"
    @hide="handleClose"
  >
    <template #default>
      <slot></slot>
    </template>

    <!-- 动态插槽 -->
    <template v-for="slotName in slotKeys" #[slotName]>
      <slot :name="slotName"></slot>
    </template>
  </vxe-modal>
</template>

<script setup lang="ts">
  import { computed, useSlots } from 'vue';

  interface Props {
    /**
     * 是否显示弹框
     * 默认值：false
     */
    visible: boolean;

    /**
     * 是否显示footer插槽
     * 默认值：true
     */
    showFooter?: boolean;

    /**
     * 标题
     * 默认值： ''
     */
    title: string;

    /**
     * Dialog 的宽度
     * 默认值：50%
     */
    width?: string;

    /**
     * 滚动条最大高度
     * 超出高度内容，出现滚动条
     */
    height?: string;

    /**
     * 关闭时销毁 Dialog 中的元素
     * 默认值：true
     */
    destroyOnClose?: boolean;

    /**
     * loading
     */
    loading?: boolean;

    /**
     * 标题是否标显示最大化与还原按钮
     */
    showZoom?: boolean;

    /**
     * 自定义className
     */
    className?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    visible: false,
    showFooter: true,
    title: '',
    width: '50%',
    height: 'auto',
    destroyOnClose: true,
    loading: false,
    showZoom: true,
    className: '',
  });

  /**
   * 插槽集合
   */
  const slots = useSlots();

  /**
   * 插槽名称集合
   */
  const slotKeys = computed(() => {
    const slotKeys = Object.keys(slots);
    return slotKeys;
  });

  const emit = defineEmits(['open', 'opened', 'close', 'closed']);

  function handleOpen() {
    emit('open');
  }

  function handleClose() {
    emit('close');
  }
</script>

<style lang="scss"></style>
