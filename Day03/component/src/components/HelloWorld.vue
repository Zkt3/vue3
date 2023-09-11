<script>
  export default {
    data(){
      return{
        a:10
      }
    },
    // props:['message',"zkt"]
    props:{
      message:{
        type:String, //限制类型
        default:"您好", //设置默认值
        required:false  //是否必传
      }
    },
    inject:['Message']
  }
</script>

<template>
  <div>
    hello
    <h2>{{message}}</h2>
<!--    <h2>{{zkt}}</h2>-->
    <p>-----</p>
    <h2>{{Message}}</h2>
  </div>
</template>

<style>

</style>
