<template>
  <v-fade-transition v-if="!user.loggedIn">
    <v-app>
      <login />
    </v-app>
  </v-fade-transition>
  <v-fade-transition v-else-if="!hasGroups && user.tut">
    <tutorial />
  </v-fade-transition>
  <v-app toolbar v-else>
    <v-toolbar fixed dark :class="primary">
      <v-btn icon v-if="history.length !== 0" :to="history[history.length - 1]">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="copyLink">
        <v-icon>share</v-icon>
      </v-btn>
      <v-snackbar :timeout="5000" success bottom v-model="isCopied">
        Link copied!
      </v-snackbar>
      <v-menu bottom>
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
import Login from '@/components/Login'
import GroupList from '@/components/GroupList'
import Tutorial from '@/components/Tutorial'

export default {
  data() {
    return {
      history: this.$router.currentRoute.path !== '/' ? ['/'] : [],
      transitionName: 'back',
      dialog: false,
      isCopied: false,
    }
  },

  computed: {
    ...mapState({
      user: state => state.user,
      primary: state => state.settings.primary,
    }),
    hasGroups() {
      return Object.keys(this.$store.state.groups).length !== 0
    },
    title() {
      const groupId = this.$route.params.groupId
      return groupId == null ? 'Golah' : this.$store.state.groups[groupId].name
    },
  },

  methods: {
    logout() {
      if (FB == null) return

      FB.logout()
      this.$store.dispatch('notLoggedIn')
    },
    copyLink() {
      var link = window.location.href
      var dummy = document.createElement('input')
      console.log("createlement")
      document.body.appendChild(dummy)
      dummy.setAttribute('id', 'dummy_id')
      dummy.setAttribute('value', link)
      console.log("setattriute")
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)

      this.isCopied = true
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
    Login,
    GroupList,
    Tutorial,
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
