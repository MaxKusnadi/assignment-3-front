<template>
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
