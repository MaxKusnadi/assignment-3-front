import { api } from '@/utils'

const state = {
  firstName: null,
  lastName: null,
  email: null,
  fbId: null,
}

const getters = {}

const actions = {
  async login({ commit }, { accessToken, fbId, firstName, lastName, email }) {
    await api('get', '/login', {
      first_name: firstName,
      last_name: lastName,
      email,
      fb_id: fbId,
      access_token: accessToken,
    })

    commit('setUser', { firstName, lastName, email, fbId })
  },
}
const mutations = {
  setUser(state, { firstName, lastName, email, fbId }) {
    state.firstName = firstName
    state.lastName = lastName
    state.email = email
    state.fbId = fbId
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
