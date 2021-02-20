import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import trademarks from './modules/trademarks'
import complaints from './modules/complaints'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {

  },
  modules: {
    user,
    trademarks,
    complaints
  }
})
