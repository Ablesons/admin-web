<!--
 * @Description: 组件大小设置
 * @Author: DHL
 * @Date: 2022-01-12 13:28:18
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-12 17:59:35
-->
<template>
  <el-dropdown trigger="click" size="large" @command="handleSetSize">
    <div class="size-select">
      <IconSvg icon="size" svg />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item of sizeOptions"
          :key="`tws_${item.value}`"
          :disabled="size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { useAppStore } from '/@/store/modules/app';
  import { ElMessage } from 'element-plus';

  const appStore = useAppStore();

  const sizeOptions = reactive([
    { label: 'Large', value: 'large' },
    { label: 'Medium', value: 'medium' },
    { label: 'Small', value: 'small' },
    { label: 'Mini', value: 'mini' },
  ]);

  const size = computed(() => {
    return appStore.getSize;
  });

  function handleSetSize(size: string) {
    appStore.setSize(size);

    refreshView();

    ElMessage.success('Switch Size Success');
  }

  function refreshView() {
    location.reload();
  }
</script>

<style scoped lang="scss">
  ::v-deep(.el-dropdown) {
    vertical-align: middle;
  }

  .size-select {
    padding: 0 10px;
  }
</style>
