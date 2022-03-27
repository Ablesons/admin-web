<template>
  <el-dialog v-model="show" top="5vh" append-to-body :before-close="handleClose">
    <el-input
      ref="inputRef"
      v-model="keyword"
      clearable
      placeholder="请输入关键词搜索"
      @input="handleSearch"
    >
      <template #prefix>
        <span class="el-input__icon">
          <IconOffLine icon="search" />
        </span>
      </template>
    </el-input>
    <div class="search-result-container">
      <el-empty v-if="resultOptions.length === 0" description="暂无搜索结果" />
      <SearchResult
        v-else
        v-model:value="activePath"
        :options="resultOptions"
        @click="handleEnter"
      />
    </div>
    <template #footer>
      <SearchFooter />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  interface Props {
    /** 弹窗显隐 */
    value: boolean;
  }
  interface Emits {
    (e: 'update:value', val: boolean): void;
  }
  import { useRouter } from 'vue-router';
  import { useDebounceFn, onKeyStroke } from '@vueuse/core';
  import { ref, watch, computed, nextTick, shallowRef } from 'vue';
  import SearchResult from './result.vue';
  import SearchFooter from './footer.vue';

  const emit = defineEmits<Emits>();
  const props = withDefaults(defineProps<Props>(), {});
  const router = useRouter();

  const keyword = ref('');
  const activePath = ref('');
  const inputRef = ref<HTMLInputElement | null>(null);
  const resultOptions = shallowRef([]);
  const handleSearch = useDebounceFn(search, 300);

  /** 菜单树形结构 */
  const menusData = computed(() => {
    return [];
  });

  const show = computed({
    get() {
      return props.value;
    },
    set(val: boolean) {
      emit('update:value', val);
    },
  });

  watch(show, async val => {
    if (val) {
      /** 自动聚焦 */
      await nextTick();
      inputRef.value?.focus();
    }
  });

  /** 将菜单树形结构扁平化为一维数组，用于菜单查询 */
  function flatTree(arr: any) {
    const res: any[] = [];
    function deep(arr) {
      arr.forEach((item: any) => {
        res.push(item);
        item.children && deep(item.children);
      });
    }
    deep(arr);
    return res;
  }

  /** 查询 */
  function search() {}

  function handleClose() {
    show.value = false;
    /** 延时处理防止用户看到某些操作 */
    setTimeout(() => {
      resultOptions.value = [];
      keyword.value = '';
    }, 200);
  }

  /** key up */
  function handleUp() {
    const { length } = resultOptions.value;
    if (length === 0) return;
    const index = resultOptions.value.findIndex((item: any) => item.path === activePath.value);
    if (index === 0) {
      activePath.value = resultOptions.value[length - 1]['path'];
    } else {
      activePath.value = resultOptions.value[index - 1]['path'];
    }
  }

  /** key down */
  function handleDown() {
    const { length } = resultOptions.value;
    if (length === 0) return;
    const index = resultOptions.value.findIndex((item: any) => item.path === activePath.value);
    if (index + 1 === length) {
      activePath.value = resultOptions.value[0]['path'];
    } else {
      activePath.value = resultOptions.value[index + 1]['path'];
    }
  }

  /** key enter */
  function handleEnter() {
    const { length } = resultOptions.value;
    if (length === 0 || activePath.value === '') return;
    router.push(activePath.value);
    handleClose();
  }

  onKeyStroke('Enter', handleEnter);
  onKeyStroke('ArrowUp', handleUp);
  onKeyStroke('ArrowDown', handleDown);
</script>

<style scoped lang="scss">
  .search-result-container {
    margin-top: 20px;
  }
</style>
