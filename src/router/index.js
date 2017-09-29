import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Settings from '@/components/Settings'
import CreateGroup from '@/components/CreateGroup'
import CreateEvent from '@/components/CreateEvent'
import GroupAttendance from '@/components/GroupAttendance'

// Split these components as they depends on `moment`
const Event = () =>
  import(/* webpackChunkName: 'moment' */ '@/components/Event')
const Group = () =>
  import(/* webpackChunkName: 'moment' */ '@/components/Group')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },

    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },

    {
      path: '/createGroup',
      name: 'CreateGroup',
      component: CreateGroup,
    },

    {
      path: '/g/:groupId',
      name: 'Group',
      component: Group,
      props: true,
    },

    {
      path: '/g/:groupId/attendance',
      name: 'GroupAttendance',
      component: GroupAttendance,
      props: true,
    },

    {
      path: '/g/:groupId/createEvent',
      name: 'CreateEvent',
      component: CreateEvent,
      props: true,
    },

    {
      path: '/g/:groupId/:eventId',
      name: 'Event',
      component: Event,
      props: true,
    },
  ],
})
