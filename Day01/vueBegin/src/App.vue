<script>
  export default {
    data(){
      return{
        num:0,
        uname:'zkt'
      }
    }
  }
</script>

<template>
  <div>
    <p>{{num}}</p>
    <p>{{uname}}</p>
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
</style>
