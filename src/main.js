import Vue from "vue"
import App from "./App"
import store from "@/store/index"
import router from "./router"
import VueRouter from "vue-router"
import MaterialDashboard from "./material-dashboard"
import GlobalComponents from "./globalComponents"
import GlobalDirectives from "./GlobalDirectives"
import VueCookies from "vue-cookies"
import "@/filters/index.js"

Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.use(VueRouter)
Vue.use(MaterialDashboard)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)


new Vue({
  el: "#app",
  router,
  store: store,
  render: h => h(App)
})
