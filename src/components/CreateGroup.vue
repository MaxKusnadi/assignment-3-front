<template>
  <v-container fluid>
    <form class="white">
      <div class="create-group-form">
        <v-avatar
        id="set-avatar"
        >
          <img src="" />
        </v-avatar>
        <v-text-field
          label="Type group name here..."
          v-model="name"
          :counter="true"
        ></v-text-field>
      </div>
      <div class="button-wrapper">
        <v-btn absolute fab top right dark class="green" @click="submit">
          <icon name="check"></icon>
        </v-btn>
      </div>
    </form>
    <avatar-cropper
      trigger="#set-avatar"
      upload-url="/"
      :uploaded="uploaded"
      :labels="{ submit: 'Done', cancel: 'Cancel' }"
    ></avatar-cropper>
  </v-container>
</template>

<script>
import AvatarCropper from 'vue-avatar-cropper'

export default {
  data() {
    return {
      valid: false,
      name: '',
    }
  },

  methods: {
    uploaded(res) {
      console.log(res)
    },
    submit() {
      this.$router.push('/')
    },
  },

  components: {
    AvatarCropper,
  },
}
</script>

<style lang="stylus" scoped>
.create-group-form
  padding: 16px

.button-wrapper
  position: relative
</style>

<style lang="stylus">
.avatar-cropper-btn
  margin: 0
</style>
