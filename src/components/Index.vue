<template>
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.user.id == null) this.$router.push('/login')
  },

  data() {
    return {}
  },
}
</script>

<style lang="stylus" scoped>
</style>
