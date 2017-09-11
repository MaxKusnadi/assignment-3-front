<template>
  <login v-if="user.id == null" />
  <div v-else>
    <h1>Hello World</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from '@/components/Login'

export default {
  data() {
    return {}
  },

  computed: mapState({
    user: state => state.user,
  }),

  components: {
    Login,
  },
}
</script>

<style lang="stylus" scoped>
</style>
