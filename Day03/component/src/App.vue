<script>
import content from "./components/Content.vue";
export default {
  data(){
    return{
      msg:"App",
      message:''
    }
  },
  components:{
    content
  },
  methods:{
    getChild:function (value){
      this.message=value
    }
  }
}
</script>

<template>
  <div>
    <content @injectMsg="getChild"></content>
    <h2>{{msg}}</h2>
    <p>--------------</p>
    {{message}}
  </div>

</template>

<style>

</style>
