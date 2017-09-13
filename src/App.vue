<template>
  <v-fade-transition v-if="user.id == null">
    <v-app>
      <login />
    </v-app>
  </v-fade-transition>
  <v-app toolbar v-else>
    <v-navigation-drawer
      absolute
      temporary
      light
      v-model="drawer"
    >
      <group-list />
    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-side-icon v-if="!canGoBack" @click.stop="drawer = !drawer">
      </v-toolbar-side-icon>
      <v-btn v-else icon class="hidden-xs-only" @click.stop="$router.push('/')">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <main>
      <transition :name="transitionName">
        <router-view class="router-view"></router-view>
      </transition>
    </main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Login from '@/components/Login'
import GroupList from '@/components/GroupList'

export default {
  data() {
    return {
      canGoBack: this.$router.currentRoute.path.split('/').length > 2,
      drawer: false,
      transitionName: 'slide-left',
    }
  },

  props: ['title'],

  computed: {
    ...mapState(['user']),
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.canGoBack = toDepth > 2
      this.transitionName = toDepth < fromDepth ? 'back' : 'forward'
    },
  },

  components: {
    Login,
    GroupList,
  },
}
</script>

<style lang="stylus">
@import './stylus/main'

.router-view
  position: absolute;

.forward-enter-active, .back-enter-active
  transition: all 0.25s ease-out

.forward-leave-active, .back-leave-active
  transition: all 0.25s ease-in

.forward-enter, .back-leave-to
  transform: translate(100vw, 0)

.back-enter, .forward-leave-to
  transform: translate(-100vw, 0)

</style>
