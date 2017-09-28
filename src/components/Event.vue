<template>
  <div>
    <v-list class='container'>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon class="indigo--text">event</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{event.name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile class="startDate">
        <v-list-tile-action>
          <v-icon class="indigo--text">access_time</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>from {{startDate}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>to {{endDate}}</v-list-tile-title>
          <v-list-tile-sub-title>Data and time</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon class="indigo--text">location_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{event.location}}</v-list-tile-title>
          <v-list-tile-sub-title>Location</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon class="indigo--text">description</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{event.description}}</v-list-tile-title>
          <v-list-tile-sub-title>Event description</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list>
      <v-list-group>
        <v-list-tile slot="item">
          <v-list-tile-action>
            <v-icon class="indigo--text">mood</v-icon>
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
            <v-icon class="indigo--text">mood_bad</v-icon>
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
          <v-btn primary dark large slot="activator" class="notgoing">Take Attendance</v-btn>
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
          <v-btn error dark large class="notgoing" slot="activator">Delete event</v-btn>
          <v-card>
            <v-card-text>
              <div>Are you sure you want to delete this event?</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="blue--text darken-1" flat @click.native="dialog2 = false" @click="deleteEvent">Yes</v-btn>
              <v-btn class="blue--text darken-1" flat @click.native="dialog2 = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div> 
      
    <div v-else>
      <div class="buttons" v-if="status==='0'">
        <v-btn primary dark large class="button" @click="going">Going</v-btn>
        <v-dialog class="button" v-model="dialog" persistent>
          <v-btn error dark large slot="activator" class="notgoing">Not Going</v-btn>
          <v-card>
            <v-card-text>
              <v-text-field v-model="remark" label="Remark"></v-text-field>
            </v-card-text>
            <v-card-actions> 
              <v-spacer></v-spacer>
              <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Cancel</v-btn>
              <v-btn class="blue--text darken-1" flat @click.native="dialog = false" @click="notGoing">OK</v-btn>
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
        <div v-if="status===1">I'm going</div>
        <div v-else>Not going</div>
      </div>
      
    </div>
  </div>
</template> 

<script>
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
      console.log(this.$store.state.groups[this.groupId])
      return this.$store.state.groups[this.groupId]
    },
    event: function() {
      console.log(this.group.events[this.eventId])
      console.log(this.group.events[this.eventId].userList)
      return this.group.events[this.eventId]
    },
    startDate: function() {
      var datetime = new Date(parseInt(this.event.start_date) * 1000)
      return datetime.toLocaleString()
    },
    endDate: function() {
      var datetime = new Date(parseInt(this.event.end_date) * 1000)
      return datetime.toLocaleString()
    },
    goingOnes: function() {
      console.log(this.event.userList)
      console.log(Object.values(this.event.userList).filter(
        user => user.status === 3))
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
      this.$store.dispatch('takeAttendance', {
        groupId: this.groupId,
        eventId: this.eventId,
        vCode: this.newCode,
        }).then(response => {
          console.log("Got some data, now lets show something in this component")
          console.log(response)
          if (response.toString() === "true") {
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
      this.$store.dispatch('deleteEvent', { groupId: this.groupId, eventId: this.eventId })
      this.$router.push('/')
    },
  },
}
</script>

<style lang="stylus" scoped>
.router-view
  width: 100%

.container
  padding-top: 20px
  padding-bottom: 20px
.startDate
  height: 30px

.buttons
  position: fixed
  bottom: 20px
  width: 100%
  text-align: center

.button
  width: 40%

.adminbutton 
  width: 47%

.notgoing
  width: 100%
  margin: 0

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
</style>

