<template>
  <div class="login">
    <!-- <loader v-if="user.loggedIn == null" /> -->
    <v-layout column wrap class="text-xs-center login">
      <div class="logo">
        <img alt="Golah" src="/static/img/logo.png" />
      </div>
      <div>
        <fb-signin-button
          name="Facebook Login"
          class="facebook btn btn--floating btn--large btn--raised"
          :params="fbSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >
          <div class="btn__content">
            <icon name="facebook" scale="2"></icon>
          </div>
        </fb-signin-button>
      </div>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      fbSignInParams: {
        scope: 'email',
        return_scopes: true,
      },
    }
  },

  computed: {
    ...mapState(['user']),
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
  background-image url(/static/img/bg.webp)
  background-size cover
  background-position 50% 50%
  position fixed
  left 0
  right 0
  z-index 2
  min-height 100vh

  display flex
  align-content center
  justify-content center

.logo
  width 256px
  height 256px
  margin 0 auto 32px auto

.btn.btn--floating.facebook
  background-color #3b5998
  color #ffffff
  display inline-block

.btn.btn--floating.google-plus
  background-color #dd4b39
  color #ffffff
  display inline-block
</style>
