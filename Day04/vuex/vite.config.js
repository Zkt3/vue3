import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{ //中转服务器
    proxy:{
      '/path':{
        target:'https://i.maoyan.com', //替换的服务端地址
        changeOrigin:true, //开启代理,允许跨域
        rewrite:path => path.replace(/^\/path/,'')//设置重写的路径
      }
    }
  }
})
