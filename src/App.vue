<template>
  <v-app toolbar>
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
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      drawer: true,
    }
  },

  computed: mapState({
    user: state => state.user,
  }),
}
</script>

<style lang="stylus">
@import './stylus/main'
</style>
