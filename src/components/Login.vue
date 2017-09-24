<template>
  <div class="login">
    <v-layout column wrap class="text-xs-center login">
      <div class="logo">
        <img alt="Go Lah!" src="../assets/logo.png" />
      </div>
      <div>
        <fb-signin-button
          :params="fbSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
          <v-btn fab large class="facebook" name="facebook login">
            <icon name="facebook" scale="2"></icon>
          </v-btn>
        </fb-signin-button>
      </div>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fbSignInParams: {
        scope: 'email',
        return_scopes: true,
      },
    }
  },

  methods: {
    onSignInSuccess(res) {
      this.$store.dispatch('login', {
        accessToken: res.authResponse.accessToken,
      })
    },
    onSignInError(err) {
      console.log(err)
    },
  },
}
</script>

<style lang="stylus" scoped>
.login
  background-image: url(../assets/bg.jpg)
  background-size: cover
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
