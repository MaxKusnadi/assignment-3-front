import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Group from '@/components/Group'
import CreateGroup from '@/components/CreateGroup'
import CreateEvent from '@/components/CreateEvent'
import Event from '@/components/Event'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
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
      path: '/g/:groupId/createEvent',
      name: 'CreateEvent',
      component: CreateEvent,
    },

    {
      path: '/g/:groupId/:eventId',
      name: 'Event',
      component: Event,
      props: true,
    },
  ],
})
