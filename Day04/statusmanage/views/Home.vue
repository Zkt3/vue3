<script setup>
import { inject, onMounted, reactive } from 'vue';
import axios from 'axios';

const store = inject('store');

onMounted(() => {
  axios
    .get(
      '/path/api/mmdb/movie/v3/list/hot.json?ct=%E9%95%BF%E6%B2%99&ci=70&channelId=4',
    )
    .then((res) => {
      console.log(res);
    });
});
</script>

<template>
  <div>{{ store.state.msg }}</div>
  <button @click="store.updateMsg()">改变msg</button>
</template>

<style scoped></style>
