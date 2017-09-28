const state = {
  notifications: true,
  nightMode: false,
}

const getters = {}

const actions = {
  setNotifications({ commit }, { notifications }) {
    // api('post', 'notifications')
    commit('setNotifications', { notifications })
  },
  setNightMode({ commit }, { nightMode }) {
    commit('setNightMode', { nightMode })
  },
}

const mutations = {
  setNotifications(state, { notifications }) {
    state.notifications = notifications
  },
  setNightMode(state, { nightMode }) {
    state.nightMode = nightMode
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
