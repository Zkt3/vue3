<script setup>
import { useAgeStore } from '../stores/index.js';
import { storeToRefs } from 'pinia';
const ageStore = useAgeStore();
const { age, name, arr } = storeToRefs(ageStore);
function change() {
  //方法一:直接修改
  // ageStore.age++;
  //方法二:批量修改 $patch(对象)
  // ageStore.$patch({
  //   age:40,
  //   name:"zkt",
  //   arr:[...ageStore.arr,5]
  // })
  //方法三：批量修改 $patch(函数)
  ageStore.$patch((state) => {
    state.age = 40;
    state.name = 'zkt';
    state.arr.push(5);
  });
}
</script>

<template>
  {{ age }}
  {{ name }}
  {{ arr }}
  <button @click="change">修改</button>
</template>

<style scoped></style>
