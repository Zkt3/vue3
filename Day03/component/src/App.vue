<script>
import content from "./components/Content.vue";
export default {
  data(){
    return{
      msg:"App"
    }
  },
  components:{
    content
  }
}
</script>

<template>
  <div>
    <content></content>
    <h2>{{msg}}</h2>
  </div>

</template>

<style>

</style>
