<template>
  <div>
    <h1>{{ group.name }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: ['groupId'],

  computed: {
    group: function() {
      return this.$store.getters.activeGroup(this.groupId)
    },
  },

  components: {},
}
</script>

<style lang="stylus" scoped>
</style>
