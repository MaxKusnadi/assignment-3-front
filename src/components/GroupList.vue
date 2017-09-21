<template>
  <v-list dense>
    <v-subheader class="mt-3 grey--text text--darken-1">GROUPS</v-subheader>
    <v-list>
      <v-list-tile v-for="group in Object.values(groups)" :key="group.groupId" avatar @click="$router.push(`/g/${group.groupId}/`)">
        <v-list-tile-avatar>
          <img :src="`https://source.unsplash.com/${group.groupId}/256x256`" alt="">
        </v-list-tile-avatar>
        <v-list-tile-title v-text="group.name"></v-list-tile-title>
      </v-list-tile>
      <v-list-tile avatar @click="$router.push('/createGroup/')">
        <v-list-tile-avatar>
          <v-icon class="grey--text text--darken-1">add</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title class="grey--text text--darken-1">Create a Group</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list-tile @click="">
      <v-list-tile-action>
        <v-icon class="grey--text text--darken-1">settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-title class="grey--text text--darken-1">Settings</v-list-tile-title>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['groups']),
  },
}
</script>

<style lang="stylus" scoped>
</style>
