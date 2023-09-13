<script setup>
import { useRoute } from 'vue-router';

console.log(useRoute().params.id);
const props =defineProps({
  id:String
})
console.log(props)
</script>

<template>
  <h1>User</h1>
</template>

<style scoped></style>
