// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// //  这里为测试mock假数据
// import axiostest from './axiostest'
// 这里为测试与后端交互
import axios from 'axios'
const VueResource = require('vue-resource')


Vue.config.productionTip = false
// 引入ElementUI
// eslint-disable-next-line import/first
import ElementUI from 'element-ui'

// 引入样式
// eslint-disable-next-line import/first
import 'element-ui/lib/theme-chalk/index.css'

// 安装
Vue.use(ElementUI)
Vue.use(VueResource)
// Vue.use(axiostest)

// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)



Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:3000'


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
