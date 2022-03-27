<template>
  <div class="search-footer">
    <span class="search-footer-item">
      <IconSvg icon="enter" width="20" height="20" svg class="icon" />
      确认
    </span>
    <span class="search-footer-item">
      <IconOffLine icon="arrow-up-line" class="icon" />
      <IconOffLine icon="arrow-down-line" class="icon" />
      切换
    </span>
    <span class="search-footer-item">
      <IconSvg icon="esc" width="20" height="20" svg class="icon" />
      关闭
    </span>
  </div>
</template>

<style scoped lang="scss">
  .search-footer {
    display: flex;
    color: #333;

    .search-footer-item {
      display: flex;
      align-items: center;
      margin-right: 14px;
    }

    .icon {
      padding: 2px;
      margin-right: 3px;
      font-size: 20px;
      box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
    }
  }
</style>
