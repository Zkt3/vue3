### 使用Vite安装项目

​	Vite是一个web开发构建工具，由于其源生ES模块导入方式，可以实现闪电般的冷服务器启动

​	npm init vite@latest <project-name>-- --template vue

​	cd <project-name>

​	npm install 

​	npm run dev



### 声明式渲染

​	vue使用声明式渲染，可以提高开发效率

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



### 模板语法

#### 	v-once

​		使用v-once指令，当数据改变时，插槽处的内容不会更新

<script>
  export default {
    data(){
      return{
        num:0,
        uname:'zkt'
      }
    },
    methods:{
      changeUname(){
        this.uname='kt'
      }
    }
  }
</script>

<template>
  <div>
    <p>{{num}}</p>
    <p>{{uname}}</p>
    <p v-once>{{uname}}</p>
    <button @click="changeUname">改变uname的值</button>
  </div>
</template>

#### 	v-html

​		双大括号会将数据解释为普通文本，而非HTML代码

​		在站点上渲染html内容容易导致XSS攻击

<script>
  export default {
    data(){
      return{
        num:0,
        uname:'zkt',
        msg:"<h2>标题</h2>"
      }
    },
    methods:{
      changeUname(){
        this.uname='kt'
      }
    }
  }
</script>

<template>
  <div>
    <p>{{num}}</p>
    <p>{{uname}}</p>
    <p v-once>{{uname}}</p>
    <button @click="changeUname">改变uname的值</button>
    <p>{{msg}}</p>
    <p v-html="msg"></p>
  </div>
</template>



#### v-bind

​	动态的绑定属性的内容

	<p v-bind:id="id">v-bind绑定</p>

​	语法糖 <p :id="id">v-bind绑定</p>

#### v-on

<button v-on:click="changeColor">改变颜色</button>

​	语法糖<button @click="changeColor">改变颜色</button>

#### 使用JavaScript表达式

<p>{{num+1}}</p>
<p>{{uname.split('').reverse().join('')}}</p>



### 动态参数

#### 	动态属性

<p v-bind:[attributeName]="id">v-bind绑定</p>
<button v-on:click="attributeName='class'">改变属性</button>			

​	

#### 	动态事件

​	<button @[mouseEvent]="attributeName='class'">改变属性</button>

​	<button @click="mouseEvent='mouseover'">改变事件</button>



### 计算属性

#### 	和methods的区别

​	只要依赖值不变，就不会重新计算，计算属性将基于它们的响应依赖关系缓存

	computed:{
			reverseMsa:function (){
	    	return this.message.split('').reverse().join('')
	  }
	}
​	

#### 	getter和setter

​		计算属性默认只有getter，需要时可以自己提供一个setter，计算属性一般没有set，是只读属性

		reverseMsg:{
			get:function (){
	    	return this.message.split('').reverse().join('')
	  }
	}


### watch侦听器

#### 函数写法

```
watch:{
  message:function (newValue,oldValue){
    *console*.log(newValue)
    *console*.log(oldValue)
  }
}
```

每当message发生变化时，就会调用这个函数，可以在watch中执行异步操作或者复杂逻辑代码，一个数据会影响多个数据



#### 对象写法

	message:{
		immediate:true, //初始化的时候调用函数
	  handler:function (newValue){
	    if(newValue.length<5 || newValue.length>10){
	      *console*.log("输入框的内容不能小于5或者大于10")
	    }
	  }
	}


#### 深度监听(对象)

watch监听不到对象中属性的变化

```
user:{
  handler:function (newValue){
    *console*.log(newValue)
  },
  deep:true //侦听器会一层一层向下遍历，给对象每个属性都加上侦听器
}
```



### class与style绑定

#### 	class

##### 		class类名的对象使用方式(经常和computed联用)

​	

<script>
  export default {
    data(){
      return{
        isActive:true,
        error:null
      }
    },
    computed:{
      classobj:function (){
        return{
          active:this.isActive &&  !this.error
        }
      }
​    }
  }
</script>

<template>
  <div>
<!--第一种，放置字符串-->
    <p class="active">hello</p>
<!--第二种,放置对象-->
    <p :class="{active:isActive}">hello1</p>
    <button @click="isActive=!isActive">改变active</button>
    <p :class="classobj">hello2</p>
  </div>

</template>

<style scoped>
  .active{
    font-size: 50px;
    color: blue;
  }
</style>



##### 		class类名的数组使用方式

<p :class="[activeClass]">hello3</p>



#### 	style

<p style="color: red">hello</p>
<p :style="{color:activeColor,fontSize:fontSize,'background-color':bgColor}">hello1</p>



### 渲染

#### 	条件渲染

##### 			v-if