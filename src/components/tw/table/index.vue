<!--
 * @Description: 数据表格
 * @Author: DHL
 * @Date: 2021-12-23 23:00:45
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-26 22:49:17
-->

<template>
  <div class="tw-table-wrapper">
    <vxe-grid ref="tableInstance" v-bind="tableOptions" v-on="tableEvents">
      <!-- 动态插槽 -->
      <template v-for="slotName in slotKeys" #[slotName]="{ row }">
        <slot :name="slotName" :row="row"></slot>
      </template>

      <!--自定义插槽 pager 插槽-->
      <template #pager>
        <vxe-pager
          v-model:current-page="tablePage.currentPage"
          v-model:page-size="tablePage.pageSize"
          :layouts="tablePageLayouts"
          :total="tablePage.total"
          @page-change="handlePageChange"
        >
          <template #left>
            <el-button
              slot="reference"
              circle
              title="列设置"
              @click="handleOpenCustomColumn($event)"
            >
              <IconSvg
                icon="arrangement"
                class="tw-table-page-left-icon"
                svg
                color="var(--color-primary)"
              />
            </el-button>
          </template>
        </vxe-pager>
      </template>
    </vxe-grid>

    <tw-dialog
      :visible="customColumn.visible"
      title="列设置"
      width="400px"
      height="60vh"
      class-name="tw-custom-column-wrapper"
      @close="handleCloseCustomColumn"
    >
      <div class="custom-column-checked-all">
        <el-checkbox v-model="customColumn.checkedAll" @change="handleCustomColumnCheckedAllChange">
          全部
        </el-checkbox>
      </div>
      <el-divider class="custom-column-divider"></el-divider>
      <el-tree
        ref="customColumnTreeRef"
        :data="customColumn.data"
        :props="customColumn.props"
        node-key="customColumnId"
        :default-checked-keys="customColumn.checkedKeys"
        show-checkbox
        default-expand-all
        highlight-current
        check-on-click-node
        :expand-on-click-node="false"
      >
      </el-tree>

      <template #footer>
        <el-button type="primary" @click="handleSubmitCustomColumn()">确 认</el-button>
        <el-button @click="handleCloseCustomColumn()">取 消</el-button>
      </template>
    </tw-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { assign, cloneDeep, merge } from 'lodash-es';
  import { computed, nextTick, onMounted, reactive, ref, useSlots } from 'vue';
  import { VxeGridInstance, VxePagerDefines, VxeGridDefines } from 'vxe-table';
  import { BaseModel, Result, ResultPage } from '/@/model/baseModel';
  import { useTableSettingStore } from '/@/store/modules/tableSetting';
  import { TwTableEvents, TwTableOptions } from '/#/table';
  import { stringUtils } from '/@/utils/stringUtils';

  //////////////////////////////////////////////////
  // 接收参数
  //////////////////////////////////////////////////
  interface Props {
    options: TwTableOptions;
    events: TwTableEvents;
  }

  const props = withDefaults(defineProps<Props>(), {
    options: () => {
      return { id: '' };
    },
    events: () => {
      return {};
    },
  });

  const emit = defineEmits(['search']);

  /**
   * 表格实例
   */
  const tableInstance = ref({} as VxeGridInstance);

  //////////////////////////////////////////////////
  // 插槽
  //////////////////////////////////////////////////

  /**
   * 插槽集合
   */
  const slots = useSlots();

  /**
   * 插槽名称集合
   */
  const slotKeys = computed(() => {
    const slotKeys = Object.keys(slots);
    return slotKeys;
  });

  //////////////////////////////////////////////////
  // 表格配置
  //////////////////////////////////////////////////

  /**
   * 默认设置
   */
  const defaultOptions: TwTableOptions = {
    id: '',
    autoLoad: true,
    border: true,
    resizable: true,
    showHeaderOverflow: true,
    showOverflow: true,
    highlightHoverRow: true,
    keepSource: false,
    height: 'auto',
    stripe: true,
    align: 'left',
    rowId: 'id',
    columnConfig: {
      resizable: true,
    },
    sortConfig: {
      trigger: 'cell',
      multiple: true,
      remote: true,
    },
    checkboxConfig: {
      highlight: true,
    },
  };

  /**
   * 表格配置
   */
  let tableOptions = reactive<TwTableOptions>(cloneDeep(defaultOptions));

  //////////////////////////////////////////////////
  // 表格事件
  //////////////////////////////////////////////////

  /**
   * 默认事件
   */
  const defaultEvents: TwTableEvents = {
    sortChange: (sortParams: VxeGridDefines.SortChangeEventParams) => {
      handleSearch();
    },
  };

  /**
   * 表格事件
   */
  const tableEvents = reactive<TwTableEvents>(merge(cloneDeep(defaultEvents), props.events));

  //////////////////////////////////////////////////
  // 分页
  //////////////////////////////////////////////////

  /**
   * 分页配置
   */
  const tablePage = reactive({
    pages: 0, // 总页数
    total: 0, // 总条数
    currentPage: 1, // 当前页
    pageSize: 20, // 每页显示条数
    pageSizes: [20, 50, 100, 200],
  });

  /**
   * 分页组件布局
   */
  const tablePageLayouts = computed(() => {
    let layouts = ['Total'];

    if (tablePage.pages > 0) {
      layouts = [
        'Sizes',
        'PrevJump',
        'PrevPage',
        'Number',
        'NextPage',
        'NextJump',
        'FullJump',
        'Total',
      ];
    }

    return layouts;
  });

  /**
   * 操作分页
   */
  function handlePageChange(pageParams: VxePagerDefines.PageChangeEventParams) {
    tablePage.currentPage = pageParams.currentPage;
    tablePage.pageSize = pageParams.pageSize;

    handleSearch();
  }

  //////////////////////////////////////////////////
  // 函数
  //////////////////////////////////////////////////

  /**
   * 获取排序参数
   */
  function getSortParams() {
    // 排序
    let sortParams = {};
    const sort = tableInstance.value.getSortColumns();
    if (sort.length > 0) {
      let _sort: Array<string> = [];
      sort.forEach(item => {
        _sort.push(`${stringUtils.toLine(item?.field)} ${item?.order}`);
      });

      sortParams = {
        sort: _sort.join(','),
      };
    } else {
      const defaultSort = tableOptions.sortConfig?.defaultSort;
      if (defaultSort) {
        if (defaultSort instanceof Array) {
          let _sort: Array<string> = [];
          defaultSort.forEach(item => {
            _sort.push(`${stringUtils.toLine(item?.field)} ${item?.order}`);
          });

          sortParams = {
            sort: _sort.join(','),
          };
        } else {
          sortParams = {
            sort: `${stringUtils.toLine(defaultSort?.field)} ${defaultSort?.order}`,
          };
        }
      }
    }

    return sortParams;
  }

  /**
   * 查询数据
   */
  function handleSearch() {
    nextTick(() => {
      tableOptions.loading = true;

      // 排序参数
      let sortParams = getSortParams();

      /**
       * 查询参数
       * 分页参数、排序参数、查询成功后回调设置表格数据
       */
      const queryParams = assign(
        {
          pageNum: tablePage.currentPage,
          pageSize: tablePage.pageSize,
          callback: (result: any) => {
            tableOptions.loading = false;

            // 返回结果没有分页参数
            if (result.data instanceof Array) {
              const _result = result as Result<BaseModel>;
              tableOptions.data = _result.data as unknown as any[];
              Object.assign(tablePage, { pages: 0, total: tableOptions.data.length });
            } else {
              const _result = result as ResultPage<BaseModel>;
              tableOptions.data = _result.data?.list;
              Object.assign(tablePage, { pages: _result.data?.pages, total: _result.data?.total });
            }
          },
        },
        sortParams
      );

      emit('search', queryParams);
    });
  }

  /**
   * 查询
   */
  function handleQuery() {
    tablePage.currentPage = 1;
    handleSearch();
  }

  /**
   * 重新加载
   */
  function handleReload() {
    handleSearch();
  }

  /**
   * 获取选中的行数据
   */
  function getSelectRows(): Array<any> {
    return tableInstance.value.getCheckboxRecords();
  }

  //////////////////////////////////////////////////
  // 自定义列
  //////////////////////////////////////////////////

  const customColumnTreeRef = ref();

  /**
   * 自定义列属性
   */
  const customColumn = reactive({
    visible: false,
    checkedAll: true,
    data: [],
    keys: [] as Array<string>, // 节点的 key 的数组
    checkedKeys: [] as Array<string>, // 默认勾选的节点的 key 的数组
    props: {
      label: 'title',
    } as any,
  });

  /**
   * 显示自定义列面板
   */
  function handleOpenCustomColumn(e: MouseEvent) {
    getCustomColumnCheckedKeys();
    customColumn.data = tableOptions.columns as [];
    customColumn.visible = true;
  }

  /**
   * 提交列设置
   */
  function handleSubmitCustomColumn() {
    const checkedKeys = customColumnTreeRef.value.getCheckedKeys();
    useTableSettingStore().setCustomColumn({ [tableOptions.id]: checkedKeys });
    handleRefreshCustomColumn();
    ElMessage.success('列设置成功');
  }

  /**
   * 关闭列设置
   */
  function handleCloseCustomColumn() {
    customColumn.visible = false;
  }

  /**
   * 递归设置列唯一标识
   */
  function setCustomColumnId(columns: any[], cusColId: string) {
    let index = 1;
    columns.forEach(item => {
      Object.assign(item, {
        customColumnId: `${cusColId}_${index}`,
        params: {
          customColumnId: `${cusColId}_${index}`,
        },
      });

      customColumn.keys.push(item.customColumnId);

      if (item.children && item.children.length > 0) {
        setCustomColumnId(item.children, item.customColumnId);
      }

      index++;
    });
  }

  /**
   * 刷新列设置并渲染
   */
  function handleRefreshCustomColumn() {
    nextTick(() => {
      const cacheCheckedKeys = useTableSettingStore().getCustomColumn(tableOptions.id);
      if (cacheCheckedKeys && cacheCheckedKeys.length > 0) {
        if (tableOptions.columns) {
          const tableColumn = tableInstance.value.getTableColumn();
          tableColumn.fullColumn.forEach(item => {
            if (cacheCheckedKeys.includes(item.params.customColumnId)) {
              item.visible = true;
            } else {
              item.visible = false;
            }
          });
          tableInstance.value.refreshColumn();
        }
      }
    });
  }

  /**
   * 获取默认勾选的节点的 key 的数组
   */
  function getCustomColumnCheckedKeys() {
    customColumn.checkedKeys = customColumn.keys;
    const cacheCheckedKeys = useTableSettingStore().getCustomColumn(tableOptions.id);
    if (cacheCheckedKeys && cacheCheckedKeys.length > 0) {
      customColumn.checkedKeys = cacheCheckedKeys;
    } else {
      customColumn.checkedKeys = customColumn.keys;
    }
  }

  /**
   * 全选改变事件
   */
  function handleCustomColumnCheckedAllChange() {
    if (customColumn.checkedAll) {
      customColumnTreeRef.value.setCheckedKeys(customColumn.keys);
    } else {
      customColumnTreeRef.value.setCheckedKeys([]);
    }
  }

  //////////////////////////////////////////////////
  // 生命周期
  //////////////////////////////////////////////////
  onMounted(() => {
    merge(tableOptions, props.options);

    if (tableOptions.columns) {
      customColumn.keys = [];
      setCustomColumnId(tableOptions.columns, 'cusCol');
      handleRefreshCustomColumn();
    }

    if (tableOptions.autoLoad) {
      handleSearch();
    }
  });

  //////////////////////////////////////////////////
  // 暴露出去，父组件才可以调用到
  //////////////////////////////////////////////////
  defineExpose({
    tableInstance,
    tableOptions,
    handleQuery,
    handleReload,
    getSelectRows,
  });
</script>
