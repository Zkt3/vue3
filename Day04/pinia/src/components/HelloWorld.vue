<script setup>
import { useAgeStore, useCounterStore } from '../stores/index.js';
import { storeToRefs } from 'pinia';
const ageStore = useAgeStore();
const countStore = useCounterStore();
const { counter, getCounter } = storeToRefs(countStore);
const { addCounter } = countStore;
</script>

<template>
  <h2>{{ ageStore.age }}</h2>
  <h2>{{ ageStore.getAge }}</h2>
  <button @click="ageStore.addAge()">改变age</button>

  <h2>{{ counter }}</h2>
  <h2>{{ getCounter }}</h2>
  <button @click="addCounter()">改变counter</button>
</template>

<style scoped></style>
