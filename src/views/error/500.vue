<!--
 * @Description:
 * @Author: Ableson
 * @Date: 2022/3/27 16:28
 * @LastEditors: Ableson
 * @LastEditTime: 2022/3/27 16:28
 -->
<template>
  <div class="flex justify-center items-center h-screen-sm">
    <IconSvg icon="500" width="400" height="495" svg />
    <div class="ml-12">
      <p
        v-motion
        class="font-medium text-4xl mb-4"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 100,
          },
        }"
      >
        500
      </p>
      <p
        v-motion
        class="mb-4 text-gray-500"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300,
          },
        }"
      >
        抱歉，服务器出错了
      </p>
      <el-button
        v-motion
        type="primary"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 500,
          },
        }"
        @click="$router.push('/')"
        >返回首页</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: '500',
  };
</script>

<style scoped lang="less"></style>
