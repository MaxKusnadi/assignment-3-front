<template>
  <loader v-if="group == null" />
  <v-container v-else fluid>
    <v-card class="elevation-2">
      <v-card-media :src="group.pic_url" height="300px">
      </v-card-media>
     
      <div class="eventList" v-if="!noEvent">
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
      </div>
       <v-card-actions>
          <v-btn flat class="orange--text" :to="`/g/${groupId}/attendance/`">Members</v-btn>
          <v-dialog class="deleteGroup" v-model="dialog" persistent v-if="admin">
            <v-btn flat class="orange--text" slot="activator">Delete</v-btn>
            <v-card>
              <v-card-text>
                <div>Are you sure you want to delete this group and all the group events?</div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Cancel</v-btn>
                <v-btn class="blue--text darken-1" flat @click.native="dialog = false" @click="deleteGroup">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
    </v-card>
    <div v-if="noEvent">
      <v-btn primary dark large class="createGroup" @click="$router.push(`/g/${groupId}/createEvent/`)">Create your first event</v-btn> 
    </div>
    <div class="button-wrapper" v-else-if="admin">
      <v-btn dark :class="accent" absolute fab top right @click="$router.push(`/g/${groupId}/createEvent/`)">
        <icon name="plus"></icon>
      </v-btn>
    </div>
    <v-dialog class="deleteGroup" v-model="dialog2" persistent v-if="noMember">  
      <v-card>
        <v-card-text>
          <div>Share your group with the share button on the right top!</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click.native="dialog2 = false">Got it</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  mounted() {
    // TODO: prompt if want to join first
    this.$store.dispatch('joinGroup', { groupId: this.groupId })

    this.$store.dispatch('fetchEvents', { groupId: this.groupId })
  },

  data() {
    return {
      dialog: false,
      dialog2: true,
      mysheet: false,
    }
  },

  props: ['groupId'],

  computed: {
    ...mapState({
      group(state) {
        return state.groups[this.groupId]
      },
      accent: state => state.settings.accent,
    }),
    admin: function() {
      var myId = this.$store.state.user.fbId
      var creatorId = this.group.creator_fb_id
      return myId.toString() === creatorId.toString()
    },
    noEvent: function() {
      console.log(this.group.events)
      return Object.keys(this.group.events).length === 0
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
      this.$store.dispatch('deleteGroup', { groupId: this.groupId })
      this.$router.push('/')
    },
  },

  components: {},
}
</script>

<style lang="stylus" scoped>

.eventList
  margin-left: 10px

.button-wrapper
  position: relative
  padding-bottom: 20px

.buttons
  width: 100%
  padding-top: 10px
  padding-bottom: 4px
  text-align: center

.members
  width: 47%
  margin-left: 0
  margin-right: 0

.members.single
  width: 80%

.manageGroup
  width: 90%
  left: 3%
  position: fixed
  bottom: 10px

.deleteGroup
  width: 47%
  margin-left: 0
  margin-right: 0

.delete
  width: 100%
  margin-left: 0
  margin-right: 0

.download
  width: 95%
  margin-left: 0
  margin-right: 0

.createGroup
  width: 70%
  margin-top: 30px
  margin-left: 15%
  margin-right: 15%
</style>
