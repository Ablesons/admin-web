<template>
  <div class="anticon" :class="getAppLogoClass" @click="goHome">
    <img src="../../../assets/images/logo.png" alt="" />
    <div class="ml-2 truncate md:opacity-100">{{ title }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting';

  const props = defineProps({
    theme: {
      type: String,
      validator: (value: string): boolean => ['light', 'dark'].includes(value),
    },
    showTitle: { type: Boolean, default: true },
    alwaysShowTitle: { type: Boolean },
  });

  export const { title } = useGlobSetting();

  export const getAppLogoClass: string[] = computed(() => [props.theme]);

  export function goHome() {
    go(-1);
  }
</script>
