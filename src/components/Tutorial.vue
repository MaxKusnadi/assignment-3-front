<template>
  <div>
    <v-carousel v-bind:cycle="false" class="car">
      <v-carousel-item>
        <img src="../assets/tutorial-01.png" />
      </v-carousel-item>
      <v-carousel-item>
        <img src="../assets/tutorial-02.png" />
      </v-carousel-item>
     <v-carousel-item>
        <img src="../assets/tutorial-03.png" />
      </v-carousel-item>
      <v-carousel-item>
        <img src="../assets/tutorial-04.png" />
      </v-carousel-item>
      <v-carousel-item class="last">
        <img src="../assets/tutorial-05.png" />
        <v-btn primary dark large class="button" @click="finish">Start</v-btn>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('fetchGroups')
  },
  data() {
    return {}
  },
  methods: {
    finish() {
      console.log('okim here')
      this.$store.dispatch('finishTutorial')
    },
  },
}
</script>

<style lang="stylus" scoped>
.car
  height: -webkit-fill-available
  z-index: 1

img
  width: 100%
  
.last
  align-items: center
  width: 100%
.button
  position: fixed
  z-index: 2
  bottom: 60px


</style>
