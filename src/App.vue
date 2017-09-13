<template>
  <v-fade-transition v-if="user.id == null">
    <v-app>
      <main>
        <v-container fluid>
          <login />
        </v-container>
      </main>
    </v-app>
  </v-fade-transition>
  <v-app toolbar v-else>
    <v-navigation-drawer
      absolute
      persistent
      light
      v-model="drawer"
      enable-resize-watcher
    >
      <v-list dense>
        <v-subheader class="mt-3 grey--text text--darken-1">GROUPS</v-subheader>
        <v-list>
          <v-list-tile v-for="group in Object.values(groups)" :key="group.id" avatar @click="$router.push(`/g/${group.id}`)">
            <v-list-tile-avatar>
              <img :src="`https://source.unsplash.com/${group.id}/256x256`" alt="">
            </v-list-tile-avatar>
            <v-list-tile-title v-text="group.name"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list-tile class="mt-3" @click="">
          <v-list-tile-action>
            <v-icon class="grey--text text--darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Create a Group</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon class="grey--text text--darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Settings</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/">Application</router-link></v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid class="router-container">
        <transition :name="transitionName">
          <router-view class="router-view"></router-view>
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Login from '@/components/Login'

export default {
  data() {
    return {
      drawer: true,
      transitionName: 'slide-left',
    }
  },

  props: ['title'],

  computed: {
    ...mapState(['user', 'groups']),
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'back' : 'forward'
    },
  },

  components: {
    Login,
  },
}
</script>

<style lang="stylus">
@import './stylus/main'

.router-view
  position: absolute;

.forward-enter-active, .back-enter-active
  transition: all 0.25s ease-out

.forward-leave-active, .back-leave-active
  transition: all 0.25s ease-in

.forward-enter, .back-leave-to
  transform: translate(100vw, 0)

.back-enter, .forward-leave-to
  transform: translate(-100vw, 0)

</style>
