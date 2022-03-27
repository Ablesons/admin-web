import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RouteLocationNormalized } from 'vue-router';
import { stringUtils } from '/@/utils/stringUtils';
import { findIndex, remove } from 'lodash-es';

export interface ITagView extends Partial<RouteLocationNormalized> {
  title?: string;
}

export interface ITagsViewState {
  visitedViews: ITagView[];
  cachedViews: string[];
}

const tagsViewStore = defineStore({
  id: 'tagsViewStore',
  state: (): ITagsViewState => ({
    visitedViews: [],
    cachedViews: [],
  }),
  getters: {},
  actions: {
    /**
     * 获取组件名称
     * 因服务端路由name与组件名称不一致，所以无法通过keep-alive组件缓存
     * 通过路由对象获取组件名称，实现keep-alive组件缓存功能
     */
    getComponentName(view: ITagView) {
      let componentName = '';

      view.matched?.forEach(item => {
        if (
          view.name === item.name &&
          item.components &&
          item.components.default &&
          item.components.default.name
        ) {
          componentName = item.components.default.name;
        }
      });

      return componentName;
    },

    /**
     * 添加页签
     * @param view
     * @returns
     */
    addVisitedView(view: ITagView) {
      if (this.visitedViews.some(item => item.path === view.path)) {
        return;
      }

      const addView: ITagView = Object.assign({}, view, {
        title: view.meta?.title || 'no-name',
      });

      this.visitedViews.push(addView);
    },

    /**
     * 添加缓存页签
     * @param view
     * @returns
     */
    addCachedView(view: ITagView) {
      if (view.name === null) {
        return;
      }

      if (view.meta) {
        const noCache = view.meta.noCache;
        if (noCache == null || noCache == undefined || noCache) {
          return;
        }
      }

      const componentName = this.getComponentName(view);

      if (stringUtils.isNotEmpty(componentName)) {
        if (this.cachedViews.includes(componentName)) {
          return;
        }

        this.cachedViews.push(componentName);
      } else {
        console.warn(`[${view.path}]未设置组件名称，不能使用[keep-alive]缓存`);
      }
    },

    /**
     * 删除页签
     * @param view
     */
    delVisitedView(view: ITagView) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1);
          break;
        }
      }
    },

    /**
     * 删除缓存页签
     * @param view
     * @returns
     */
    delCachedView(view: ITagView) {
      if (view.name === null || this.cachedViews.length === 0) {
        return;
      }
      const componentName = this.getComponentName(view);
      const index = this.cachedViews.indexOf(componentName);
      index > -1 && this.cachedViews.splice(index, 1);
    },

    /**
     * 删除其他页签
     * @param view
     */
    delOthersVisitedView(view: ITagView) {
      this.visitedViews = this.visitedViews.filter((v: any) => {
        const rtn = v.meta.affix || v.path === view.path;

        if (!rtn) {
          this.delCachedView(v);
        }

        return rtn;
      });
    },

    /**
     * 删除所有页签
     * @param view
     */
    delAllVisitedView() {
      this.visitedViews = this.visitedViews.filter((v: any) => {
        const rtn = v.meta.affix;

        if (!rtn) {
          this.delCachedView(v);
        }

        return rtn;
      });
    },

    /**
     * 删除左侧页签
     * @param view
     */
    delLeftVisitedView(view: ITagView) {
      const that = this;
      const viewIndex = findIndex(this.visitedViews, view);

      remove(this.visitedViews, function (value, index) {
        let rtn = viewIndex > index;

        if (rtn && value.meta?.affix) {
          rtn = false;
        }

        if (rtn) {
          that.delCachedView(value);
        }

        return rtn;
      });
    },

    /**
     * 删除右侧页签
     * @param view
     */
    delRightVisitedView(view: ITagView) {
      const that = this;
      const viewIndex = findIndex(this.visitedViews, view);

      remove(this.visitedViews, function (value, index) {
        let rtn = viewIndex < index;

        if (rtn && value.meta?.affix) {
          rtn = false;
        }

        if (rtn) {
          that.delCachedView(value);
        }

        return rtn;
      });
    },

    //////////////////////////////////////////////////

    /**
     * 添加页签[addVisitedView、addCachedViews]
     * @param view
     */
    addView(view: ITagView) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },

    /**
     * 删除页签[addVisitedView、addCachedViews]
     * @param view
     */
    delView(view: ITagView) {
      this.delVisitedView(view);
      this.delCachedView(view);
    },

    /**
     * 删除其他页签[addVisitedView、addCachedViews]
     * @param view
     */
    delOthersView(view: ITagView) {
      this.delOthersVisitedView(view);
    },

    /**
     * 删除所有页签[addVisitedView、addCachedViews]
     * @param view
     */
    delAllView() {
      this.delAllVisitedView();
    },

    /**
     * 删除左侧页签[addVisitedView、addCachedViews]
     * @param view
     */
    delLeftView(view: ITagView) {
      this.delLeftVisitedView(view);
    },

    /**
     * 删除右侧页签[addVisitedView、addCachedViews]
     * @param view
     */
    delRightView(view: ITagView) {
      this.delRightVisitedView(view);
    },

    clearView() {
      this.visitedViews = [];
      this.cachedViews = [];
    },
  },
});

export function useTagsViewStore() {
  return tagsViewStore(store);
}
