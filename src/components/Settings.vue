<template>
  <v-list two-line subheader>
    <v-subheader>General</v-subheader>
    <v-list-tile avatar tag="div" :ripple="false">
      <v-list-tile-content>
        <v-list-tile-title>Notification Alerts</v-list-tile-title>
        <v-list-tile-sub-title>Enable notification alerts for upcoming events</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action><v-switch v-model="settings.notifications" @click="toggleNotifications"></v-switch></v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['settings']),

  methods: {
    toggleNotifications() {
      this.$store.dispatch('setNotifications', {
        notifications: !this.settings.notifications,
      })
    },
    toggleNightMode() {
      this.$store.dispatch('setNightMode', {
        nightMode: !this.settings.nightMode,
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
