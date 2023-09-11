<script>
  export default {
    // props:['message',"zkt"]
    props:{
      message:{
        type:String, //限制类型
        default:"您好", //设置默认值
        required:true  //是否必传
      }
    }
  }
</script>

<template>
  <div>
    hello
    <h2>{{message}}</h2>
<!--    <h2>{{zkt}}</h2>-->
  </div>
</template>

<style>

</style>
