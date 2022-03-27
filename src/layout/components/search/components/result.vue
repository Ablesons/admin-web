<template>
  <div class="result">
    <template v-for="item in options" :key="item.path">
      <div class="result-item" @click="handleTo" @mouseenter="handleMouse(item)"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  interface optionsItem {
    path: string;
    meta?: {
      icon?: string;
      title?: string;
    };
  }

  interface Props {
    value: string;
    options: Array<optionsItem>;
  }

  interface Emits {
    (e: 'update:value', val: string): void;
    (e: 'enter'): void;
  }

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits<Emits>();

  const active = computed({
    get() {
      return props.value;
    },
    set(val: string) {
      emit('update:value', val);
    },
  });

  /** 鼠标移入 */
  async function handleMouse(item) {
    active.value = item.path;
  }

  function handleTo() {
    emit('enter');
  }
</script>

<style scoped lang="scss">
  .result {
    padding-bottom: 12px;

    &-item {
      display: flex;
      align-items: center;
      height: 56px;
      padding: 14px;
      margin-top: 8px;
      cursor: pointer;
      background: #e5e7eb;
      border-radius: 4px;

      &-title {
        display: flex;
        flex: 1;
        margin-left: 5px;
      }
    }
  }
</style>
