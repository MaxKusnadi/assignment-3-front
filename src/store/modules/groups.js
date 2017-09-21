import Vue from 'vue'
import { api } from '@/utils'

const state = {}

const getters = {}

const actions = {
  /*
   * Groups
   */

  async fetchGroups({ commit }) {
    // Fetch all groups
    const { groups } = await api('get', '/me/group')

    // Fetch group info
    const groupList = await Promise.all(
      groups.map(group => api('get', '/group', { group_id: group.group_id }))
    )

    commit('setGroupList', { groupList })
  },
  async joinGroup({ commit }, { groupId }) {
    // Join group
    api('post', '/me/group', { group_id: groupId })

    // Fetch group info
    const group = await api('get', '/group', { group_id: groupId })

    commit('setGroup', { group })
  },
  leaveGroup({ commit }, { groupId }) {
    // Leave group
    api('delete', '/me/group', { group_id: groupId })

    commit('removeGroup', { groupId })
  },
  async createGroup({ commit }, { name, description, picUrl }) {
    // Create group
    const { group_id } = await api('post', '/group', {
      name,
      description,
      pic_url: picUrl,
    })

    // Fetch group info
    const group = await api('get', '/group', { group_id })

    commit('setGroup', { group })
  },
  deleteGroup({ commit }, { groupId }) {
    // TODO: check if user is owner of group

    // Delete group
    api('delete', '/group', { group_id: groupId })

    commit('removeGroup', { groupId })
  },

  /*
   * Events
   */

  async fetchEvents({ commit }, { groupId }) {
    // Fetch events in group
    const { events } = await api('get', '/event/group', { group_id: groupId })

    // Fetch event info
    const eventList = await Promise.all(
      events.map(event => api('get', '/event', { event_id: event.event_id }))
    )

    return commit('setGroupEvents', { groupId, eventList })
  },
  async fetchEvent({ commit }, { groupId, eventId }) {
    // Fetch event attendance
    const { users } = await api('get', '/attendance', { event_id: eventId })

    return commit('setEventAttendance', {
      groupId,
      eventId,
      users,
    })
  },
}

const mutations = {
  setGroupList(state, { groups }) {
    // group: { text, name, pic_url, description }
    groups.forEach(group => Vue.set(state, group.id, group))
  },
  setGroupEvents(state, { groupId, events }) {
    // event: { start_date, end_date, description, location }
    events.forEach(event => Vue.set(state[groupId], event.id, event))
  },
  setEventAttendance(state, { groupId, eventId, users }) {
    // users: [{ user_id, status }]
    const events = state.groups[groupId].events
    Vue.set(events, eventId, { ...events[eventId], ...event })
  },
  setGroup(state, { groupId, group }) {
    // group: { text, name, pic_url, description }
    Vue.set(state.groups, groupId, { ...state.groups[groupId], ...group })
  },
  removeGroup(state, { groupId }) {
    delete state.groups[groupId]
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
