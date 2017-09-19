import { API_PATH } from '@/constants'

const state = {
  first_name: null,
  last_name: null,
  email: null,
  fb_id: null,
}

const getters = {}

const actions = {
  async login({ commit }) {
    try {
      const {
        first_name,
        last_name,
        email,
        fb_id,
      } = await fetch(`${API_PATH}/me`, {
        credentials: 'same-origin',
      }).then(res => res.json())

      return commit('setUser', { first_name, last_name, email, fb_id })
    } catch (e) {
      console.log(e)
    }
  },
}

const mutations = {
  setUser(state, { first_name, last_name, email, fb_id }) {
    /* eslint-disable camelcase */
    state.first_name = first_name
    state.last_name = last_name
    state.email = email
    state.fb_id = fb_id
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
