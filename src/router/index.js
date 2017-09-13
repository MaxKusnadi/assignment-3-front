import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Group from '@/components/Group'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/g/:groupId',
      name: 'Group',
      component: Group,
      props: true,
    },
  ],
})
