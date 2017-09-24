import { api } from '@/utils'

const state = {
  firstName: null,
  lastName: null,
  email: null,
  fbId: null,
  tut: true,
}

const getters = {}

const actions = {
  async login({ commit }, { accessToken, fbId, firstName, lastName, email }) {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      fb_id: fbId,
      user_access_token: accessToken,
    }

    await api('get', '/login', payload, false)
    commit('setUser', { firstName, lastName, email, fbId })
  },

  finishTutorial({ commit }) {
    console.log('yep im here')
    commit('setTutorial')
  },
}
const mutations = {
  setUser(state, { firstName, lastName, email, fbId }) {
    state.firstName = firstName
    state.lastName = lastName
    state.email = email
    state.fbId = fbId
  },
  setTutorial(state) {
    state.tut = false
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
