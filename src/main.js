import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import "./router/permission"
//引入element-plus的图标与样式
import * as ELIcons from '@element-plus/icons-vue'
//全局引入样式，防止一些js里触发的组件没有样式
import 'element-plus/dist/index.css'
//引入axios工具
import http from "./utils/http";
//注册elbutton的工具方法，方便全局调用
import clearCss from './utils/elBtnUtil'

import * as testData from './views/testData';

const app = createApp(App)
app.use(router)
app.use(store)
//全局注册图标组件
for (let iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName])
}
//全局注册
app.config.globalProperties.$http = http
app.config.globalProperties.$clearCss = clearCss
//测试数据注入到全局
app.config.globalProperties.$test = testData
app.mount('#app')
