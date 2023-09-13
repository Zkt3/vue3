import {createStore} from 'vuex';
import axios from "axios";

const store = createStore({
  state() {
    //存储的单一状态，存储基本数据
    return {
      count: 0,
      msg:"zkt",
      hotList:[]
    };
  },
  mutations: {
    increment(state, value) {
      state.count += value;
    },
    updateHotList(state,value){
      state.hotList=value
    }
  },
  getters:{
    reverseMsg:function (state){
      return state.msg.split('').reverse().join('')
    },
    reverseMsgLength:function (state,getters){ //getters表示当前store中的getters对象
      return getters.reverseMsg.length
    }
  },
  actions:{
    getHot:function (context,payload){ //context：与store实例具有相同属性和方法的对象
      axios
          .get(
              '/path/api/mmdb/movie/v3/list/hot.json?ct=%E9%95%BF%E6%B2%99&ci=70&channelId=4',
          )
          .then((res) => {
            context.commit('updateHotList',res.data.data.hot)
            console.log(context.state.hotList)
          });
    }
  }
});

export default store;
