import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOUTIAO_USER = 'TOKEN_USER'
export default new Vuex.Store({
  state: {
    // user: null,
    user: getItem('TOUTIAO_USER')
  },
  getters: {
  },
  mutations: {
    setUser(state, paylode) {
      state.user = paylode
      setItem('TOUTIAO_USER', paylode)
    }
  },
  actions: {
  },
  modules: {
  }
})
