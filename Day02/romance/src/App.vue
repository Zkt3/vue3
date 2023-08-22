<script >
  export default {
    data(){
      return{
        age:18,
        sex:'man '
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
  </div>

</template>

<style scoped>

</style>
