<template>
  <v-container fluid>
    <div class="elevation-2">
      <v-list two-line subheader avatar>
        <v-subheader>Members</v-subheader>
        <v-list-tile v-for="user in group.userList" :key="user.fb_id" :ripple="false" tag="div">
          <v-list-tile-avatar xs3 id="set-avatar" >
            <img :src="`//graph.facebook.com/v2.10/${user.fb_id}/picture`" :alt="`${user.first_name}`">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.first_name }} {{ user.last_name }}</v-list-tile-title>
            <v-list-tile-sub-title>Attended: {{ user.going }}/{{ Object.keys(group.events).length }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-btn v-if="admin" @click="download" class="downloading" success dark large>Download Attendance Summary</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted() {
    this.$store.dispatch('fetchGroupAttendance', { groupId: this.groupId })
  },

  props: ['groupId'],

  computed: {
    ...mapState({
      group(state) {
        return state.groups[this.groupId]
      },
    }),
    admin: function() {
      var myId = this.$store.state.user.fbId
      var creatorId = this.group.creator_fb_id
      return myId.toString() === creatorId.toString()
    },
  },

  methods: {
    download() {
      this.$store.dispatch('downloadAttendance', { groupId: this.groupId })
    },
  }
}
</script>

<style lang="stylus" scoped>
.downloading
  width: 90%
  margin-left: 5%
  margin-right: 5%
</style>
