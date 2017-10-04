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
    const groupIds = await api('get', '/me/group')

    // Fetch group info
    const groupInfos = await Promise.all(
      groupIds.map(group => api('get', `/group/${group.group_id}`))
    )

    const groups = groupInfos.map((info, i) => ({
      groupId: groupIds[i].group_id,
      ...info,
    }))

    commit('setGroupList', { groups })
  },
  async joinGroup({ commit }, { groupId }) {
    // Join group
    api('get', `/join/group/${groupId}`)

    // Fetch group info
    const group = await api('get', `/group/${groupId}`)

    commit('setGroup', { groupId, group })
  },
  leaveGroup({ commit }, { groupId }) {
    // Leave group
    api('DELETE', '/me/group', { group_id: groupId })

    commit('removeGroup', { groupId })
  },
  async createGroup({ commit }, { name, description, picUrl }) {
    // Create group
    const { group_id: groupId } = await api('post', '/group', {
      name,
      description,
      pic_url: picUrl,
    })
    // Fetch group info
    const group = await api('get', `/group/${groupId}`)

    commit('setGroup', { groupId, group })
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
  async createEvent(
    { commit },
    {
      groupId,
      name,
      startDate,
      startTime,
      endDate,
      endTime,
      description,
      location,
      alertTime,
    }
  ) {
    // Create group
    var startDateTime = new Date(startDate + 'T' + startTime + ':00').getTime()
    var endDateTime = new Date(endDate + 'T' + endTime + ':00').getTime()
    var alert = null
    switch (alertTime) {
      case '10 minutes':
        alert = 10
        break
      case '30 minutes':
        alert = 30
        break
      case '1 hour':
        alert = 60
        break
      case '2 hours':
        alert = 120
        break
      case '1 day':
        alert = 60 * 24
    }

    const { event_id: eventId } = await api('post', '/event', {
      start_date: startDateTime / 1000,
      group_id: groupId,
      name,
      end_date: endDateTime / 1000,
      description,
      location,
      alert_time: alert,
    })
    // Fetch group info
    const eventIds = await api('get', `/group/${groupId}/event`)

    // Fetch event info
    const eventInfos = await Promise.all(
      eventIds.map(event => api('get', `/event/${event.event_id}`))
    )
    const events = eventInfos.map((info, i) => ({
      id: eventIds[i].event_id,
      ...info,
      userList: null,
    }))

    commit('setGroupEvents', { groupId, events })

    commit('setEventAttendance', {
      groupId,
      eventId,
      users: [],
    })
  },
  async fetchEvents({ commit }, { groupId }) {
    // Fetch events in group
    const eventIds = await api('get', `/group/${groupId}/event`)

    // Fetch event info
    const eventInfos = await Promise.all(
      eventIds.map(event => api('get', `/event/${event.event_id}`))
    )
    const events = eventInfos.map((info, i) => ({
      id: eventIds[i].event_id,
      ...info,
      userList: null,
    }))

    return commit('setGroupEvents', { groupId, events })
  },
  async fetchEvent({ commit }, { groupId, eventId }) {
    // Fetch event attendance
    const users = await api('get', `/attendance/${eventId}`)
    return commit('setEventAttendance', {
      groupId,
      eventId,
      users,
    })
  },
  async deleteEvent({ commit }, { groupId, eventId }) {
    api('delete', '/event', { event_id: eventId })
    return commit('removeEvent', { groupId, eventId })
  },
  async createVcode({ commit }, { groupId, eventId, vCode }) {
    // Create group
    await api('PATCH', `/event/${eventId}`, {
      verification_code: vCode,
    })

    // Fetch group info
    const event = await api('get', `/event/${eventId}`)
    const users = await api('get', `/attendance/${eventId}`)

    commit('setEvent', { groupId, eventId, event })

    commit('setEventAttendance', {
      groupId,
      eventId,
      users,
    })
  },
  async postAttendance({ commit }, { groupId, eventId, status, remark }) {
    // post event attendance
    await api('post', '/attendance', { event_id: eventId, status, remark })
    const users = await api('get', `/attendance/${eventId}`)
    commit('setEventAttendance', {
      groupId,
      eventId,
      users,
    })
  },
  async updateAttendance({ commit }, { groupId, eventId, status, remark }) {
    // post event attendance
    await api('PATCH', `/attendance/${eventId}`, { status, remark })
    const users = await api('get', `/attendance/${eventId}`)
    commit('setEventAttendance', {
      groupId,
      eventId,
      users,
    })
  },
  async takeAttendance({ commit }, { groupId, eventId, vCode }) {
    // post event attendance
    const res = await api('post', '/me/event', {
      event_id: eventId,
      verification_code: vCode,
    })
    if (res.is_code_correct) {
      const users = await api('get', `/attendance/${eventId}`)
      commit('setEventAttendance', {
        groupId,
        eventId,
        users,
      })
      return true
    }
    return false
  },

  async fetchGroupAttendance({ commit }, { groupId }) {
    // Fetch event attendance
    const users = await api('get', `/group/${groupId}/attendance`)
    return commit('setGroupAttendance', {
      groupId,
      users,
    })
  },
  async downloadAttendance({ commit }, { groupId }) {
    window.open(
      `https://imgratefultoday.com:3000/group/${groupId}/download`,
      '_blank'
    )
  },
}

const mutations = {
  setGroupList(state, { groups }) {
    // group: { text, name, pic_url, description }
    const prevState = { ...state }
    for (const groupId of Object.keys(state)) {
      delete state[groupId]
    }
    groups.forEach(group => {
      if (prevState[group.groupId] != null) {
        Vue.set(state, group.groupId, { ...prevState[group.groupId], group })
      } else {
        Vue.set(state, group.groupId, group)
      }
    })
  },
  setGroupEvents(state, { groupId, events }) {
    // event: { start_date, end_date, description, location }
    const eventMap = {}
    events.forEach(event => (eventMap[event.id] = event))
    Vue.set(state[groupId], 'events', eventMap)
  },
  setEvent(state, { groupId, eventId, event }) {
    event.eventId = eventId
    Vue.set(state[groupId].events, eventId, event)
  },
  setEventAttendance(state, { groupId, eventId, users }) {
    // users: [{ user_id, status }]
    const userMap = {}
    users.forEach(user => (userMap[user.fb_id] = user))
    const event = state[groupId].events[eventId]
    Vue.set(event, 'userList', userMap)
  },
  setGroup(state, { groupId, group }) {
    // group: { text, name, pic_url, description }
    group.groupId = groupId
    group.events = state[groupId] != null ? state[groupId].events : {}
    Vue.set(state, groupId, group)
  },
  setGroupAttendance(state, { groupId, users }) {
    // users: [{ user_id, status }]
    const userMap = {}
    users.forEach(user => (userMap[user.fb_id] = user))
    const group = state[groupId]
    Vue.set(group, 'userList', userMap)
  },
  removeGroup(state, { groupId }) {
    delete state[groupId]
  },
  removeEvent(state, { groupId, eventId }) {
    delete state[groupId].events[eventId]
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
