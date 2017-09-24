<template>
  <v-container fluid grid-list-md >
    <v-layout row wrap>
      <v-flex
        xs12 sm6 md4
        v-for="group in Object.values(groups)"
        :key="group.groupId"
        @click="$router.push(`/g/${group.groupId}/`)"
      >
        <v-card class="group">
          <v-card-media
            :src="group.pic_url || require('../assets/bg.jpg')" alt=""
            height="200px"
          >
          </v-card-media>
          <v-card-title primary-title>
            <h3 class="headline mb-0" v-text="group.name"></h3>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
    <!--
    <v-list-tile avatar @click="$router.push('/createGroup/')">
    <v-list-tile-avatar>
      <v-icon class="grey--text text--darken-1">add</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-title class="grey--text text--darken-1">
      Create a Group
    </v-list-tile-title>
    -->
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['groups']),
  },
}
</script>

<style lang="stylus" scoped>
.group
  cursor pointer
  transition all 0.2s

.group:hover
  transform translateY(-1px)
  box-shadow 0 2px 5px rgba(0, 0, 0, 0.5)
</style>
