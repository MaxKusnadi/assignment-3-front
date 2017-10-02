<template>
  <v-app>
    <div class="tutorial">
      <v-stepper v-model="tutorialState" non-linear>
        <v-stepper-header>
          <v-stepper-step step="1" :complete="tutorialState > 1">Create Groups</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="tutorialState > 2">Create Events</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="tutorialState > 3">Take Attendance</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="tutorialState > 4">RSVP</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="5">Attend!</v-stepper-step>
        </v-stepper-header>
        <div v-show="tutorialState === 1">
          <v-card>
            <v-card-media>
              <img src="../assets/tutorial-01.png" />
            </v-card-media>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click.native="finish">Skip</v-btn>
              <v-btn primary @click.native="tutorialState = 2">Got It</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div v-show="tutorialState === 2">
          <v-card>
            <v-card-media>
              <img src="../assets/tutorial-02.png" />
            </v-card-media>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click.native="finish">Skip</v-btn>
              <v-btn primary @click.native="tutorialState = 3">Got It</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div v-show="tutorialState === 3">
          <v-card>
            <v-card-media>
              <img src="../assets/tutorial-03.png" />
            </v-card-media>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click.native="finish">Skip</v-btn>
              <v-btn primary @click.native="tutorialState = 4">Got It</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div v-show="tutorialState === 4">
          <v-card>
            <v-card-media>
              <img src="../assets/tutorial-04.png" />
            </v-card-media>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click.native="finish">Skip</v-btn>
              <v-btn primary @click.native="tutorialState = 5">Got It</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div v-show="tutorialState === 5">
          <v-card>
            <v-card-media>
              <img src="../assets/tutorial-05.png" />
            </v-card-media>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn primary @click.native="finish">That's all!</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-stepper>
    </div>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('fetchGroups')
  },

  data() {
    return {
      tutorialState: 1,
    }
  },

  methods: {
    finish() {
      this.$store.dispatch('finishTutorial')
    },
  },
}
</script>

<style lang="stylus" scoped>
.tutorial
  background-color: #fff

.button
  position: fixed
  z-index: 2
  bottom: 60px

img
  height: fill-available
  object-fit: contain

.card__actions
  background-color: #fff
  position: fixed
  bottom: 0
  left: 0
  right: 0

</style>
