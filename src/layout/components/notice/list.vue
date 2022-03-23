<template>
  <div v-if="props.list.length">
    <Item v-for="(item, index) in props.list" :noticeItem="item" :key="index" />
  </div>
  <el-empty v-else description="暂无数据" />
</template>

<script setup lang="ts">
  import { ListItem } from './data';
  import Item from './item.vue';
  import { PropType } from 'vue';

  const props = defineProps({
    list: {
      type: Array as PropType<Array<ListItem>>,
      default: () => [],
    },
  });
</script>
