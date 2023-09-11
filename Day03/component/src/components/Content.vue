<script>
  import HelloWorld from "./HelloWorld.vue";
  export default {
    data(){
      return{
        msg:"helloWorld"
      }
    },
    components:{
      HelloWorld
    }
  }
</script>

<template>
  <HelloWorld :message="msg" zkt="zkt"></HelloWorld>
  <h2>我是content组件内容</h2>
  <h2>{{msg}}</h2>
</template>

<style scoped>

</style>