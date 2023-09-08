<script >
  export default {
    data(){
      return{
        msg:"zkt",
        checked:"",
        fruits:[],
        city:[],
        cities:[]
      };
    }
  }
</script>

<template>
  <div>
    <input type="text" v-model="msg">
    <h2>{{msg}}</h2>
<!--    复选框-->
<!--    单个勾选框，v-model为布尔值-->
<input type="checkbox" v-model="checked">
    <h2>{{checked}}</h2>
<!--   多个勾选框 -->
    <input type="checkbox" v-model="fruits" value="苹果">苹果
    <input type="checkbox" v-model="fruits" value="梨子">梨子
    <input type="checkbox" v-model="fruits" value="西瓜">西瓜
    <input type="checkbox" v-model="fruits" value="荔枝">荔枝
    <input type="checkbox" v-model="fruits" value="哈密瓜">哈密瓜
    <h2>喜欢的水果:{{fruits}}</h2>
<!--    选项框-->
<!--    单选-->
    <select v-model="city">
      <option value="云霄">云霄</option>
      <option value="漳州">漳州</option>
      <option value="福建">福建</option>
    </select>
    <h2>{{city}}</h2>
<!--    多选-->
    <select v-model="cities" multiple >
      <option value="云霄">云霄</option>
      <option value="漳州">漳州</option>
      <option value="福建">福建</option>
    </select>
    <h2>{{ cities }}</h2>
  </div>
</template>

<style>

</style>
