<template>
  <v-container fluid>
    <form class="white elevation-2">
      <div class="create-group-form">
        <v-layout row wrap>
          <v-flex xs12 sm12 class='textinput'>
            <v-text-field
              label="Event name"
              v-model="eventName"
              :counter="true"
            ></v-text-field>
          </v-flex>
          <v-flex xs6 sm6 class="datetime">
            <v-dialog
              persistent
              v-model="modal1"
              lazy
              full-width
            >
              <v-text-field
                slot="activator"
                label="Start Date"
                v-model="startDate"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="startDate" scrollable >
                <template scope="{ save, cancel }">
                  <v-card-actions>
                    <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                    <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-dialog>
          </v-flex>

          <v-flex xs6 sm6 class="datetime">
            <v-dialog
              persistent
              v-model="modal2"
              lazy
            >
              <v-text-field
                slot="activator"
                label="Start Time"
                v-model="startTime"
                prepend-icon="access_time"
                readonly
              ></v-text-field>
              <v-time-picker v-model="startTime" format="24hr" actions>
                <template scope="{ save, cancel }">
                  <v-card-actions>
                    <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                    <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                </template>
              </v-time-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs6 sm6 class="datetime">

            <v-dialog
              persistent
              v-model="modal3"
              lazy
              full-width
            >

              <v-text-field
                slot="activator"
                label="End Date"
                v-model="endDate"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="endDate" scrollable >
                <template scope="{ save, cancel }">
                  <v-card-actions>
                    <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                    <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-dialog>
          </v-flex>

          <v-flex xs6 sm6 class="datetime">
            <v-dialog
              persistent
              v-model="modal4"
              lazy
            >
              <v-text-field
                slot="activator"
                label="End Time"
                v-model="endTime"
                prepend-icon="access_time"
                readonly
              ></v-text-field>
              <v-time-picker v-model="endTime" format="24hr" actions>
                <template scope="{ save, cancel }">
                  <v-card-actions>
                    <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                    <v-btn flat primary @click.native="save()">Save</v-btn>
                  </v-card-actions>
                </template>
              </v-time-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs12 sm12 class='textinput'>
            <v-text-field
              label="Location"
              v-model="locationName"
              prepend-icon="location_on"
            ></v-text-field>
          </v-flex>
          <gmap-map
            :center="currentLocation"
            :zoom="12"
            map-type-id="terrain"
            style="width: 100%; height: 300px"
          >
            <gmap-marker
              :position="location"
              @position_changed="updateLocation"
              :clickable="true"
              :draggable="true"
              @click="center=location"
            ></gmap-marker>
          </gmap-map>
          <v-flex xs12 sm12 class='textinput'>
            <v-select
              v-bind:items="states"
              v-model="alert"
              label="Notify members in advance"
              single-line
              prepend-icon="add_alert"
            ></v-select>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field
              label="Description (Optional)"
              v-model="description"
              :counter="false"
              multi-line
            ></v-text-field>
          </v-flex>
        </v-layout>
        <div class="button-wrapper">
        <v-btn absolute fab top right dark class="green" @click="submit">
          <icon name="check"></icon>
        </v-btn>
      </div>
      </div>
    </form>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  async mounted() {
    this.location = await this.$getLocation()
    this.currentLocation = this.location
  },

  data() {
    return {
      valid: false,
      eventName: '',
      startDate: moment().format('YYYY-MM-DD'),
      startTime: moment().format('hh:mm'),
      endDate: moment().format('YYYY-MM-DD'),
      endTime: moment().format('hh:mm'),
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      locationName: '',
      currentLocation: { lat: 0, lng: 0 },
      location: { lat: 0, lng: 0 },
      alert: null,
      states: ['10 minutes', '30 minutes', '1 hour', '2 hours', '1 day'],
      description: '',
    }
  },
  props: ['groupId'],
  methods: {
    uploaded(res) {
      console.log(res)
    },
    submit() {
      this.$store.dispatch('createEvent', {
        groupId: this.groupId,
        name: this.eventName,
        startDate: this.startDate,
        startTime: this.startTime,
        endDate: this.endDate,
        endTime: this.endTime,
        description: this.description,
        location: JSON.stringify({
          name: this.locationName,
          coords: this.location,
        }),
      })
      this.$router.push(`/g/${this.groupId}/`)
    },
    updateLocation(position) {
      this.location = {
        lat: position.lat(),
        lng: position.lng(),
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.create-group-form
  padding: 0 16px

.button-wrapper
  position: relative

.dialog__container
  width: 90%

.textinput
  height: 60px

.datetime
  height: 50px

</style>
