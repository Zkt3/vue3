<script>
  export default {
    data(){
      return{
        isActive:true,
        error:null,
        activeClass:"active",
        activeColor:'red',
        fontSize:'50px',
        bgColor:'pink'
      }
    },
    computed:{
      classobj:function (){
        return{
          active:this.isActive &&  !this.error
        }
      }

    }
  }
</script>

<template>
  <div>
第一种，放置字符串
    <p class="active">hello</p>
<!--第二种,放置对象-->
    <p :class="{active:isActive}">hello1</p>
    <button @click="isActive=!isActive">改变active</button>
    <p :class="classobj">hello2</p>
    <p :class="[activeClass]">hello3</p>

    <p style="color: red">hello</p>
    <p :style="{color:activeColor,fontSize:fontSize,'background-color':bgColor}">hello1</p>
  </div>

</template>

<style scoped>
  .active{
    font-size: 50px;
    color: blue;
  }
</style>
