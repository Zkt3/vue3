<script >
  export default {
    data(){
      return{
        message:"你好",
        age:0,
        user:{
          name:'zkt'
        }
      };
    },
    methods:{

    },
    watch:{
      // message:function (newValue,oldValue){
      //   console.log(newValue)
      //   console.log(oldValue)
      //   if(newValue.length<5 || newValue.length>10){
      //     console.log("输入框的内容不能小于5或者大于10")
      //   }
      // }

      message:{
        immediate:true,
        handler:function (newValue){
          if(newValue.length<5 || newValue.length>10){
            console.log("输入框的内容不能小于5或者大于10")
          }
        }
      },
      // user:{
      //   handler:function (newValue){
      //     console.log(newValue)
      //   },
      //   deep:true
      // }
      "user.name":{
        handler:function (newValue){
          console.log(newValue)
        },
        deep:true
      }
    }
  }
</script>

<template>
  <div>
    <p>{{message}}</p>
    <button @click="message='你好'">改变message</button>
    <input type="text" v-model="message">
    <p>{{user.name}}</p>
    <button @click="user.name='zzkt'">改变名字</button>
  </div>
</template>

<style scoped>

</style>
