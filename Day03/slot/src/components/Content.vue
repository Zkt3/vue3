<script>
  export default {
    data(){
      return{
        list:[1,2,3,4,5,6]
      }
    }
  }
</script>

<template>
  <h2>Content组件内容</h2>
  <slot name="button"></slot>
  <slot name="input"></slot>
  <slot name="h2"></slot>

  <slot :list="list"></slot>
</template>

<style scoped>

</style>