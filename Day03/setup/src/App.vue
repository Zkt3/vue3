<script>
  import content from "./components/content.vue";
  import {ref,reactive,toRefs} from "vue";
  export default {
    data(){
      return{
        message:"helloWord"
      }
    },
    setup(){
      let msg="hello"
      function changeMsg(){
        msg="nihao"
      }

      const counter =ref(0)
      function changeCounter(){
        counter.value++
      }

      const obj=reactive({
        name:"张三",
        age:30,
        children:{
          name:"小张"
        }
      })
      return {msg,changeMsg,counter,changeCounter,obj,...toRefs(obj)}
    },
    components:{
      content
    }
  }
</script>

<template>
  <div>
    {{msg}}
    {{counter}}
    <button @click="changeMsg">改变msg</button>
    <button @click="changeCounter">改变counter</button>
    <content></content>
  </div>
</template>

<style scoped>

</style>
