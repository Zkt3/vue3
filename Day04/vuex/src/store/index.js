import { createStore } from 'vuex';

const store = createStore({
  state() {
    //存储的单一状态，存储基本数据
    return {
      count: 0,
      msg:"zkt"
    };
  },
  mutations: {
    increment(state, value) {
      state.count += value;
    },
  },
  getters:{
    reverseMsg:function (state){
      return state.msg.split('').reverse().join('')
    },
    reverseMsgLength:function (state,getters){ //getters表示当前store中的getters对象
      return getters.reverseMsg.length
    }
  }
});

export default store;
