<template>
  <v-fade-transition v-if="user.loggedIn == null">
    <v-app>
      <loader />
    </v-app>
  </v-fade-transition>
  <v-fade-transition v-else-if="user.loggedIn == false">
    <v-app>
      <login />
    </v-app>
  </v-fade-transition>
  <v-app toolbar v-else>
    <v-toolbar fixed>
      <v-btn icon v-if="history.length !== 0" :to="history[history.length - 1]">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Golah</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>share</v-icon>
      </v-btn>
      <v-menu
       bottom
     >
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile avatar tag="div" @click.stop.prevent="">
            <v-list-tile-avatar>
              <img :src="`//graph.facebook.com/v2.10/${user.fbId}/picture`" :alt="`${user.firstName}`">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.firstName}} {{user.lastName}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile to="/settings">
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <main>
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader'
import Login from '@/components/Login'
import GroupList from '@/components/GroupList'

export default {
  data() {
    return {
      history: this.$router.currentRoute.path !== '/' ? ['/'] : [],
      transitionName: 'back',
    }
  },

  props: ['title'],

  computed: {
    ...mapState(['user']),
  },

  methods: {
    logout() {
      if (FB == null) return

      FB.logout()
      this.$store.dispatch('notLoggedIn')
    },
  },

  watch: {
    $route(to, from) {
      if (this.history[this.history.length - 1] === to.path) {
        this.transitionName = 'back'
        this.history.pop()
      } else {
        this.transitionName = 'forward'
        this.history.push(from.path)
      }
    },
  },

  components: {
    Loader,
    Login,
    GroupList,
  },
}
</script>

<style lang="stylus">
@import './stylus/main'

orange = #F08655
green = #9ED097
blue = #099EE9
yellow = #F8CF92
pink = #EE90BA

.container
  padding 0
  max-width 1200px

.forward-enter-active, .back-enter-active
  transition all 0.25s ease-out

.forward-leave-active, .back-leave-active
  transition all 0.25s ease-in

.forward-enter, .back-leave-to
  transform translate(100vw, 0)

.back-enter, .forward-leave-to
  transform translate(-100vw, 0)

</style>
