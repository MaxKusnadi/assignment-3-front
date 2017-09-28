<template>
  <v-card>
    <v-card-media :src="group.pic_url || ''" alt="" height="300px">
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
          <v-list-tile-title>{{event.location}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile tag="div" :ripple="false">
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
      <v-list-group v-for="item in items" v-bind:key="item.title">
        <v-list-tile slot="item">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="member in item.members" v-bind:key="member.name">
          <v-list-tile-content>
            <v-list-tile-title v-text="member.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
    <div v-if='admin'>
      <v-dialog v-model="dialog" persistent>
        <v-btn primary dark large slot="activator" class="attendance">Take Attendance</v-btn>
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
            <v-btn class="blue--text darken-1" flat @click.native="dialog = verify">OK</v-btn>
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
      items: [
        {
          icon: 'mood',
          title: 'Going',
          members: this.goingOnes,
        },
        {
          icon: 'mood_bad',
          title: 'Not Going',
          members: this.notGoingones,
        },
      ],
      remark: null,
      wrongCode: false,
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
        user => user.status === 1
      )
    },
    notGoingOnes: function() {
      if (this.event.userList == null) return []
      return Object.values(this.event.userList).filter(
        user => user.status === 2
      )
    },
    admin: function() {
      var myId = this.$store.state.user.fb_id
      var creatorId = this.group.creator_id
      if (myId === creatorId) {
        return true
      } else {
        return false
      }
    },
    vCode: function() {
      return this.event.vCode
    },
    status: function() {
      if (this.event.userList == null) {
        return 0
      }
      // var myId = this.$store.state.user.fb_id

      // var me = this.event.userList[myId]
      // return me.status
      return 0
    },
  },

  methods: {
    submit() {
      this.$store.dispatch('createVcode', {
        groupId: this.groupId,
        eventId: this.eventId,
        vCode: this.newCode,
      })
    },
    verify() {
      if (this.newCode === this.vCode) {
        this.$store.dispatch('updateAttendance', {
          groupId: this.groupId,
          eventId: this.eventId,
          status: 3,
          remark: null,
        })
        return false
      } else {
        this.wrongCode = true
        return true
      }
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
  },
}
</script>

<style lang="stylus" scoped>
.router-view
  width: 100%

.buttons
  position: fixed
  bottom: 16px
  width: 100%
  text-align: center

.button
  width: 40%

.notgoing
  width: 100%

.attendance
  position: fixed
  bottom: 0px
  width: 100%
  margin: 0

.indicator
  position: fixed
  bottom: 0px
  width: 100%
  color: white
  background-color: grey

.media
  height: 100%
  margin: 0
</style>
