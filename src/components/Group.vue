<template>
  <v-container grid-list-md fluid>
    <v-list two-line subheader>
      <v-subheader>Upcoming</v-subheader>
      <v-list-tile v-for="event in upcomingEvents">
        <v-list-tile-content>
          <v-list-tile-title v-text="event.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="moment(event.dateTime).format('dddd, DD MMMM')"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list two-line subheader>
      <v-subheader>Completed</v-subheader>
      <v-list-tile v-for="event in completedEvents">
        <v-list-tile-content>
          <v-list-tile-title v-text="event.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="moment(event.dateTime).format('dddd, DD MMMM')"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {}
  },

  props: ['groupId'],

  computed: {
    group: function() {
      return this.$store.getters.activeGroup(this.groupId)
    },
    upcomingEvents: function() {
      const now = Date.now()
      return this.group.events.filter(event => event.dateTime >= now)
    },
    completedEvents: function() {
      const now = Date.now()
      return this.group.events.filter(event => event.dateTime < now)
    },
  },

  methods: {
    moment,
  },

  components: {},
}
</script>

<style lang="stylus" scoped>
</style>
