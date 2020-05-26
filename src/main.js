import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//new一个vue实例给$bus,使goodslistitem组件中的$bus成为一个vue实例，就能够发射事件，事件总线方法
Vue.prototype.$bus = new Vue() 
//安装toast插件
Vue.use(toast)
//解决移动端300毫秒延迟
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
