<template>
  <v-layout column wrap class="text-xs-center">
    <div class="logo">
      <img src="https://source.unsplash.com/random/256x256" />
    </div>
    <div>
      <v-btn fab large class="facebook" @click="signInWithFacebook">
        <icon name="facebook" scale="2"></icon>
      </v-btn>
      <v-btn fab large class="google-plus" @click="signInWithGoogle">
        <icon name="google-plus" scale="2"></icon>
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
import { mockLogin } from '@/utils'

export default {
  data() {
    return {}
  },

  methods: {
    signInWithFacebook() {
      mockLogin(this.$store)
    },

    signInWithGoogle() {
      mockLogin(this.$store)
    },
  },
}
</script>

<style lang="stylus" scoped>
.logo
  width: 256px
  height: 256px
  margin: auto

.btn.btn--floating.facebook
  background-color: #3b5998
  color: #ffffff
  display: inline-block

.btn.btn--floating.google-plus
  background-color: #dd4b39
  color: #ffffff
  display: inline-block
</style>
