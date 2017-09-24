<template>
  <v-fade-transition v-if="user.fbId == null">
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
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
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
import Login from '@/components/Login'
import GroupList from '@/components/GroupList'

export default {
  data() {
    return {
      history: this.$router.currentRoute.path !== '/' ? ['/'] : [],
      drawer: false,
      transitionName: 'slide-left',
    }
  },

  props: ['title'],

  computed: {
    ...mapState(['user']),
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
    Login,
    GroupList,
  },
}
</script>

<style lang="stylus">
@import './stylus/main'

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
