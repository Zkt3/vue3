<script >
  export default {
    data(){
      return{
        list:[1,3,6,4,5]
      }
    },
    methods:{
      changeList:function (){
      //   通过索引值去修改数组，vue3
      //   this.list[5]=7
      //   push,给数组末尾添加元素
      //    this.list.push(7,8,9)
      //   pop，删除数组最末尾的元素
      //   this.list.pop()
      //  shift,删除数组的第一位元素
      //     this.list.shift()
      //   unshift, 从数组首位开始添加元素
      //   this.unshift(0,9,9)
      //   splice(),删除元素、插入元素、替换元素
      //   第一个参数表示要操作的元素下标
      //   删除元素：第二个参数表示要删除几个元素(如果没有传入，则删除后面的所有元素)
      //   this.list.splice(1,2)
      //   插入元素：第二个参数传入0，并且后面接上要插入的参数
      //   this.list.splice(1,0,7,8,9)
      //   替换元素：第二个元素表示替换几个元素
      //   this.list.splice(1,3,7,8,9)
      //   sort,数组排序
      //   this.list.sort()
      //   reverse,翻转数组
        this.list.reverse()
      }

    }
  }
</script>

<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item">{{item}}</li>
    </ul>
    <button @click="changeList ">改变数组</button>
  </div>

</template>

<style scoped>

</style>
