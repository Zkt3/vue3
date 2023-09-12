<script>
  import content from "./components/content.vue";
  import {ref,reactive,toRefs,watch,watchEffect,computed} from "vue";
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
      return {msg,changeMsg,counter,changeCounter,obj,...toRefs(obj),reverseZkt}
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
    <content></content>
  </div>
</template>

<style scoped>

</style>
