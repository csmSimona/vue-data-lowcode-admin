# vue-lowcode-cockpit-admin

基于 Vue3, Vite5, TypeScript, Pinia, NaiveUI 和 tailwindcss 的低代码数据可视化开发平台

管理后台模板基于[naive-ui-admin](https://github.com/jekip/naive-ui-admin)

[开发记录](https://github.com/csmSimona/vue-lowcode-cockpit-admin/blob/main/DEVRECORD.md)



## 功能梳理

- 大屏列表展示页

- 大屏编辑器

  - 顶部：保存、预览等
  - 左侧：组件库、图层
  - 中间：画布
  - 右侧：背景和组件编辑器

   组件拖拽或双击注册到画布上

- 大屏预览页



## **组件库**

柱状图：基础柱状图、横向柱状图、象形堆叠柱状图

折线图：基础折线图、基础面积图、堆叠折线图、堆叠面积图、折柱混合图

饼图：基础饼图、环图、自动轮播环图

地图：基础地图、自动轮播地图、投影地图、伪3D地图、叠层地图、散点地图、飞线地图、3D柱状图、3D地图

滚动表格

滚动列表

按钮：配置跳转

边框

文本

滚动数字 



## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [NaiveUi](https://www.naiveui.com/) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法




## 使用

- 安装依赖

```bash
pnpm install
```

- 运行

```bash
pnpm run dev
```

账号：admin，密码：123456（随意）

- 打包

```bash
pnpm build
```

