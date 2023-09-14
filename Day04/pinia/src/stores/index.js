import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAgeStore = defineStore('zkt', {
  state: () => {
    return {
      age: 20,
      name: '张三',
      arr: [1, 2, 3, 4],
    };
  },
  getters: {
    getAge(state) {
      return state.age + 5;
    },
  },
  actions: {
    addAge() {
      //this指向对应的store仓库
      this.age++;
    },
  },
});

export const useCounterStore = defineStore('main', () => {
  const counter = ref(30);
  const getCounter = computed(() => {
    return counter.value + 5;
  });
  function addCounter() {
    counter.value++;
  }
  return { counter, getCounter, addCounter };
});
