import Vue from 'vue'
import { API_PATH } from '@/constants'

const state = {}

const getters = {}

const actions = {
  async fetchGroups({ commit }) {
    try {
      const { groups } = await fetch(`${API_PATH}/me/group`, {
        credentials: 'same-origin',
      }).then(res => res.json())

      const groupList = await Promise.all(
        groups.map(group =>
          fetch(`${API_PATH}/group?group_id=${group.group_id}`, {
            credentials: 'same-origin',
          }).then(res => res.json())
        )
      )

      return commit('populateGroupList', groupList)
    } catch (e) {
      console.log(e)
    }
  },
  joinGroup({ commit }, { groupId }) {
    fetch(`${API_PATH}/me/group`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ group_id: groupId }),
      credentials: 'same-origin',
    })
    // TODO: fetch group details and update state
  },
  leaveGroup({ commit }, { groupId }) {
    fetch(`${API_PATH}/me/group`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ group_id: groupId }),
      credentials: 'same-origin',
    })
    // TODO: remove group from state
  },
  createGroup({ commit }, { name, description, picUrl }) {
    fetch(`${API_PATH}/group`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, pic_url: picUrl }),
      credentials: 'same-origin',
    })
    // TODO: fetch group details and update state
  },
  deleteGroup({ commit }, { groupId }) {
    // TODO: check if user is owner of group
    fetch(`${API_PATH}/group`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ group_id: groupId }),
      credentials: 'same-origin',
    })
    // TODO: fetch group details and update state
  },

  // Events

  async fetchEvents({ commit }, { groupId }) {
    try {
      const {
        events,
      } = await fetch(`${API_PATH}/event/group?group_id=${groupId}`, {
        credentials: 'same-origin',
      }).then(res => res.json())

      const eventList = await Promise.all(
        events.map(event =>
          fetch(`${API_PATH}/event`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event_id: event.event_id }),
            credentials: 'same-origin',
          }).then(res => res.json())
        )
      )

      return commit('populateGroupEvents', { groupId, eventList })
    } catch (e) {
      console.log(e)
    }
  },
  async fetchEvent({ commit }, { groupId, eventId }) {
    try {
      const {
        users,
      } = await fetch(`${API_PATH}/attendance?event_id=${eventId}`, {
        credentials: 'same-origin',
      }).then(res => res.json())

      return commit('populateEventAttendance', {
        groupId,
        eventId,
        event: { users },
      })
    } catch (e) {
      console.log(e)
    }
  },
}

const mutations = {
  populateGroupList(state, { groups }) {
    // group: { text, name, pic_url, description }
    groups.forEach(group => Vue.set(state, group.id, group))
  },
  populateGroupEvents(state, { groupId, events }) {
    // event: { start_date, end_date, description, location }
    events.forEach(event => Vue.set(state[groupId], event.id, event))
  },
  populateEventAttendance(state, { groupId, eventId, event }) {
    const events = state.groups[groupId].events
    Vue.set(events, eventId, { ...events[eventId], ...event })
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
