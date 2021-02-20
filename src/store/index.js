import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import trademarks from './modules/trademarks'
import complaints from './modules/complaints'
import loading from './modules/loading'



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
    complaints,
    loading
  }
})
