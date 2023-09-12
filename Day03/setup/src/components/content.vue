<script>
import {ref,h} from "vue";
  export default {
    props:{
      message:{
        type:String,
        default:"111"
      }
    },
    setup(props,context){
      console.log(props.message)
      console.log(context.attrs.class)
      const counter =ref(20)
      function sendParents(){
        context.emit('injectCounter',counter.value)
      }

      context.expose({
        sendParents
      })
      return{sendParents}
    }
  }
</script>

<template>
  <h2>我是content组件</h2>
  <button @click="sendParents">传递数据</button>
</template>

<style scoped>

</style>