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
    },
    methods:{
      sendParent:function (){
        this.$emit('injectMsg',this.msg)
      }
    },
    mounted() {
      console.log(this.$refs.hello.a)
    }
  }
</script>

<template>
  <HelloWorld :message="msg" zkt="zkt" ref="hello"></HelloWorld>
  <h2>我是content组件内容</h2>
  <h2>{{msg}}</h2>
  <button @click="sendParent">将数据提交给父组件</button>
</template>

<style scoped>

</style>