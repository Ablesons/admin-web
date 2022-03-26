<!--
 * @Description: 登录页面
 * @Author: Ableson
 * @Date: 2022/3/26 16:27
 * @LastEditors: Ableson
 * @LastEditTime: 2022/3/26 16:27
 -->
<template>
  <img :src="bg" class="wave" alt="img" />
  <div class="login-container">
    <div class="img">
      <IconSvg icon="illustration" svg />
    </div>
    <div class="login-box">
      <div class="login-form">
        <img :src="logo" class="avatar" alt="" />
        <h2
          v-motion
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
          Vue3.x-Admin
        </h2>
        <div
          v-motion
          class="input-group user focus"
          :initial="{
            opacity: 0,
            y: 100,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 200,
            },
          }"
        >
          <div class="icon">
            <IconOffLine icon="fa-user" width="14" height="14" />
          </div>
          <div>
            <h5>用户名</h5>
            <input
              v-model="user"
              type="text"
              class="input"
              @focus="onUserFocus"
              @blur="onUserBlur"
            />
          </div>
        </div>
        <div
          v-motion
          class="input-group pwd focus"
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
          <div class="icon">
            <IconOffLine icon="fa-lock" width="14" height="14" />
          </div>
          <div>
            <h5>密码</h5>
            <input
              v-model="pwd"
              type="password"
              class="input"
              @focus="onPwdFocus"
              @blur="onPwdBlur"
            />
          </div>
        </div>
        <button
          v-motion
          class="btn"
          :initial="{
            opacity: 0,
            y: 10,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 400,
            },
          }"
          @click="onLogin"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { addClass, removeClass } from '/@/utils/operate';
  import bg from '/@/assets/img/bg.png';
  import logo from '/@/assets/logo.png';

  const router = useRouter();
  let user = ref('admin');
  let pwd = ref('123456');

  const onLogin = (): void => {
    router.push('/');
  };

  function onUserFocus() {
    addClass(document.querySelector('.user'), 'focus');
  }

  function onUserBlur() {
    if (user.value.length === 0) removeClass(document.querySelector('.user'), 'focus');
  }

  function onPwdFocus() {
    addClass(document.querySelector('.pwd'), 'focus');
  }

  function onPwdBlur() {
    if (pwd.value.length === 0) removeClass(document.querySelector('.pwd'), 'focus');
  }
</script>

<style scoped>
  @import url('/@/style/common/login.css');
</style>
