const state = {
  id: null,
  name: null,
  photoUrl: null,
}

const getters = {}

const actions = {
  initialiseUser({ commit }, { id, name, photoUrl }) {
    return commit('setUser', { id, name, photoUrl })
  },
}

const mutations = {
  setUser(state, { id, name, photoUrl }) {
    state.id = id
    state.name = name
    state.photoUrl = photoUrl
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
