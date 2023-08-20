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