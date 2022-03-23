<template>
  <el-dropdown ref="dropdownDom" trigger="click" placement="bottom-end">
    <span class="dropdown-badge">
      <el-badge :value="noticesNum" :max="99">
        <el-icon class="header-notice-icon">
          <IconOffLine icon="bell" />
        </el-icon>
      </el-badge>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-tabs class="dropdown-tabs" v-model="activeName" @tab-click="tabClick">
          <template v-for="item in notices" :key="item.key">
            <el-tab-pane :label="`${item.name}(${item.list.length})`">
              <el-scrollbar max-height="330px">
                <div class="noticeList-container">
                  <List :list="item.list" />
                </div>
              </el-scrollbar>
            </el-tab-pane>
          </template>
        </el-tabs>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { noticesData } from './data';
  import List from './list.vue';
  import { templateRef } from '@vueuse/core';

  const dropdownDom = templateRef<ElRef | null>('dropdownDom', null);
  const activeName = ref(noticesData[0].name);
  const notices = ref(noticesData);

  let noticesNum = ref(0);
  notices.value.forEach(notice => {
    noticesNum.value += notice.list.length;
  });

  function tabClick() {
    // @ts-expect-error
    dropdownDom.value.handleOpen();
  }
</script>

<style scoped lang="scss">
  .dropdown-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 60px;
    cursor: pointer;

    .header-notice-icon {
      font-size: 18px;
    }
  }

  .dropdown-tabs {
    width: 336px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
    border-radius: 4px;

    ::v-deep(.el-tabs__header) {
      margin: 0;
    }

    ::v-deep(.el-tabs__nav-scroll) {
      display: flex;
      justify-content: center;
    }

    ::v-deep(.el-tabs__nav-wrap)::after {
      height: 1px;
    }

    ::v-deep(.noticeList-container) {
      padding: 15px 24px 0 24px;
    }
  }

  ::v-deep(.ant-tabs-nav) {
    margin-bottom: 0;
  }
</style>
