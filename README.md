# vue-admin-template

English | [简体中文](./README-zh.md)

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint

**Live demo:** http://panjiachen.github.io/vue-admin-template


**The current version is `v4.0+` build on `vue-cli`. If you want to use the old version , you can switch branch to [tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0), it does not rely on `vue-cli`**

## Build Setup

```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Extra

If you want router permission && generate menu by user roles , you can use this branch [permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

For `typescript` version, you can use [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (Credits: [@Armour](https://github.com/Armour))

## Related Project

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen

## 笔记

### el-table
- el-table元素用于布局非常方便，在 Form 组件中，每一个表单域由一个 Form-Item 组件构成
- el-table数据一般都是包含在一个object中，即赋值给:model的对象，el-form-item并不涉及数据，而是el-form-item内部的各种元素v-model

### el-select
- v-model的值为当前被选中的el-option的 value 属性值
- prop	表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
- el-select的v-model于el-option的:value无关
- v-model必须设置初值，否则无法将值放入选框中
- 但是如果只是显示，不能进行输入，则不能定义v-model
- input的v-model同理

### v-bind
- 正确使用v-bind，：后变量是在子组件中的名称，也就是子组件中props的名称；=后面的变量是目前父组件中的变量

### el-input-number
-如果想要默认不显示，则值定义为undefined

### 易错点
- 属性如果在'：'后面，则表示属性是动态赋值，如果没有':'则属性直接赋值为变量
- el-radio元素的属性 :label，是带有':'
- 打开多个重名文件要小心
- 写类似组件时，复制原有代码需要注意
### must be function
Type of the default value for ‘ItemLists‘ prop must be a function
https://blog.csdn.net/qyl_0316/article/details/104450863

Invalid prop: type check failed for prop "data". Expected Array, got Object
https://blog.csdn.net/niaonao/article/details/98593460
接收的数据类型弄清楚

### chrome
- 之前开发移动端，调试总打开手机模式，结果现在开发者模式无法打开网页模式
- easy mock在chrome页无法正常预览，数据也无法加载，在其他浏览器无事
  找到easy mock 对应接口，发现数据无法正常获取，打开控制台，发现错误为Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
  数据请求被adclock屏蔽，暂停easy mock页面的广告拦截，发现可以正常获取数据，但是广告页仍然无法显示
  关闭本地页面的adblock屏蔽，页面最终正常显示
- chrome打开“广告管理”页总是不停跳转，在其他浏览器无事
同上，关闭adblock可以解决

### TODO
edit的title无法传入