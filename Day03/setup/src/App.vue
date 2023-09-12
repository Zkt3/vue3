<script>
  import content from "./components/content.vue";
  import {ref, reactive, toRefs, watch, watchEffect, computed, provide} from "vue";


  export default {
    data(){
      return{
        message:"helloWord"
      }
    },

    setup(){
      let msg="hello"
      function changeMsg(){
        msg="nihao"
      }

      const counter =ref(0)
      function changeCounter(){
        counter.value++
      }

      const obj=reactive({
        name:"张三",
        age:30,
        children:{
          name:"小张"
        }
      })

      watch(counter,(newVal,oldVal)=>{
        console.log(newVal)
        console.log(oldVal)
      })

      watchEffect(()=>{
        console.log(obj.name)
      })

      const zkt =ref("zkt")
      const reverseZkt =computed(()=>{
        return zkt.value.split('').reverse().join('')
      })
      console.log(reverseZkt.value)
      const injectCounter=function (value){
        console.log(value)
      }


      const name =ref("zkt")
      provide('name',name)
      function changeName(){
        name.value="zzq"
      }
      return {msg,changeMsg,counter,changeCounter,obj,...toRefs(obj),reverseZkt,injectCounter,changeName}
    },
    components:{
      content
    }
  }
</script>

<template>
  <div>
    {{msg}}
    {{counter}}
    <button @click="changeMsg">改变msg</button>
    <button @click="changeCounter">改变counter</button>
    <content :message="message" class="box" id="content" @injectCounter='injectCounter'></content>
    <button @click="changeName">改变名字</button>
  </div>
</template>

<style scoped>

</style>
