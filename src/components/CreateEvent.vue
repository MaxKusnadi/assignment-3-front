<template>
  <v-container fluid>
    <form class="white">
      <div class="create-group-form">
        <v-container grid-list-xs text-xs-center>
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
              v-model="modal"
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
              <v-time-picker v-model="startTime" actions>
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
              v-model="modal"
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
              v-model="modal2"
              lazy
            >
              <v-text-field
                slot="activator"
                label="End Time"
                v-model="endTime"
                prepend-icon="access_time"
                readonly
              ></v-text-field>
              <v-time-picker v-model="endTime" actions>
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
              v-model="location"
              prepend-icon="location_on"
              :counter="true"
            ></v-text-field>
          </v-flex>
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
        </v-container>
      </div>
      <div class="button-wrapper">
        <v-btn absolute fab top right dark class="green" @click="$router.go(-1)">
          <icon name="check"></icon>
        </v-btn>
      </div>
    </form>
  </v-container>
</template> 

<script>
import AvatarCropper from 'vue-avatar-cropper'

export default {
  data() {
    return {
      valid: false,
      eventName: '',
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      menu: false,
      modal: false,
      menu2: false,
      modal2: false,
      location: '',
      alert: null,
      items: [
        { text: 'State 1' },
        // { text: 'State 2' },
        // { text: 'State 3' },
        // { text: 'State 4' },
        // { text: 'State 5' },
      ],
      states: ['10 minutes', '30 minutes', '1 hour', '2 hours', '1 day'],
      description: '',
    }
  },

  methods: {
    uploaded(res) {
      console.log(res)
    },
    submit() {
      this.$router.push('/')
    },
  },

  components: {
    AvatarCropper,
  },
}
</script>

<style lang="stylus" scoped>
.create-group-form
  padding: 16px

.button-wrapper
  position: relative

.dialog__container
  width: 90%

.textinput
  height: 60px

.datetime
  height: 50px

</style>

<style lang="stylus">
.avatar-cropper-btn
  margin: 0
</style>
