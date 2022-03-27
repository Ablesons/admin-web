<!--
 * @Description: 顶部导航
 * @Author: DHL
 * @Date: 2021-12-10 13:59:58
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-12 17:53:44
-->

<template>
  <div class="navbar-container">
    <div class="navbar-left">
      <Hamburger
        id="hamburger-container"
        :is-active="sidebarOpened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
    </div>
    <div class="navbar-right">
      <el-tooltip v-if="isDev()" effect="dark" content="预览ICON" placement="bottom">
        <div class="item plr10" title="预览icon" @click="handleShowIcon">
          <IconSvg icon="instagram" svg />
        </div>
      </el-tooltip>

      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <div class="item">
          <fullscreen></fullscreen>
        </div>
      </el-tooltip>

      <el-tooltip effect="dark" content="布局大小" placement="bottom">
        <div class="item">
          <sizeSelect></sizeSelect>
        </div>
      </el-tooltip>

      <el-popover placement="bottom" :width="300" popper-class="tw-user-info" trigger="click">
        <template #reference>
          <div class="item user-info">
            <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
            {{ loginUser.name }}
          </div>
        </template>

        <div class="user-detail">
          <div>
            <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          </div>
          <div>
            <div>{{ loginUser.name }}</div>
            <div>{{ loginUser.loginName }}</div>
            <div>{{ loginUser.ip }}</div>
          </div>
        </div>
        <div class="user-btn">
          <div class="btn">
            <IconSvg icon="user" svg />
            个人中心
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="btn">
            <IconSvg icon="lock" svg />
            修改密码
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="btn">
            <IconSvg icon="logout" svg />
            退出登录
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Hamburger from '/@/components/hamburger/index.vue';
  import fullscreen from '/@/components/screenfull/index.vue';
  import sizeSelect from '/@/components/sizeSelect/index.vue';
  import { computed, ref } from 'vue';
  import { useAppStore } from '/@/store/modules/app';
  import { isDev } from '/@/utils/envUtils';
  import { useLoginUserStore } from '/@/store/modules/loginUser';
  import avatarImg from '/@/assets/img/avatar.gif';

  const iconPreviewRef = ref();

  const appStore = useAppStore();
  const sidebarOpened = computed(() => {
    return appStore.getSidebarOpened;
  });

  const loginUser = useLoginUserStore();

  const avatar = computed(() => {
    const _avatar = loginUser.avatar ? loginUser.avatar : avatarImg;
    return _avatar;
  });

  //////////////////////////////////////////////////
  // 函数
  //////////////////////////////////////////////////
  /**
   * 切换左侧菜单折叠状态
   */
  function toggleSideBar() {
    appStore.setToggleSideBar();
  }

  /**
   * 预览icon
   */
  function handleShowIcon() {
    iconPreviewRef.value?.showIcon();
  }
</script>

<style scoped lang="scss">
  .navbar-container {
    display: flex;
    justify-content: space-between;
    height: 48px;
    overflow: hidden;
    line-height: 48px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .navbar-right {
      display: flex;
      align-items: center;

      .plr10 {
        padding: 0 10px;
      }

      .item {
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.025);
        }
      }

      .user-info {
        display: flex;
        align-items: center;
        padding: 0 20px;
        font-size: 14px;

        .user-avatar {
          width: 30px;
          height: 30px;
          margin-right: 5px;
          border-radius: 10px;
        }
      }
    }
  }
</style>

<style lang="scss">
  .tw-user-info {
    padding: 0 !important;

    .user-detail {
      display: flex;
      align-items: center;
      padding: 20px;

      .user-avatar {
        width: 50px;
        height: 50px;
        margin-right: 20px;
        border-radius: 100%;
      }
    }

    .user-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0px;
      border-top: 1px dashed #ccc;

      .btn {
        padding: 3px;
        font-size: 13px;
        cursor: pointer;

        &:hover {
          color: #409eff;
        }
      }
    }
  }
</style>
