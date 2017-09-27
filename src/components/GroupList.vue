<template>
  <v-container fluid grid-list-md >
    <v-layout row wrap>
      <v-flex
        xs12 md6
        v-for="group in Object.values(groups)"
        :key="group.groupId"
        @click="$router.push(`/g/${group.groupId}/`)"
      >
        <v-card
          class="group"
          hover
        >
          <v-card-media
            :src="group.pic_url || ''" alt=""
            height="300px"
          >
          </v-card-media>
          <v-card-title primary-title>
            <h3 class="headline mb-0" v-text="group.name"></h3>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn fixed fab bottom right @click="$router.push(`/createGroup/`)">
      <icon name="plus"></icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted() {
    this.$store.dispatch('fetchGroups')
  },

  computed: {
    ...mapState(['groups']),
  },
}
</script>

<style lang="stylus" scoped>
.layout
  min-height 60px

.group
  cursor pointer
  transition all 0.2s

.button-wrapper
  position: relative
</style>
