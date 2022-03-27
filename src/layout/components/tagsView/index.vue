<!--
 * @Description: 导航页签
 * @Author: DHL
 * @Date: 2021-12-14 10:12:00
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-18 23:32:40
-->
<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper">
      <el-scrollbar
        ref="scrollContainerRef"
        :vertical="false"
        class="scroll-container"
        @wheel.prevent="handleScroll"
      >
        <router-link
          v-for="(tag, index) in visitedViews"
          ref="tagRef"
          :key="`tvk_${index}`"
          :class="isActive(tag) ? 'active' : ''"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          class="tags-view-item"
          @click.prevent="handleSelectTag(tag)"
          @contextmenu.prevent="handleOpenMenu(tag, $event)"
        >
          {{ tag.title }}

          <span
            v-if="!isAffix(tag)"
            class="el-icon-close"
            @click.prevent.stop="handleCloseTag(tag)"
          >
            <IconSvg icon="close" class="tag-close" svg :color="isActive(tag) ? '#ffffff' : ''" />
          </span>
        </router-link>
      </el-scrollbar>
    </div>
    <div class="tage-view-toolbar">
      <span title="刷新" @click="handleRefresh">
        <IconSvg :icon="refreshing ? 'loading' : 'refresh'" svg />
      </span>
      <span @click="handleOpenMenu(null, $event)">
        <IconSvg icon="down" svg />
      </span>
    </div>

    <ul
      v-show="contextMenu.visible"
      :style="{ left: contextMenu.left + 'px', top: contextMenu.top + 'px' }"
      class="context-menu"
    >
      <li @click="handleRefresh"> <IconSvg icon="reload" svg /> 重新加载 </li>
      <li v-if="!isAffix(state.selectedTag)" @click="handleCloseSelectedTag">
        <IconSvg icon="close" svg /> 关闭标签页
      </li>
      <li class="divider"></li>
      <li @click="handleCloseLeftTags"> <IconSvg icon="arrowCloseLeft" svg /> 关闭左侧标签页 </li>
      <li @click="handleCloseRightTags"> <IconSvg icon="arrowCloseRight" svg /> 关闭右侧标签页 </li>
      <li class="divider"></li>
      <li @click="handleCloseOthersTags">
        <IconSvg icon="alignCenterOther" svg /> 关闭其他标签页
      </li>
      <li @click="handleCloseAllTags"> <IconSvg icon="minus" svg /> 关闭全部标签页 </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { computed, getCurrentInstance, onBeforeMount, reactive, ref, watch, nextTick } from 'vue';
  import { ITagView, useTagsViewStore } from '/@/store/modules/tagsView';
  import { useRoute, useRouter } from 'vue-router';

  //////////////////////////////////////////////////
  // 属性
  //////////////////////////////////////////////////

  const tagsViewStore = useTagsViewStore();
  const currentRoute = useRoute();
  const router = useRouter();
  const instance = getCurrentInstance();

  const scrollContainerRef = ref(null);

  const contextMenu = reactive({
    action: 'contextmenu',
    visible: false,
    top: 0,
    left: 0,
  });

  const state = reactive({
    /**
     * 固定页签
     */
    affixTags: [] as Array<ITagView>,

    /**
     * 选中的页签
     */
    selectedTag: {} as ITagView,
  });

  /**
   * 刷新
   */
  const refreshing = ref(false);

  /**
   * 路由集合
   */
  const routes = computed(() => {
    let tagsRoutes = router.getRoutes();
    return tagsRoutes;
  });

  /**
   * 页签集合
   */
  const visitedViews = computed(() => {
    return tagsViewStore.visitedViews;
  });

  /**
   * 滚动条
   */
  const scrollWrapper = computed(() => {
    return (scrollContainerRef.value as any).$refs.wrap$ as HTMLElement;
  });

  /**
   * 监听路由变化
   */
  watch(
    () => currentRoute.name,
    () => {
      addTags();
      moveToCurrentTag();
    }
  );

  /**
   * 监听右键菜单
   */
  watch(
    () => contextMenu.visible,
    visible => {
      if (visible) {
        document.body.addEventListener('click', handleColseMenu);
      } else {
        document.body.removeEventListener('click', handleColseMenu);
      }
    }
  );

  //////////////////////////////////////////////////
  // 生命周期
  //////////////////////////////////////////////////
  onBeforeMount(() => {
    initTags();
  });

  //////////////////////////////////////////////////
  // 函数
  //////////////////////////////////////////////////
  /**
   * 滚动条
   */
  function handleScroll(e: WheelEvent) {
    const eventDelta = (e as any).wheelDelta || -e.deltaY * 40;
    scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollLeft + eventDelta / 4;
  }

  /**
   * 初始化页签
   */
  function initTags() {
    filterAffixTags();
    addTags();
  }

  /**
   * 过滤固定页签
   */
  function filterAffixTags() {
    let tags: ITagView[] = [];

    routes.value.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagView: ITagView = {
          fullPath: route.path,
          path: route.path,
          name: route.name,
          meta: { ...route.meta },
        };

        tagsViewStore.addView(tagView);

        tags.push(tagView);
      }
    });

    state.affixTags = tags;
  }

  /**
   * 添加页签
   */
  function addTags() {
    if (currentRoute.name) {
      tagsViewStore.addView(currentRoute);
      handleSelectTag(currentRoute);
    }
    return false;
  }

  /**
   * 移动到当前页签
   */
  function moveToCurrentTag() {
    nextTick(() => {
      const tagList: Array<any> = instance?.refs?.tagRef as Array<any>;

      if (tagList === null || tagList === undefined || !Array.isArray(tagList)) {
        return;
      }

      let currentTag = null;
      let currentIndex = -1;
      for (const [i, tag] of tagList.entries()) {
        if (tag && tag.to.path === currentRoute.path) {
          currentTag = tag;
          currentIndex = i;
        }
      }

      if (!currentTag) {
        return;
      }

      const container = (scrollContainerRef.value as any).$el as HTMLElement;
      const containerWidth = container.offsetWidth;
      const tagSpacing = 4;

      let fristTag = null;
      let lastTag = null;

      // find first tag and last tag
      if (tagList.length > 0) {
        fristTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }

      if (fristTag === currentTag) {
        scrollWrapper.value.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollWidth - containerWidth;
      } else {
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagSpacing;
        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagSpacing;

        if (afterNextTagOffsetLeft > scrollWrapper.value.scrollLeft + containerWidth) {
          scrollWrapper.value.scrollLeft = afterNextTagOffsetLeft - containerWidth;
        } else if (beforePrevTagOffsetLeft < scrollWrapper.value.scrollLeft) {
          scrollWrapper.value.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    });
  }

  /**
   * 是否选中
   */
  function isActive(route: ITagView) {
    return route.path === currentRoute.path;
  }

  /**
   * 是否固定
   */
  function isAffix(tag: ITagView) {
    let affix = false;
    if (tag.meta) {
      if (tag.meta.affix) {
        affix = true;
      }
    }
    return affix;
  }

  /**
   * 选中页签
   */
  function handleSelectTag(tag: ITagView) {
    if (isActive(tag)) {
      if (tag.name) {
        state.selectedTag = tag;
      }
    }
  }

  /**
   * 跳转最后一个页签
   */
  function toLastView(tag: ITagView) {
    const latestView = tagsViewStore.visitedViews.slice(-1)[0];
    if (latestView !== undefined && latestView.path !== undefined) {
      router.push({ path: latestView.path }).catch(err => {
        console.warn(err);
      });
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (tag.name === 'Dashboard') {
        // to reload home page
        router.push({ path: '/redirect' + tag.path }).catch(err => {
          console.warn(err);
        });
      } else {
        router.push({ path: '/' }).catch(err => {
          console.warn(err);
        });
      }
    }
  }

  /**
   * 刷新当前选中页签
   */
  function handleRefresh() {
    if (!refreshing.value) {
      const { path } = state.selectedTag;
      nextTick(() => {
        tagsViewStore.delCachedView(state.selectedTag);
        router.replace({ path: '/redirect' + path }).catch(err => {
          console.warn(err);
        });

        refreshing.value = true;
        setTimeout(() => {
          refreshing.value = false;
        }, 2000);
      });
    }
  }

  /**
   * 关闭页签
   * @param tag
   */
  function handleCloseTag(tag: ITagView) {
    tagsViewStore.delView(tag);
    if (isActive(tag)) {
      toLastView(tag);
    }
  }

  /**
   * 关闭选中的页签
   */
  function handleCloseSelectedTag() {
    tagsViewStore.delView(state.selectedTag);
    if (isActive(state.selectedTag)) {
      toLastView(state.selectedTag);
    }
  }

  /**
   * 关闭左侧页签
   */
  function handleCloseLeftTags() {
    if (state.selectedTag.path && state.selectedTag.path !== currentRoute.path) {
      router.push(state.selectedTag.path).catch(err => {
        console.log(err);
      });
    }
    tagsViewStore.delLeftView(state.selectedTag);
  }

  /**
   * 关闭右侧页签
   */
  function handleCloseRightTags() {
    if (state.selectedTag.path && state.selectedTag.path !== currentRoute.path) {
      router.push(state.selectedTag.path).catch(err => {
        console.log(err);
      });
    }
    tagsViewStore.delRightView(state.selectedTag);
  }

  /**
   * 关闭其他页签
   */
  function handleCloseOthersTags() {
    if (state.selectedTag.path && state.selectedTag.path !== currentRoute.path) {
      router.push(state.selectedTag.path).catch(err => {
        console.log(err);
      });
    }
    tagsViewStore.delOthersView(state.selectedTag);
  }

  /**
   * 关闭所有页签
   */
  function handleCloseAllTags() {
    tagsViewStore.delAllView();
    if (state.affixTags.some(tag => tag.path === currentRoute.path)) {
      return;
    }
    toLastView(state.selectedTag);
  }

  /**
   * 打开右键菜单
   */
  function handleOpenMenu(tag: null | ITagView, e: MouseEvent) {
    const menuMinWidth = 150;
    const offsetWidth = document.body.offsetWidth;
    const maxLeft = offsetWidth - menuMinWidth; // left boundary
    const left = e.clientX + 15; // 15: margin right

    if (left > maxLeft) {
      contextMenu.left = maxLeft;
    } else {
      contextMenu.left = left;
    }

    Object.assign(contextMenu, {
      top: e.clientY + 10,
      visible: true,
    });

    if (tag) {
      state.selectedTag = tag;
    } else {
      contextMenu.action = 'click';
    }
  }

  /**
   * 关闭右键菜单
   */
  function handleColseMenu() {
    if (contextMenu.action === 'contextmenu') {
      contextMenu.visible = false;
    } else {
      contextMenu.action = 'contextmenu';
    }
  }
</script>

<style scoped lang="scss">
  .tags-view-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 32px;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

    .tags-view-wrapper {
      width: calc(100% - 78px);

      .scroll-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

        :deep (.el-scrollbar__bar) {
          bottom: 0;
          height: 3px;
        }

        .el-scrollbar__wrap {
          height: 49px;
        }

        .tags-view-item {
          display: inline-flex;
          height: 26px;
          padding: 0 10px;
          margin-top: 3px;
          margin-left: 5px;
          font-size: 12px;
          line-height: 25px;
          letter-spacing: 2px;
          color: #495060;
          text-decoration: none;
          cursor: pointer;
          background: #fff;
          border: 1px solid #d8dce5;
          border-radius: 2px;
          box-sizing: border-box;

          &:first-of-type {
            margin-left: 15px;
          }

          &:last-of-type {
            margin-right: 15px;
          }

          &.active {
            color: #ffffff;
            background-color: #42b983;
            border-color: #42b983;

            .tag-close {
              color: #ffffff;
            }
          }

          .el-icon-close {
            width: 18px;
            height: 18px;
            margin-top: 3px;
            margin-left: 3px;
            border-radius: 50%;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;

            &::before {
              display: inline-block;
              transform: scale(0.6);
            }

            .tag-close {
              width: 13px;
              height: 13px;
              margin-left: 2px;
              vertical-align: inherit;
            }

            &:hover {
              color: #fff;
              background-color: #b4bccc;
            }
          }
        }
      }
    }

    .tage-view-toolbar {
      span {
        display: inline-block;
        width: 36px;
        height: 32px;
        line-height: 32px;
        color: #00000073;
        text-align: center;
        cursor: pointer;
        border-left: 1px solid #d9d9d9;

        &:hover {
          .svg-icon {
            fill: #333333;
          }
        }
      }
    }

    .context-menu {
      position: absolute;
      z-index: 6000;
      padding: 0;
      margin: 0;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      list-style-type: none;
      background: #fff;
      border-radius: 2px;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

      li {
        padding: 7px 15px;
        margin: 0;
        cursor: pointer;

        &.divider {
          height: 1px;
          padding: 0px 0px;
          margin: 4px 0;
          background-color: #f0f0f0;
        }

        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>
