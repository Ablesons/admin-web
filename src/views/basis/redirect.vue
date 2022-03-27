<!--
 * @Description:
 * @Author: Ableson
 * @Date: 2022/3/27 20:55
 * @LastEditors: Ableson
 * @LastEditTime: 2022/3/27 20:55
 -->
<template>
  <div></div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';

  const { params, query } = useRoute();

  const { path } = params;

  useRouter()
    .replace({ path: '/' + path, query })
    .catch(err => {
      console.warn(err);
    });
</script>
