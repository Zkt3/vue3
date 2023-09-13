<script setup>
  import {useStore} from "vuex";
  const store =useStore()
  function change(num){
      store.commit('increment',num)
  }
</script>

<template>
  <h1>{{$store.state.count}}</h1>
  <button @click="change(5)">count++</button>
</template>

<style scoped>

</style>
