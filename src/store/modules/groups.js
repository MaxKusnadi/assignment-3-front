import Vue from 'vue'

const state = {}

const getters = {}

const actions = {
  initialiseGroupList({ commit }, groups) {
    return commit('populateGroupList', groups)
  },
}

const mutations = {
  populateGroupList(state, { groups }) {
    groups.forEach(group => Vue.set(state, group.id, group))
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
