<template>
  <v-container fluid>
    <v-list two-line subheader>
      <v-subheader>Upcoming</v-subheader>
      <v-list-tile v-for="event in upcomingEvents" :key="event.id" @click="$router.push(`/g/${groupId}/${event.id}/`)">
        <v-list-tile-content>
          <v-list-tile-title v-text="event.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="moment(event.dateTime).format('dddd, DD MMMM')"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list two-line subheader>
      <v-subheader>Completed</v-subheader>
      <v-list-tile v-for="event in completedEvents" :key="event.id" @click="$router.push(`/g/${groupId}/${event.id}/`)">
        <v-list-tile-content>
          <v-list-tile-title v-text="event.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="moment(event.dateTime).format('dddd, DD MMMM')"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <div class="button-wrapper">
      <v-btn absolute fab top right @click="$router.push(`/g/${groupId}/createEvent/`)">
        <icon name="plus"></icon>
      </v-btn>
    </div>
    <v-dialog v-model="dialog" persistent>
      <v-btn error dark large class="deleteGroup" @click="deleteGroup">Delete group</v-btn>
      <v-card>
        <v-card-title>
          <div class="headline">Are you sure you want to delete the group?</div>
        </v-card-title>
        <v-card-actions> 
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click.native="dialog = false" @click="deleteGroup">Yes</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  mounted() {
    // TODO: prompt if want to join first
    this.$store.dispatch('joinGroup', { groupId: this.groupId })

    this.$store.dispatch('fetchEvents', { groupId: this.groupId })
  },

  data() {
    return {}
  },

  props: ['groupId'],

  computed: {
    group: function() {
      return this.$store.state.groups[this.groupId]
    },
    upcomingEvents: function() {
      if (this.group.events == null) return []

      const now = Date.now()
      return Object.values(this.group.events).filter(
        event => event.start_date + '000' >= now
      )
    },
    completedEvents: function() {
      if (this.group.events == null) return []

      const now = Date.now()
      return Object.values(this.group.events).filter(
        event => event.start_date + '000' < now
      )
    },
  },

  methods: {
    moment,
    deleteGroup() {
      this.$store.dispatch('deleteGroup', {groupId: this.groupId})
      this.$router.push('/')
    },
  },

  components: {},
}
</script>

<style lang="stylus" scoped>
.button-wrapper
  position: relative

.deleteGroup
  position: fixed
  bottom: 0px
  width: 100%
  margin: 0
</style>
