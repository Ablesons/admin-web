<script setup lang="ts">
  import {
    ref,
    watch,
    unref,
    reactive,
    nextTick,
    computed,
    ComputedRef,
    CSSProperties,
    onBeforeMount,
    getCurrentInstance,
  } from 'vue';
  import { emitter } from '/@/utils/mitt';
  import { useRoute, useRouter } from 'vue-router';

  import { toggleClass, removeClass, hasClass } from "/@/utils/operate";
  import { templateRef, useResizeObserver, useDebounceFn } from '@vueuse/core';
</script>

<template> </template>

<style scoped lang="scss">
  @import url('./index.scss');
</style>
