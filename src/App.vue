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
    </v-navigation-drawer>
    <v-toolbar fixed >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Assignment 3</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-slide-x-transition>
          <router-view></router-view>
        </v-slide-x-transition>
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
    }
  },

  computed: mapState({
    user: state => state.user,
  }),

  components: {
    Login,
  },
}
</script>

<style lang="stylus">
@import './stylus/main'
</style>
