<script setup>
import Parent from "./views/Parent.vue";
</script>

<template>
  <h1>Hello App!</h1>
  <p>
    <!--使用 vue-router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<vue-router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
    <router-link to="/user/123">Go to User</router-link>
    <router-link to="/news/456">Go to News</router-link>
    <router-link to="/parent">Go to Parent</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>

<style scoped></style>
