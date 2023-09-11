<script>
  import content from "./components/content.vue";
  import {ref} from "vue";
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
      return {msg,changeMsg,counter,changeCounter}
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
