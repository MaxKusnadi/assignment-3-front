import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Settings from '@/components/Settings'
import GroupAttendance from '@/components/GroupAttendance'

// These components use `avatar-cropper`
const CreateGroup = () =>
  import(/* webpackChunkName: '1' */ '@/components/CreateGroup')

// These components use `moment`
const CreateEvent = () =>
  import(/* webpackChunkName: '0' */ '@/components/CreateEvent')
const Event = () => import(/* webpackChunkName: '0' */ '@/components/Event')
const Group = () => import(/* webpackChunkName: '0' */ '@/components/Group')

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
