<template>
  <v-app toolbar>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      light
      enable-resize-watcher
      absolute
    >
      <v-list></v-list>
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
export default {
  data() {
    return {
      drawer: true,
    }
  },
}
</script>

<style lang="stylus">
@import './stylus/main'
</style>
