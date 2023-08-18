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