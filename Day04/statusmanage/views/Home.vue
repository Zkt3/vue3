<script setup>
import {inject, reactive} from "vue";

const store=inject('store')

</script>

<template>
  <div>{{store.state.msg}}</div>
  <button @click="store.updateMsg()">改变msg</button>
</template>

<style scoped>

</style>