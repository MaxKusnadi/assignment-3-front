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
      groupIds.map(group => api('get', '/group', { group_id: group.group_id }))
    )

    const groups = groupInfos.map((info, i) => ({
      groupId: groupIds[i].group_id,
      ...info,
    }))

    commit('setGroupList', { groups })
  },
  async joinGroup({ commit }, { groupId }) {
    // Join group
    api('post', '/me/group', { group_id: groupId })

    // Fetch group info
    const group = await api('get', '/group', { group_id: groupId })

    commit('setGroup', { groupId, group })
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

    commit('setGroup', { groupId: group_id, group })
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
    console.log(startDate)
    console.log(startTime)
    console.log(startDateTime)
    console.log(groupId)
    console.log(name)

    const { event_id } = await api('post', '/event', {
      start_date: startDateTime / 1000,
      group_id: groupId,
      name,
      end_date: endDateTime / 1000,
      description,
      location,
      alert_time: alert,
    })

    // Fetch group info
    const event = await api('get', '/event', { event_id })

    commit('setEvent', { groupId, eventId: event_id, event })
    commit('setEventAttendance', {
      groupId,
      eventId: event_id,
      users: null,
    })
  },
  async fetchEvents({ commit }, { groupId }) {
    // Fetch events in group
    const eventIds = await api('get', '/group/event', { group_id: groupId })
    console.log(eventIds)

    // Fetch event info
    const eventInfos = await Promise.all(
      eventIds.map(event => api('get', '/event', { event_id: event.event_id }))
    )
    const events = eventInfos.map((info, i) => ({
      id: eventIds[i].event_id,
      ...info,
      userList: null,
    }))

    console.log(events)

    return commit('setGroupEvents', { groupId, events })
  },
  async fetchEvent({ commit }, { groupId, eventId }) {
    // Fetch event attendance
    const users = await api('get', '/attendance', { event_id: eventId })
    console.log(users)
    return commit('setEventAttendance', {
      groupId,
      eventId,
      users,
    })
  },
  async createVcode({ commit }, { groupId, eventId, vCode }) {
    // Create group
    const { event_id } = await api('patch', '/event', {
      event_id: eventId,
      v_code: vCode,
    })

    // Fetch group info
    const event = await api('get', '/event', { event_id })

    commit('setEvent', { groupId, eventId: event_id, event })
    commit('setEventAttendance', {
      groupId,
      eventId: event_id,
      users: null,
    })
  },
  async updateAttendance({ commit }, { groupId, eventId, status, remark }) {
    // post event attendance
    await api('post', '/attendance', { event_id: eventId, status, remark })
    const users = await api('get', '/attendance', { event_id: eventId })
    commit('setEventAttendance', {
      groupId,
      eventId,
      users,
    })
  },
}

const mutations = {
  setGroupList(state, { groups }) {
    // group: { text, name, pic_url, description }
    Object.keys(groups).forEach(key => {
      delete state[key]
    })
    groups.forEach(group => Vue.set(state, group.groupId, group))
  },
  setGroupEvents(state, { groupId, events }) {
    // event: { start_date, end_date, description, location }
    const eventMap = {}
    events.forEach(event => (eventMap[event.id] = event))
    Vue.set(state[groupId], 'events', eventMap)
    console.log('events.state')
    console.log(state[groupId].events['1'])
  },
  setEvent(state, { groupId, eventId, event }) {
    event.eventId = eventId
    Vue.set(state[groupId].events, eventId, event)
  },
  setEventAttendance(state, { groupId, eventId, users }) {
    // users: [{ user_id, status }]
    const userMap = {}
    users.forEach(user => (userMap[user.user_id] = user))
    const event = state[groupId].events[eventId]
    console.log(event)
    console.log(userMap)
    Vue.set(event, 'userList', userMap)
  },
  setGroup(state, { groupId, group }) {
    // group: { text, name, pic_url, description }
    group.groupId = groupId
    group.events = state[groupId] != null ? state[groupId].events : {}
    Vue.set(state, groupId, group)
  },
  removeGroup(state, { groupId }) {
    delete state[groupId]
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
