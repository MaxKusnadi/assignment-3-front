const state = {
  notifications: true,
  primary: 'teal',
  accent: 'pink accent-2',
}

const getters = {}

const actions = {
  setNotifications({ commit }, { notifications }) {
    // api('post', 'notifications')
    commit('setNotifications', { notifications })
  },
}

const mutations = {
  setNotifications(state, { notifications }) {
    state.notifications = notifications
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
