<script setup>
import store from '../store/index.js';
import Home from '../views/Home.vue';
import { provide } from 'vue';
provide('store', store);
</script>

<template>
  <div>
    <Home></Home>
  </div>
</template>

<style scoped></style>
