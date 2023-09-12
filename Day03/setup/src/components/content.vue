<script>
import {ref,h,inject} from "vue";
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

      const name =inject('name')
      return{sendParents,name}
    }
  }
</script>

<template>
  <h2>我是content组件</h2>
  <button @click="sendParents">传递数据</button>
  {{name}}
</template>

<style scoped>

</style>