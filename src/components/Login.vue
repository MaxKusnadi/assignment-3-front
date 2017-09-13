<template>
  <div>
    <div class="bg"></div>
    <v-layout column wrap class="text-xs-center login">
      <div class="logo">
        <img src="/" />
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
  </div>
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
.bg
  position: fixed
  left: 0
  right: 0
  z-index: 1
  min-height: 100vh

  background-image: url(https://source.unsplash.com/featured/?sports)
  background-size: cover
  filter: grayscale(50%) brightness(0.5)

.login
  position: fixed
  left: 0
  right: 0
  z-index: 2
  min-height: 100vh

  display: flex
  align-content: center
  justify-content: center

.logo
  width: 256px
  height: 256px
  margin: 0 auto 32px auto

.btn.btn--floating.facebook
  background-color: #3b5998
  color: #ffffff
  display: inline-block

.btn.btn--floating.google-plus
  background-color: #dd4b39
  color: #ffffff
  display: inline-block
</style>
