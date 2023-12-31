import { createRouter, createWebHashHistory } from 'vue-router';
// 1. 定义路由组件.
// 也可以从其他文件导入
// import Home from '../views/Home.vue';
const Home=()=>import('../views/Home.vue')
import About from '../views/About.vue';
import User from '../views/User.vue';
import NotFound from '../views/NotFound.vue';
import News from '../views/News.vue';
import Parent from '../views/Parent.vue';
import Styleone from '../views/Styleone.vue';
import Styletwo from '../views/Styletwo.vue';
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name:'name',
    component: Home,
  },
  {
    path: '/about',
    component: About,
    beforeEnter:(to,from,next)=>{
      console.log(to);
      console.log(from);
      next()
    }
  },
  {
    path: '/user/:id',
    component: User,
    props:true
  },
  {
    path: '/:path(.*)',
    component: NotFound,
  },
  {
    // 一定是数字
    // path: '/news/:id(\\d+)',
    // 可以有多个参数
    // path: '/news/:id+',
    // 参数可有可无，*参数可以重复叠加，？则不能
    // path: '/news/:id*',
    path: '/news/:id?',
    component: News,
  },
  {
    path: '/parent',
    component: Parent,
    alias:['/father','/fuqin'],
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
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach((to,from,next)=>{
  console.log(to);
  console.log(from);
  next();
})
export default router;
