import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    agv4: {
      nameCn: "轻载室内激光导航AGV",
      nameEn: "LIGHT LOAD INDOOR LIDAR NAVIGATION AGV"
    },
    ljl:{
      nameCn: "轻载室内激光导航AGV-蓝精灵",
      nameEn: "LIGHT LOAD INDOOR LIDAR NAVIGATION AGV"
    },
    forklift:{
      nameCn: "L型激光导航堆高叉车",
      nameEn: "L LIFT LIDAR SLAM NAVIGATION FORKLIFT"
    },
    pageIndex: 0
  },
  mutations: {
    pageIndex(state,num){
      state.pageIndex = num;
    }
  },
  actions: {
  },
  modules: {
  }
})
