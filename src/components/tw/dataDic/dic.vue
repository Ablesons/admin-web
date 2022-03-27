<!--
 * @Description: el-option
 * @Author: DHL
 * @Date: 2022-01-19 11:28:37
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-20 15:48:59
-->
<template>
  <el-option
    v-for="item in dicList"
    :key="item.id"
    :label="item.dataName"
    :value="item.dataValue"
  ></el-option>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useCacheData } from '/@/hooks/web/cacheData';

  const cacheData = useCacheData();

  interface Props {
    /**
     * 字典KEY[TYPE_CODE]
     */
    dicKey: Nullable<string>;
  }

  const props = withDefaults(defineProps<Props>(), {
    dicKey: null,
  });

  /**
   * 字典集合
   */
  const dicList = computed(() => {
    if (props.dicKey) {
      return cacheData.getDic(props.dicKey);
    }
    return [];
  });
</script>
