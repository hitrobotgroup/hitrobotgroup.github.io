import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AGV4 from "../components/products/AGV4.vue"
import LanJingLing from "../components/products/lanJingLing.vue"
import Forklift1 from "../components/products/forklift1.vue"
import Expressway from "../components/solutions/expressway.vue"
import UpperMachine from "../components/instructions/upperMachine.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/AGV4',
    name: 'AGV4',
    component: AGV4
  },
  {
    path: '/UpperMachine',
    name: 'UpperMachine',
    component: UpperMachine
  },
  {
    path: '/Forklift1',
    name: 'Forklift1',
    component: Forklift1
  },
  {
    path: '/Expressway',
    name: 'Expressway',
    component: Expressway
  },
  {
    path: '/LanJingLing',
    name: 'LanJingLing',
    component: LanJingLing
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
