<template>
  <group-list />
</template>

<script>
import GroupList from '@/components/GroupList'

export default {
  mounted() {
    this.$store.dispatch('fetchGroups')
  },

  components: {
    GroupList,
  },
}
</script>

<style lang="stylus" scoped>
</style>
