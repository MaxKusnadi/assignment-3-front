import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as actions from './actions'
import * as getters from './getters'
import groups from './modules/groups'
import user from './modules/user'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {}

export default new Vuex.Store({
  state,
  actions,
  getters,
  modules: {
    user,
    groups,
    settings,
  },
  plugins: debug ? [] : [createPersistedState()],
  strict: debug,
})
