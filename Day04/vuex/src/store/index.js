import { createStore } from 'vuex';

const store = createStore({
  state() {
    //存储的单一状态，存储基本数据
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state, value) {
      state.count += value;
    },
  },
});

export default store;
