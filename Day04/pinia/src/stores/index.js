import { defineStore } from 'pinia';

const useAgeStore = defineStore('zkt', {
  state: () => {
    return { age: 20 };
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
