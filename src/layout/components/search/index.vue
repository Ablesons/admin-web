<template>
  <div class="search-container" @click="handleSearch">
    <IconOffLine icon="search" />
  </div>
  <SearchModal v-model:value="show" />
</template>

<script setup lang="ts">
  import SearchModal from './components/index.vue';
  import useBoolean from '../../hooks/useBoolean';
  const { bool: show, toggle } = useBoolean();
  function handleSearch() {
    toggle();
  }
</script>

<style scoped lang="scss">
  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 48px;
    cursor: pointer;

    &:hover {
      background: #f6f6f6;
    }
  }
</style>
