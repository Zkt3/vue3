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

##### 			v-if(运行条件很少改变，一次性)				

	<p v-if="age>=18">成年人</p>
	<p v-else>小孩</p>

##### 		v-show(频繁切换状态)

	<p v-show="sex==='man'">男生</p>
	<p v-show="sex==='woman'">女生</p>

带有v-show的元素始终会被渲染并保留在DOM中，v-show只是简单地切换元素的display属性，v-show不支持template元素，也不支持v-else，v-if只要为false，对应的元素以及子元素都不会被渲染，用来控制DOM元素的创建和销毁



#### 	列表渲染(v-for)

	<ul>
			<li v-for="(item,index) in person" :key="index">{{item}}-->{{index}}</li>
	</ul>
v-for使用数组，item代表数组中每一个元素，index表示数组元素的下标

v-for使用对象，item表示键值，key表示键名，index表示下标

v-for为什么要有key

​	key是唯一标识，为了给Vue一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，快速找到节点，减少渲染次数，提升渲染性能



### 数组更新

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
      }  }
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



### 事件修饰符

​	Vue.js为v-on提供了事件修饰符，修饰符是由.开头的指令后缀来表示的

#### .stop(阻止事件冒泡)

​	@click.stop

#### .prevent(阻止默认行为)

​	@click.prevent

#### .once(只触发一次回调)

​	@click.once



### 按键修饰符

​	@keyup.enter 



### v-model

​	本质是两个操作:

​		1.v-bind绑定一个value属性

​		2.v-on给当前元素添加一个input事件

#### 	

<script >
  export default {
    data(){
      return{
        msg:"zkt"
      };
    }
  }
</script>

<template>
  <div>
    <input type="text" v-model="msg">
    <h2>{{msg}}</h2>
  </div>
</template>

<style>
</style>

#### 复选框

​	<!--    单个勾选框，v-model为布尔值-->
<input type="checkbox" v-model="checked">

    <h2>{{checked}}</h2>
<!--   多个勾选框 -->
    <input type="checkbox" v-model="fruits" value="苹果">苹果
    <input type="checkbox" v-model="fruits" value="梨子">梨子
    <input type="checkbox" v-model="fruits" value="西瓜">西瓜
    <input type="checkbox" v-model="fruits" value="荔枝">荔枝
    <input type="checkbox" v-model="fruits" value="哈密瓜">哈密瓜
    <h2>喜欢的水果:{{fruits}}</h2>



#### 选项框

​	<!--    单选-->

    <select v-model="city">
      <option value="云霄">云霄</option>
      <option value="漳州">漳州</option>
      <option value="福建">福建</option>
    </select>
    <h2>{{city}}</h2>
<!--    多选-->
    <select v-model="cities" multiple >
      <option value="云霄">云霄</option>
      <option value="漳州">漳州</option>
      <option value="福建">福建</option>
    </select>
    <h2>{{ cities }}</h2>



#### v-model修饰符

##### 	.lazy( 输入框失去焦点再去同步输入框的数据)

​		v-model.lazy

##### 	.number(将输入框中的内容自动转为数字类型)

​		v-model.number

##### 	.trim(自动过滤用户输入的首尾空白字符)

​		v-model.trim

​	



### vue组件

​	vue组件是带有名称的可复用的实例，单独模块的封装

#### 父组件向子组件传递数据(Prop)

##### 	数组形式

<script>
  import HelloWorld from "./HelloWorld.vue";
  export default {
    data(){
      return{
        msg:"helloWorld"
      }
    },
    components:{
      HelloWorld
    }
  }
</script>

<template>
  <HelloWorld :message="msg" zkt="zkt"></HelloWorld>
  <h2>我是content组件内容</h2>
  <h2>{{msg}}</h2>
</template>

<style scoped>
</style>

<script>
  export default {
    props:['message',"zkt"]
  }
</script>

<template>
  <div>
    hello
    <h2>{{message}}</h2>
    <h2>{{zkt}}</h2>
  </div>
</template>

<style>
</style>



##### 对象形式

	props:{
		message:{
	    type:String, //限制类型
	    default:"您好", //设置默认值
	    required:true  //是否必传
	  }
	}
​	传的值为数组或对象时，默认值必须从一个工厂函数返回

​		default(){

​			return []

}



##### 单向数据流

​	所有的prop都使得其父子prop实现单向下行绑定，父组件的更新会向下流动到子组件，但反过来则不行



#### 子组件向父组件传递数据(自定义事件)

​	this.$emit('自定义事件的名称', '发送的事件参数')



子组件:

<button @click="sendParent">将数据提交给父组件</button>

	methods:{
		sendParent:function (){
	    this.$emit('injectMsg',this.msg)
	  }
	}


父组件:

<content @injectMsg="getChild"></content>

methods:{
  getChild:function (value){
    	this.message=value
 	 }
}



#### 父子组件访问方式

##### 	父组件访问子组件($refs)

​		<HelloWorld :message="msg" zkt="zkt" ref="hello"></HelloWorld>

​		mounted() {

 		 *console*.log(this.$refs.hello.a)

​		}	



##### 	子组件访问父组件($parent)

​		this.$parent即可拿到父组件的值，但由于开发中组件的复用性，一个组件可能有多个父组件，所以在开发中尽量少使用，一般用props拿到父组件的值



##### 	子组件访问根组件($root)

​		this.$root



#### 组件间的跨级通信(provide&&inject)

​	若要访问组件实例property，需要将provide转换为返回对象的函数

##### 	基本使用

		provide(){
	  	return{
	    	Message:this.Message
	  	}
	},
	
	
	inject:['Message']
##### 	响应式

​		provide和inject默认情况下不是响应式

​		1.响应式对象方式

				provide(){
					return{
						obj:this.obj
				}
		},
​	2.函数返回响应式数据(一般和computed联用)

			provide(){
				return{
					message:()=>this.message
			}
	},
	
	另一个组件中的computed:
		computed:{
			newMsg:function(){
				return this.message()
			}
		}

### 插槽

#### 	插槽的基本使用(slot)

​		插槽相当于一个占位符

<script setup>

</script>

<template>
  <h2>Content组件内容</h2>
  <slot></slot>
</template>

<style scoped>
</style>

<script>
  import Content from "./components/Content.vue";
  export default {
    components:{
      Content
    }
  }
</script>

<template>
  <div>
    <Content><button>按钮</button></Content>
    <Content><input></Content>
  </div>
</template>

<style scoped>
</style>



#### 	具名插槽(v-slot)

##### 		具名插槽的使用

​		可以为不同插槽分配独立的ID，决定内容应该渲染到什么地方，v-slot只能添加在template标签上

<script setup>

</script>

<template>
  <h2>Content组件内容</h2>
  <slot name="button"></slot>
  <slot name="input"></slot>
  <slot name="h2"></slot>
</template>

<style scoped>
</style>

<script>
  import Content from "./components/Content.vue";
  export default {
    components:{
      Content
    }
  }
</script>

<template>
  <div>
    <Content><button>按钮</button></Content>
    <Content><input></Content>

​    <Content>
      <template v-slot:button><button>按钮</button></template>
      <template v-slot:input><input></template>
      <template v-slot:h2><h2>插槽</h2></template>
​    </Content>
  </div>
</template>

<style scoped>
</style>



##### 	渲染作用域

​		父级模板里的所有内容都是在父级作用域中编译的，子模板里的所有内容都是在子作用域中编译的



##### 	备用内容

​		为插槽指定备用内容，只会在没有提供内容时被渲染



#### 作用域插槽

​	父组件替换插槽的标签，但是数据由子组件提供

​	

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



<script>
  import Content from "./components/Content.vue";
  export default {
    components:{
      Content
    }
  }
</script>

<template>
  <div>
    <Content><button>按钮</button></Content>
    <Content><input></Content>

​    <Content>
      <template v-slot:button><button>按钮</button></template>
      <template v-slot:input><input></template>
      <template v-slot:h2><h2>插槽</h2></template>
​    </Content>

​    <Content>
      <template v-slot:default="slotProps">
        <ul>
          <li v-for="item in slotProps.list" :key="item">
            {{item}}
          </li>
        </ul>
      </template>
​    </Content>
​    <Content>
      <template v-slot:default="slotProps">
        <ol>
          <li v-for="item in slotProps.list" :key="item">
            {{item}}
          </li>
        </ol>
      </template>
​    </Content>
  </div>
</template>

<style scoped>
</style>



### Vue生命周期

#### 	图示![img](https://img-blog.csdnimg.cn/28424bc0ceb5489d87f1f75516bd9101.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAc3VwZXLnoIHlips=,size_20,color_FFFFFF,t_70,g_se,x_16)





### 组合式API

​	将同一个逻辑关注点相关代码收集在一起，setup选项在组件被创建之前执行，它是围绕beforecreated和created生命周期钩子运行的，所以不需要显示地定义它们，不需要使用this，this不会指向实例

#### 	初使用(非响应式 )

<script>
  import content from "./components/content.vue";
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
      return {msg,changeMsg}
    },
    components:{
      content
    }
  }
</script>

<template>
  <div>
    {{msg}}
    <button @click="changeMsg">改变msg</button>
    <content></content>
  </div>
</template>

<style scoped>
</style>



#### 	带ref的响应式变量

​		import {ref} from "vue";

​		const conter =ref(0)



#### 	定义引用类型(reactive)

​		import {reactive} from "vue";

		const obj=reactive({
	  	name:"张三",
	  	age:30,
	  	children:{
	    	name:"小张"
	  	}
	})


#### 	toRefs(使解构后的数据重新获得响应式)

​		通过ES6扩展运算符进行解构使得对象中的属性不是响应式的

​		

#### 	在setup中使用watch(无法深度监听)

​		import {watch} from "vue";

​		watch(侦听的响应式引用,回调函数)

		watch(counter,(newVal,oldVal)=>{
			console.log(newVal)
	  	console.log(oldVal)
		})


#### 	watchEffect进行深度监听 

​		import {watchEffect} from "vue";

​		watchEffect(回调函数 )

​		不需要制度监听的属性，组件初始化的时候会执行一次回调函数，自动收集依赖

		watchEffect(()=>{
			console.log(obj.name)
		})


#### 	watch和watchEffect的区别

​		1.watchEffect不需要制度监听的属性，自动收集依赖，只要在回调中引用了响应式的属性，只要这些属性发生改变，回调就会执行，watch只能侦听指定的属性，做出回调函数的执行，Vue3后可以侦听多个

​		2.watch可以获取新值和旧值



#### 	setup中使用computed

​		返回一个带有value属性的对象

​		import {computed} from "vue";

​		

#### 	setup中使用生命周期

​		import {onBeforeMount,onMounted,onBeforeUpdate,onUpdated} from "vue";

​	

#### 	setup中的参数

##### 		props

​			setup函数中的第一个参数是props，它是响应式的，当传入新的props时，它将被更新

<script>
  export default {
    props:{
      message:{
        type:String,
        default:"111"
      }
    },
    setup(props){
      console.log(props.message)
    }
  }
</script>



##### 	context

###### 		context.attrs

​			<content :message="message" class="box" id="content"></content>	

			setup(props,context){
	  		console.log(context.attrs)
			}
​	

###### 		context.slots

​			等同于$slots

​	

###### 		context.emit

​			方法，等同于$emit

			const counter =ref(20)
			function sendParents(){
	  		context.emit('injectCounter',counter.value)
			}


###### 		context.expose

​			暴露公共函数

```
		function sendParents(){
  		context.emit('injectCounter',counter.value)
	}

		context.expose({
  		sendParents
	})
```



#### 	setup中使用provide和inject

​		import {provide} from "vue";

		const name =ref("zkt")
		provide('name',name)

​		import {inject} from "vue";

```
const name =inject('name')
```



#### SFC规范语法

<script setup>是在SFC中使用组合式API编译时的语法糖，里面的代码会被编译成setup函数中的内容



### router路由

​	路由可以理解为指向，路由核心就是改变URL，但是页面不进行整体刷新

#### 	路由表

​		路由表是一个映射表，一个路由就是一组映射关系，key:value

​		key：表示路由

​		value：可以为function或component

#### 	vue-router

​		vue-router是基于路由和组件的，路由是用来设定访问路径，将路径和组件映射起来

##### 		安装

​			npm install vue-router@4

##### 		基本使用	

<script setup></script>

<template>
  <h1>Hello App!</h1>
  <p>
    <!--使用 vue-router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<vue-router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>

<style scoped></style>

​			

​			js文件存放的位置:

##### 					![截屏2023-09-12 20.54.43](/Users/zkt/Library/Application Support/typora-user-images/截屏2023-09-12 20.54.43.png)

```
	import {createRouter,createWebHashHistory} from "vue-router";
// 1. 定义路由组件.
// 也可以从其他文件导入
import Home from "../views/Home.vue";
import About from "../views/About.vue";
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
​    { path: '/', component: Home },
​    { path: '/about', component: About },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
export default router
```

​		路由组件存放的位置

​		![截屏2023-09-12 20.57.31](/Users/zkt/Library/Application Support/typora-user-images/截屏2023-09-12 20.57.31.png)

​	

​		在main.js中挂载

		import {createApp} from 'vue'import './style.css'
		import App from './App.vue'
		import router from "./router/index.js";
		const app=createApp(App)
		app.use(router) //要在mount之前
		app.mount('#app')


#### 	带参数的动态路由匹配

		{
			path: '/user/:id',
	  	component: User,
		},
		 <router-link to="/user/123">Go to User</router-link>