<template>
  <v-container fluid grid-list-md >
    <div v-if="noGroup" class="noGroup">
      <v-btn primary dark large class="createGroup" @click="$router.push(`/createGroup/`)">Create your first Group</v-btn> 
    </div>
    <div v-else>
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
      <v-btn dark :class="accent" fixed fab bottom right @click="$router.push(`/createGroup/`)">
        <icon name="plus"></icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted() {
    this.$store.dispatch('fetchGroups')
  },

  computed: {
    ...mapState({
      groups: state => state.groups,
      accent: state => state.settings.accent,
    }),
    noGroup: function() {
      return Object.keys(this.groups).length === 0
    }
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

.noGroup
  background-image url(/static/img/bg.webp)
  background-repeat repeat
  position fixed
  left 0
  right 0
  z-index 2
  min-height 100vh

.createGroup
  background-color: grey
  position: fixed
  top: 200px
  width: 70%
  margin-left: 15%
  margin-right: 15%
</style>
