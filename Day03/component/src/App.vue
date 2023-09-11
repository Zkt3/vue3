<script>
import content from "./components/Content.vue";
import HomeView from "./components/HomeView.vue";
export default {
  data(){
    return{
      msg:"App",
      message:''
    }
  },
  components:{
    content,
    HomeView
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
    <HomeView></HomeView>
    <content @injectMsg="getChild"></content>
    <h2>{{msg}}</h2>
    <p>--------------</p>
    {{message}}
  </div>

</template>

<style>

</style>
