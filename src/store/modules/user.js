import { api } from '@/utils'

const state = {
  loggedIn: null,
  firstName: null,
  lastName: null,
  email: null,
  fbId: null,
}

const getters = {}

const actions = {
  notLoggedIn({ commit }) {
    commit('setLoggedIn', { loggedIn: false })
  },
  async login({ commit }, { accessToken }) {
    FB.api(
      '/me',
      { fields: ['id', 'first_name', 'last_name', 'email'] },
      async me => {
        const payload = {
          first_name: me.first_name,
          last_name: me.last_name,
          email: me.email,
          fb_id: me.id,
          user_access_token: accessToken,
        }

        await api('get', '/login', payload, false)

        commit('setUser', {
          firstName: me.first_name,
          lastName: me.last_name,
          email: me.email,
          fbId: me.id,
        })
      }
    )
  },
}
const mutations = {
  setUser(state, { firstName, lastName, email, fbId }) {
    state.firstName = firstName
    state.lastName = lastName
    state.email = email
    state.fbId = fbId
    state.loggedIn = true
  },
  setLoggedIn(state, { loggedIn }) {
    state.loggedIn = loggedIn
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
