<!--
 * @Description:
 * @Author: Ableson
 * @Date: 2022/2/18 15:25
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/18 15:25
 -->
<template>
  <div class="fixed h-full w-full flex flex-col justify-center items-center text-4xl">
    <div class="">位于主框架外的页面</div>
    <p @click="$router.go(-1)">Back</p>
  </div>
</template>
