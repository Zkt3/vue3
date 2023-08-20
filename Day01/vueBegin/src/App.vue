<script>
  export default {
    data(){
      return{
        num:0,
        uname:'zkt',
        msg:"<h2>标题</h2>",
        id:"d1",
        attributeName:"id",
        mouseEvent:"click"
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
    <!--动态参数-->
    <!--动态属性-->
    <p v-bind:[attributeName]="id">v-bind绑定</p>
    <button v-on:click="attributeName='class'">改变属性</button>
    <!--动态事件-->
    <button @[mouseEvent]="attributeName='class'">改变属性</button>
    <button @click="mouseEvent='mouseover'">改变事件</button>
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
.d1{
  font-size: 32px;
}
</style>
