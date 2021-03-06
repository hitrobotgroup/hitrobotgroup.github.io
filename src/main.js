import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Swiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import animate from "animate.css";
import store from './store'
import router from './router'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import "./assets/css/base.css";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Swiper)
Vue.use(animate)
Vue.prototype.$video = Video
//swiper animate


var vue = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

export {
  vue,
  store,
  router
}