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


#### 	404页面

		{
			path: '/:path(.*)',
	  	component: NotFound
		}


#### 	路由正则与重复参数

		{
			// 一定是数字
	  	// path: '/news/:id(\\d+)',
	  	// 可以有多个参数
	  	// path: '/news/:id+',
	  	// 参数可有可无，*参数可以重复叠加，？则不能
	  	// path: '/news/:id*',
	  	path: '/news/:id?',
	  	component: News
		}


#### 	嵌套路由

	{
		path: '/parent',
	  component: Parent,
	  children: [
	    {
	      path: 'styleone',
	      component: Styleone,
	    },
	    {
	      path: 'styletwo',
	      component: Styletwo,
	    },
	  ],
	},


#### 	通过js跳转

```
import {useRouter} from 'vue-router';
const router = useRouter();
// 字符串路径router.push('/users/eduardo')

// 带有路径的对象
router.push({ path: '/users/eduardo' })

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })

接收：
import {useRoute} from 'vue-router';
const route = useRoute();
const Param1 = route.query.id;
if (Param1) {
   id.value = Param1;
}
```

​	**注意**：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path` ：

```
const username = 'eduardo'

// 我们可以手动建立 url，但我们必须自己处理编码
router.push(`/user/${username}`) // -> /user/eduardo
// 同样
router.push({ path: `/user/${username}` }) // -> /user/eduardo
// 如果可能的话，使用 `name` 和 `params` 从自动 URL 编码中获益
router.push({ name: 'user', params: { username } }) // -> /user/eduardo
// `params` 不能与 `path` 一起使用
router.push({ path: '/user', params: { username } }) // -> /user
```



#### 	替换当前位置

		router.push({ path: '/home', replace: true })
		// 相当于
		router.replace({ path: '/home' })


#### 	前进后退

```
// 向前移动一条记录，与 router.forward() 相同
router.go(1)

// 返回一条记录，与 router.back() 相同
router.go(-1)

// 前进 3 条记录
router.go(3)

// 如果没有那么多记录，静默失败
router.go(-100)
router.go(100)
```



#### 	命名路由和命名视图

##### 		命名路由

		const routes = [
	    {
	    path: '/user/:username',
	    name: 'user',
	    component: User,
	  },
	]
	要链接到一个命名的路由，可以向 router-link 组件的 to 属性传递一个对象：
	<router-link :to="{ name: 'user', params: { username: 'erina' }}">
	  User
	</router-link>
	这跟代码调用 router.push() 是一回事：
	router.push({ name: 'user', params: { username: 'erina' } })
##### 		命名视图

	const router = createRouter({
	history: createWebHashHistory(),
	  routes: [
	    {
	      path: '/',
	      components: {
	        default: Home,
	        // LeftSidebar: LeftSidebar 的缩写
	        LeftSidebar,
	        // 它们与 `<router-view>` 上的 `name` 属性匹配
	        RightSidebar,
	      },
	    },
	  ],
	})
	const router = createRouter({
	  history: createWebHashHistory(),
	  routes: [
	    {
	      path: '/',
	      components: {
	        default: Home,
	        // LeftSidebar: LeftSidebar 的缩写
	        LeftSidebar,
	        // 它们与 `<router-view>` 上的 `name` 属性匹配
	        RightSidebar,
	      },
	    },
	  ],
	})
	


#### 	重定向和别名

##### 	重定向

###### 		重定向(path)

	{
		path: '/',
	  redirect: '/home',
	},
	{
	  path: '/home',
	  component: Home,
	},
###### 		重定向(name)

```
{
  path: '/',
  redirect:{name:'home'}
},
{
  path: '/home',
  name:'name',
  component: Home,
},
```

###### 		重定向(function)

```
{
  path: '/',
  redirect:(to)=>{
    return{path:'/home'}
  }
},
{
  path: '/home',
  name:'name',
  component: Home,
},
```

##### 别名

	{
		path: '/parent',
	  component: Parent,
	  alias:['father','fuqin'],
	  children: [
	    {
	      path: 'styleone',
	      component: Styleone,
	    },
	    {
	      path: 'styletwo',
	      component: Styletwo,
	    },
	  ],
	},


#### 路由组件传参

	const User = {
	// 请确保添加一个与路由参数完全相同的 prop 名
	  props: ['id'],
	  template: '<div>User {{ id }}</div>'
	}
	const routes = [{ path: '/user/:id', component: User, props: true }]
	
	接收：
	const props =defineProps({
		id:String
	})


#### 不同的历史记录模式

##### 	Hash模式

​		它在内部传递的实际 URL 之前使用了一个哈希字符（`#`）。由于这部分 URL 从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理

​		hash 模式是用 `createWebHashHistory()` 创建的：

	import { createRouter, createWebHashHistory } from 'vue-router'
	const router = createRouter({
	  history: createWebHashHistory(),
	  routes: [
	    //...
	  ],
	})

##### 	HTML5 模式

​		用 `createWebHistory()` 创建 HTML5 模式

	import { createRouter, createWebHistory } from 'vue-router'
	const router = createRouter({
	  history: createWebHistory(),
	  routes: [
	    //...
	  ],
	})



#### 路由守卫

##### 	router.beforeEach(全局守卫)

​		注册一个全局前置守卫	**`to`**: 即将要进入的目标 **`from`**: 当前导航正要离开的路由

		const router = createRouter({ ... })
		router.beforeEach((to, from) => {
	  // ...
	  // 返回 false 以取消导航
	  return false
	})

	router.beforeEach(async (to, from) => {
		if (
	     // 检查用户是否已登录
	     !isAuthenticated &&
	     // ❗️ 避免无限重定向
	     to.name !== 'Login'
	   ) {
	     // 将用户重定向到登录页面
	     return { name: 'Login' }
	   }
	 })
用户验证身份：

	router.beforeEach((to, from, next) => {
	  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
	  else next()
	})


##### 	router.beforeEnter(路由独享的守卫 )

```
{
  path: '/about',
  component: About,
  beforeEnter:(to,from,next)=>{
    *console*.log(to);
    *console*.log(from);
    next()
  }
},
```



##### 	组件内的路由

```
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import { ref } from 'vue'

export default {
  setup() {
    // 与 beforeRouteLeave 相同，无法访问 `this`
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      )
      // 取消导航并停留在同一页面上
      if (!answer) return false
    })
```



    const userData = ref()
    
    // 与 beforeRouteUpdate 相同，无法访问 `this`
    onBeforeRouteUpdate(async (to, from) => {
      //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
      if (to.params.id !== from.params.id) {
        userData.value = await fetchUser(to.params.id)
      }
    })
    },
    }


#### 	路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

```
const Home=()=>import('../views/Home.vue')

{
  path: '/home',
  name:'name',
  component: Home,
},
```



### 状态管理(不用vuex)

​		状态(数据)放置的位置：

![截屏2023-09-13 16.58.52](/Users/zkt/Library/Application Support/typora-user-images/截屏2023-09-13 16.58.52.png)

```
import { reactive } from 'vue';

const *store* = {
  state: reactive({
    msg: 'hello',
  }),
  updateMsg: function () {
    this.state.msg = '你好';
  },
};

export default *store*;
```

<script setup>
import {inject, reactive} from "vue";

const store=inject('store')

</script>

<template>
  <div>{{store.state.msg}}</div>
  <button @click="store.updateMsg()">改变msg</button>
</template>

<style scoped>
</style>



<script setup>
import store from '../store/index.js';
import Home from '../views/Home.vue';
import { provide } from 'vue';
provide('store', store);
</script>

<template>
  <div>
    <Home></Home>
  </div>
</template>

<style scoped></style>





#### 获取数据

##### 	fetch

```
fetch('服务器地址').then((res)=>{

			return res.json

}).then((res)=>{

		console.log(res);

})
```

##### 	axios

###### 		安装

​			npm install axios

​		执行 `GET` 请求

```
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// GET 参数可以放到params里（推荐）
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 还可以使用ECMAScript 2017里的async/await，添加 `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

​		执行 `POST` 请求

```
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

​		执行多个并发请求

```
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```



### proxy解决跨域问题

​		由于浏览器具有同源策略的保护机制，所以vite通过proxy解决跨域问题

​		proxy配置的位置:

​		![截屏2023-09-13 19.57.52](/Users/zkt/Library/Application Support/typora-user-images/截屏2023-09-13 19.57.52.png)

	server:{ //中转服务器
		proxy:{
	    '/path':{
	      target:'https://i.maoyan.com', //替换的服务端地址
	      changeOrigin:true, //开启代理,允许跨域
	      rewrite:path => path.replace(/^\/path/,'')//设置重写的路径
	    }
	  }
	}
	onMounted(() => {
	  axios
	    .get(
	      '/path/api/mmdb/movie/v3/list/hot.json?ct=%E9%95%BF%E6%B2%99&ci=70&channelId=4',
	    )
	    .then((res) => {
	      console.log(res);
	    });
	});


### Vuex

​	Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式 + 库**。它采用集中式[存储管理](https://so.csdn.net/so/search?q=存储管理&spm=1001.2101.3001.7020)应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

​	这个状态自管理应用包含以下几个部分：

- **状态**，驱动应用的数据源；
- **视图**，以声明方式将**状态**映射到视图；
- **操作**，响应在**视图**上的用户输入导致的状态变化。

<img src="/Users/zkt/Library/Application Support/typora-user-images/截屏2023-09-13 20.33.28.png" alt="截屏2023-09-13 20.33.28" style="zoom:25%;" />

#### 	安装

​		npm install vuex@next --save



#### 	创建store

​			![截屏2023-09-13 20.47.00](/Users/zkt/Library/Application Support/typora-user-images/截屏2023-09-13 20.47.00.png)

#### 	

#### 	基本使用-state

```
import { createStore } from 'vuex';
const *store* = createStore({
  state() {
    //存储的单一状态，存储基本数据
    return {
      count: 0,
    };
  },
});

export default store;


import store from "./store/index.js";

createApp(App).use(store).mount('#app')
```



#### 	基本使用-mutations

​		通过store.commit 方法触发对应函数状态变更

```
mutations: {
  increment(state, value) {
    state.count += value;
  },
},

<script setup>
  import {useStore} from "vuex";
  const store =useStore()
  function change(num){
      store.commit('increment',num)
  }
</script>

<template>
  <h1>{{$store.state.count}}</h1>
  <button @click="change(5)">count++</button>
</template>

<style scoped>

</style>

```



#### 	基本使用-getters(可以当成store中的计算属性)

	getters:{
		reverseMsg:function (state){
	    return state.msg.split('').reverse().join('')
	  },
	  reverseMsgLength:function (state,getters){ //getters表示当前store中的getters对象
	    return getters.reverseMsg.length
	  }
	}
	
	
	const reverseMsg = computed(() => {
	  return store.getters.reverseMsg;
	});
	const reverseMsgLength = computed(() => {
	  return store.getters.reverseMsgLength;
	});
	
	<h1>{{ reverseMsg }}</h1>
	<h1>{{ reverseMsgLength }}</h1>


#### 	基本使用-actions(需要通过mutations去改变状态)

```
actions:{
  getHot:function (context,payload){ //context：与store实例具有相同属性和方法的对象
    axios
        .get(
            '/path/api/mmdb/movie/v3/list/hot.json?ct=%E9%95%BF%E6%B2%99&ci=70&channelId=4',
        )
        .then((res) => {
          context.commit('updateHotList',res.data.data.hot)
          *console*.log(context.state.hotList)
        });
  }
}


onMounted(()=>{
  store.dispatch('getHot','hhh')
})
```

​	

#### 	基本使用-modules

##### 		局部状态

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

```
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```



##### 		命名空间		

​			如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：

```
const store = createStore({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: () => ({ ... }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },
        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```



### Pinia

#### 	简介

​	Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。如果你熟悉组合式 API 的话，你可能会认为可以通过一行简单的 `export const state = reactive({})` 来共享一个全局状态。对于单页应用来说确实可以，但如果应用在服务器端渲染，这可能会使你的应用暴露出一些安全漏洞。 而如果使用 Pinia，即使在小型单页应用中，你也可以获得如下功能：

- Devtools 支持
  - 追踪 actions、mutations 的时间线
  - 在组件中展示它们所用到的 Store
  - 让调试更容易的 Time travel
- 热更新
  - 不必重载页面即可修改 Store
  - 开发时可保持当前的 State
- 插件：可通过插件扩展 Pinia 功能
- 为 JS 开发者提供适当的 TypeScript 支持以及**自动补全**功能。
- 支持服务端渲染



#### 	安装

```
npm install pinia
```



#### 	引入(在main.js入口文件中引入)

```
import { createPinia } from 'pinia';
const app = createApp(App);
app.use(pinia);
```



#### 	定义Option Store

```
import { defineStore } from 'pinia';

const useAgeStore = defineStore('zkt', {
  state: () => {
    return { age: 20 };
  },
  getters: {
    getAge(state) {
      return state.age + 5;
    },
  },
  actions: {
    addAge() {
      //this指向对应的store仓库
      this.age++;
    },
  },
});
```



#### 	定义Setup Store

```
export const *useCounterStore* = defineStore('main', () => {
  const counter = ref(30);
  const getCounter = *computed*(() => {
    return counter.value + 5;
  });
  function addCounter() {
    counter.value++;
  }
  return { counter, getCounter, addCounter };
});
```



#### 	使用

```
<script setup>
import { useAgeStore, useCounterStore } from '../stores/index.js';
const ageStore = useAgeStore();
const countStore = useCounterStore();
</script>

<template>
  <h2>{{ ageStore.age }}</h2>
  <h2>{{ ageStore.getAge }}</h2>
  <button @click="ageStore.addAge()">改变age</button>

  <h2>{{ countStore.counter }}</h2>
  <h2>{{ countStore.getCounter }}</h2>
  <button @click="countStore.addCounter()">改变counter</button>
</template>

<style scoped></style>

```

​	

#### 	进行解构

```
import { storeToRefs } from 'pinia';
const { counter, getCounter } = storeToRefs(countStore);
const { addCounter } = countStore;
<h2>{{ counter }}</h2>
<h2>{{ getCounter }}</h2>
<button @click="addCounter()">改变counter</button>
```



#### 	pinia核心概念

##### 		state

​			在 Pinia 中，state 被定义为一个返回初始状态的函数。这使得 Pinia 可以同时支持服务端和客户端。为了完整类型推理，推荐使用箭头函数

​			修改状态:

​				1.批量修改				

```
function change() {
   ageStore.age++;
}
```

​				2.批量修改 $patch(对象)

```
  ageStore.$patch({
    age:40,
    name:"zkt",
    arr:[...ageStore.arr,5]
  })
```

​			3.批量修改 $patch(函数)

```
  ageStore.$patch((state) => {
    state.age = 40;
    state.name = 'zkt';
    state.arr.push(5);
  });
```

​			4.当逻辑较复杂时，采用封装actions的方式



##### 	getters

​		如果要访问其他的getters，可以使用this，但是不能使用箭头函数

```
  getters: {
    getAge(state) {
      return state.age + 5;
    },
    getInfo(state){
      return this.getAge + state.name
    }
  },
```

​		向getters传递参数，以返回函数的参数，缺点是和普通的函数一样，没有缓存的作用

```
    getAge(state) {
      // return state.age + 5;
      return (data)=>state.age + data
    },
```

​		访问其他store中的getters

```
    getAge(state) {
      const countStore =useCounterStore()
      return state.age+countStore.getCounter
    },
```



##### 	actions

​		类似 [getter](https://pinia.vuejs.org/zh/core-concepts/getters.html)，action 也可通过 `this` 访问**整个 store 实例**，并支持**完整的类型标注(以及自动补全✨)**。**不同的是，`action` 可以是异步的**，你可以在它们里面 `await` 调用任何 API，以及其他 action！下面是一个使用 [Mande](https://github.com/posva/mande) 的例子。请注意，你使用什么库并不重要，只要你得到的是一个`Promise`，你甚至可以 (在浏览器中) 使用原生 `fetch` 函数：

```
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // 让表单组件显示错误
        return error
      }
    },
  },
})
```

​		访问其他 store 的 action

```
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

​	

##### 	pinia和vuex的比较

​		pinia最重要的是，搭配 TypeScript 一起使用时有非常可靠的类型推断支持 pinia 没有 mutations， 而actions的使用不同，在actions中可以处理同步也可以处理异步，getters的使用是一致的，state与vue2中data是相似的

​		pinia没有总出口全是模块化，需要定义模块名称，当多个模块需要协作的时候需要引入多个模块，vuex是有总入口的，在使用模块化的时候不需要引入多个模块

​		pinia 在修改状态的时候不需要通过其他api， vuex需要通过commit， dispatch去修改所以在语法上比vuex更容易理解和使用，灵活

​		pinia就是更好的vuex，建议在项目中可以直接使用它了，尤其是使用了TypeScript的项目。







