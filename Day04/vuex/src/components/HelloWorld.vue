<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const count = computed(() => {
  return store.state.count;
});
const reverseMsg = computed(() => {
  return store.getters.reverseMsg;
});
const reverseMsgLength = computed(() => {
  return store.getters.reverseMsgLength;
});
function change(num) {
  store.commit('increment', num);
}
</script>

<template>
  <h1>{{ count }}</h1>
  <button @click="change(5)">count++</button>
  <h1>{{ reverseMsg }}</h1>
  <h1>{{ reverseMsgLength }}</h1>
</template>

<style scoped></style>
