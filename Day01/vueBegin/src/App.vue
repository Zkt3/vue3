<script>
  export default {
    data(){
      return{
        num:0,
        uname:'zkt',
        msg:"<h2>标题</h2>",
        id:"d1"
      }
    },
    methods:{
      changeUname(){
        this.uname='kt'
      },
      changeColor(){
        this.id="d2"
      }
    }
  }
</script>

<template>
  <div>
    <p>{{num}}</p>
    <p>{{uname}}</p>
    <p v-once>{{uname}}</p>
    <button @click="changeUname">改变uname的值</button>
    <p>{{msg}}</p>
    <p v-html="msg"></p>
    <p v-bind:id="id">v-bind绑定</p>
    <!--使用JavaScript表达式-->
    <p>{{num+1}}</p>
    <p>{{uname.split('').reverse().join('')}}</p>
    <button v-on:click="changeColor">改变颜色</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
#d1{
  color: red;
}
#d2{
  color: blue;
}
</style>
