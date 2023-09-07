<script >
  export default {
    data(){
      return{
        age:18,
        sex:'man ',
        person:['张三','李四','王五']
      }
    }
  }
</script>

<template>
  <div>
    <p v-if="age>=18">成年人</p>
    <p v-else>小孩</p>

    <p v-show="sex==='man'">男生</p>
    <p v-show="sex==='woman'">女生</p>

    <ul>
      <li v-for="item in person" :key="item">{{item}}</li>
    </ul>

    <ul>
      <li v-for="(item,index) in person" :key="index">{{item}}-->{{index}}</li>
    </ul>
  </div>

</template>

<style scoped>

</style>
