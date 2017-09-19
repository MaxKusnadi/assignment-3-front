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
          <v-list-tile-title>from {{event.startTime}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>to {{event.startTime}}</v-list-tile-title>
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
    <div v-if='admin'>
      <v-list>
        <v-list-group v-for="item in items" v-bind:key="item.title">
          <v-list-tile slot="item" @click="">
            <v-list-tile-action>
              <v-icon class="indigo--text">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-for="member in item.members" v-bind:key="member.name" @click="">
            <v-list-tile-avatar>
                <img :src="`https://source.unsplash.com/a/256x256`" alt="">
              </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{groupId}}groupid:{{eventId}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
      <v-dialog v-model="dialog" persistent>
        <v-btn primary dark large slot="activator" class="attendance">Take Attendance</v-btn>
        <v-card>
          
          <v-card-text>
            <v-text-field v-model="vcode" label="Create verification code"></v-text-field>
            <small>*Participants have to key in this code to indicate attendance</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div> 
      
    <div class="buttons" v-else>
            <v-btn primary dark large class="button">Going</v-btn>
            <v-btn error dark large class="button">Not Going</v-btn>
    </div>
  </div>
</template> 

<script>
export default {
  mounted() {
    this.$store.dispatch('fetchEvent', { eventId: this.eventId })
  },

  data() {
    return {
      admin: true,
      dialog: false,
      vcode: null,
      items: [
        {
          icon: 'mood',
          title: 'Going',
          members: [{ name: 'Alice' }],
        },
        {
          icon: 'mood_bad',
          title: 'Not Going',
          members: [{ name: 'Bob' }],
        },
      ],
    }
  },

  props: ['groupId', 'eventId'],

  computed: {
    event: function() {
      return {
        name: 'Training',
        startTime: '2017-9-30 9:30pm',
        endTime: '2017-9-30 11:30pm',
        location: 'comm hall level 1',
        description: 'please bring along an extra t-shirt.',
      }
    },
  },

  methods: {
    uploaded(res) {
      console.log(res)
    },
    submit() {
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

.attendance
  position: fixed
  bottom: 0px
  width: 100%
  margin: 0
</style>

<style lang="stylus">
.avatar-cropper-btn
  margin: 0
</style>
