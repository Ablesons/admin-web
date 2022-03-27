<!--
 * @Description: 菜单项
 * @Author: DHL
 * @Date: 2022-01-06 17:02:57
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-07 09:41:29
-->
<template>
  <template v-if="theOnlyOneChild">
    <el-menu-item :index="item.id" @click="handleRouter(item)">
      <el-icon>
        <IconSvg v-if="item.icon" :icon="item.icon" class="menu-icon" svg />
      </el-icon>
      <template #title>{{ item.name }}</template>
    </el-menu-item>
  </template>
  <template v-else>
    <el-sub-menu :index="item.id" popper-append-to-body>
      <template #title>
        <el-icon>
          <IconSvg v-if="item.icon" :icon="item.icon" class="menu-icon" svg />
        </el-icon>
        <span>{{ item.name }}</span>
      </template>

      <!-- 递归 -->
      <template v-if="item.children">
        <sidebar-item
          v-for="child in (item.children as any)"
          :key="`si_${child.id}`"
          :item="child"
        />
      </template>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="SidebarItem">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { IMenu } from '/#/router';

  const router = useRouter();

  interface Props {
    item: IMenu;
  }

  const props = withDefaults(defineProps<Props>(), {
    item: () => {
      return {} as IMenu;
    },
  });

  const theOnlyOneChild = computed(() => {
    if (props.item.children && props.item.children.length > 0) {
      return false;
    }
    return true;
  });

  function handleRouter(menu: IMenu) {
    router.push(menu.path).catch(err => {
      console.error(err);
    });
  }
</script>

<style lang="scss">
  .el-menu--collapse {
    .el-sub-menu__title {
      padding-left: 0 !important;

      .el-icon {
        left: 10px;
      }
    }

    .el-menu-item {
      .el-icon {
        left: -10px;
      }
    }
  }

  .is-opened {
    .el-menu--inline {
      background-color: var(--subMenuBg) !important;

      .el-menu-item {
        &:hover {
          background-color: var(--subMenuHover) !important;
        }
      }
    }
  }
</style>
