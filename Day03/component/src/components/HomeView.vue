<script>
  import Content from "./Content.vue";
  export default {
    data(){
      return{
        Message:"zzzzzzzz"
      }
    },
    provide(){
      return{
        Message:this.Message
      }
    },
    components:{
      Content
    }
  }
</script>

<template>
  <Content/>
</template>

<style>

</style>