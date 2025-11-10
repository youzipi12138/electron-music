import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 静态资源前缀 相对路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/ui'),
    },
  },
  build: {
    outDir: 'dist-react',
  },
  server: {
    port: 3009,
    strictPort: true,
    host: 'localhost',
    hmr: {
      port: 3009,
    },
  },
});

// 💡 为什么很多项目选择 ./？

// 这是为了让 打包后的文件能在任意目录下直接打开（本地或静态服务器）。

// 举个例子：

// 如果你把打包好的 dist 文件夹拷贝到别人电脑上；

// 双击 dist/index.html（用 file:// 协议打开）；

// 绝对路径 /assets/... 会找不到资源；

// 而相对路径 ./assets/... 可以正确加载。

// ✅ 所以：

// 如果你要部署到任意目录（例如 GitHub Pages、子路径、CDN），一般会使用 ./。

// 🧠 总结一句话
// 路径	特点	适用场景
// /assets/...	从网站根目录加载	部署在根路径的网站（例如 example.com/）
// ./assets/...	相对路径加载	本地打开或部署在子路径下（例如 example.com/myapp/）
