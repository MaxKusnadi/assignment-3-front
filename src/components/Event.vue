<template>
  <v-card>
    <v-card-media height="300px">
      <gmap-map
        :center="location"
        :zoom="12"
        map-type-id="terrain"
        style="width: 100%; height: 300px"
      >
        <gmap-marker :position="location"></gmap-marker>
      </gmap-map>
      <v-layout column class="media">
        <v-spacer></v-spacer>
        <v-card-title class="white--text pt-5">
          <div class="display-1 pt-5">{{event.name}}</div>
        </v-card-title>
      </v-layout>
    </v-card-media>
    <v-list subheader two-line>
      <v-list-tile tag="div" :ripple="false">
        <v-list-tile-action>
          <v-icon>access_time</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{startDate}}</v-list-tile-title>
          <v-list-tile-sub-title>{{startTime}} - {{endTime}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile tag="div" :ripple="false">
        <v-list-tile-action>
          <v-icon>location_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{locationName}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="event.description != ''" tag="div" :ripple="false">
        <v-list-tile-action>
          <v-icon>description</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{event.description}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list subheader>
      <v-subheader>Attendees</v-subheader>
      <v-list-group>
        <v-list-tile slot="item">
          <v-list-tile-action>
            <v-icon class="green--text">mood</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Going</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="user in goingOnes" v-bind:key="user.first_name">
          <v-list-tile-avatar>
              <img :src="`//graph.facebook.com/v2.10/${user.fb_Id}/picture`" :alt="`${user.first_name}`">
            </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{user.first_name}} {{user.last_name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-group>
        <v-list-tile slot="item">
          <v-list-tile-action>
            <v-icon class="red--text">mood_bad</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Not Going</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="user in notGoingOnes" v-bind:key="user.first_name">
          <v-list-tile-avatar>
              <img :src="`//graph.facebook.com/v2.10/${user.fb_Id}/picture`" :alt="`${user.first_name}`">
            </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{user.first_name}} {{user.last_name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
    <div v-if='admin'>
      <div class="buttons">
        <v-dialog class="adminbutton" v-model="dialog" persistent>
          <v-btn primary dark large slot="activator" class="takeAttendance">Take Attendance</v-btn>
          <v-card v-if='vCode==null'>
            <v-card-text>
              <v-text-field v-model="newCode" label="Create verification code"></v-text-field>
              <small>*Participants have to key in this code to indicate attendance</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
              <v-btn class="blue--text darken-1" flat @click.native="dialog = false" @click="submit">Save</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <v-card-text>
              <div>Verification code: {{vCode}}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
              <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog class="adminbutton" v-model="dialog2" persistent>
          <v-btn error dark large class="delete" slot="activator">Delete event</v-btn>
          <v-card>
            <v-card-text>
              <div>Are you sure you want to delete this event?</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="blue--text darken-1" flat @click.native="dialog2 = false">Cancel</v-btn>
              <v-btn error @click.native="dialog2 = false" @click="deleteEvent">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <div v-else>
      <div class="buttons" v-if="status==0">
        <v-btn success dark large class="button" @click="going">I'm Going!</v-btn>
        <v-dialog class="button" v-model="dialog" persistent>
          <v-btn error dark large slot="activator" class="notgoing">Can't make it.</v-btn>
          <v-card>
            <v-card-text>
              <v-text-field v-model="remark" label="Remark"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Cancel</v-btn>
              <v-btn class="blue--text darken-1" flat @click.native="dialog = false" @click="notGoing">Not Going</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div v-else-if="status===3" class="indicator">
        <div>Attend</div>
      </div>

      <v-dialog v-else-if="vCode" v-model="dialog" persistent>
        <v-btn primary dark large slot="activator" class="attendance">I'm here</v-btn>
        <v-card>
          <v-card-text>
            <v-text-field v-model="newCode" label="Enter verification code"></v-text-field>
            <small v-if="wrongCode">*Invalid code </small>
            <small v-else>*enter the verification code that you get from the group admin </small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn class="blue--text darken-1" flat @click="verify">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div v-else class="indicator">
        <div v-if="status==1">I'm going</div>
        <div v-if="status==2">I can't make it</div>
      </div>

    </div>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  mounted() {
    this.$store.dispatch('fetchEvent', {
      groupId: this.groupId,
      eventId: this.eventId,
    })
  },

  data() {
    return {
      dialog: false,
      newCode: null,
      remark: null,
      wrongCode: false,
      dialog2: false,
    }
  },

  props: ['groupId', 'eventId'],

  computed: {
    group: function() {
      return this.$store.state.groups[this.groupId]
    },
    event: function() {
      return this.group.events[this.eventId]
    },
    locationName: function() {
      try {
        return JSON.parse(this.event.location).name
      } catch (e) {
        return this.event.location
      }
    },
    location: function() {
      try {
        return JSON.parse(this.event.location).coords
      } catch (e) {
        return { lat: 0, lng: 0 }
      }
    },
    startDate: function() {
      return moment(parseInt(this.event.start_date) * 1000).format(
        'dddd, DD MMMM'
      )
    },
    startTime: function() {
      return moment(parseInt(this.event.start_date) * 1000).format('hh:mm')
    },
    endTime: function() {
      return moment(parseInt(this.event.end_date) * 1000).format('hh:mm')
    },
    goingOnes: function() {
      if (this.event.userList == null) return []
      return Object.values(this.event.userList).filter(
        user => user.status === 3
      )
    },
    notGoingOnes: function() {
      if (this.event.userList == null) return []
      return Object.values(this.event.userList).filter(
        user => user.status === 2
      )
    },
    admin: function() {
      var myId = this.$store.state.user.fbId
      var creatorId = this.group.creator_fb_id
      console.log(myId)
      console.log(creatorId)
      console.log(myId.toString() === creatorId.toString())
      if (myId.toString() === creatorId.toString()) {
        return true
      } else {
        return false
      }
    },
    vCode: function() {
      if (this.admin) {
        return this.event.verification_code
      } else {
        return this.event.has_verification_code
      }
    },
    status: function() {
      if (this.event.userList == null) {
        return 0
      }
      var myId = this.$store.state.user.fbId
      var me = this.event.userList[myId]
      console.log(me.status)
      return me.status
    },
  },

  methods: {
    verify() {
      this.$store
        .dispatch('takeAttendance', {
          groupId: this.groupId,
          eventId: this.eventId,
          vCode: this.newCode,
        })
        .then(response => {
          console.log(
            'Got some data, now lets show something in this component'
          )
          console.log(response)
          if (response.toString() === 'true') {
            console.log(response)
            this.dialog = false
          } else {
            console.log(response)
            this.dialog = true
            this.wrongCode = true
          }
        })
    },
    submit() {
      this.$store.dispatch('createVcode', {
        groupId: this.groupId,
        eventId: this.eventId,
        vCode: this.newCode,
      })
    },
    going() {
      this.$store.dispatch('updateAttendance', {
        groupId: this.groupId,
        eventId: this.eventId,
        status: 1,
        remark: null,
      })
    },
    notGoing() {
      this.$store.dispatch('updateAttendance', {
        groupId: this.groupId,
        eventId: this.eventId,
        status: 2,
        remark: this.remark,
      })
    },

    deleteEvent() {
      this.$store.dispatch('deleteEvent', {
        groupId: this.groupId,
        eventId: this.eventId,
      })
      this.$router.push(`/g/${this.groupId}`)
    },
  },
}
</script>

<style lang="stylus" scoped>
.router-view
  width: 100%

.buttons
  bottom: 20px
  width: 100%
  text-align: center

.button
  width: 40%

.notgoing
  width: 100%
  margin: 0

.takeAttendance
  position: fixed
  bottom: 16px
  width: 40%
  right: 50%

.delete
  position: fixed
  bottom: 16px
  width: 40%
  left: 50%

.attendance
  position: fixed
  bottom: 0px
  width: 50%
  margin: 0

.indicator
  position: fixed
  font-size: 20px
  text-align: center
  bottom: 0px
  width: 100%
  color: white
  background-color: grey

.media
  height: 100%
  margin: 0

.vue-map-container
  position: absolute
</style>
