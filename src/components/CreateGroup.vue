<template>
  <v-container fluid grid-list-md>
    <form class="white">
      <v-layout class="create-group-form">
        <v-avatar xs3 id="set-avatar" >
          <img :src="image" />
        </v-avatar>
        <v-text-field
          xs9
          label="Type group name here..."
          v-model="name"
          :counter="true"
        ></v-text-field>
      </v-layout>
      <div class="button-wrapper">
        <v-btn absolute fab top right dark class="green" @click="submit">
          <icon name="check"></icon>
        </v-btn>
      </div>
    </form>
    <avatar-cropper
      trigger="#set-avatar"
      upload-url="https://api.imgur.com/3/image"
      upload-form-name="image"
      :upload-headers="uploadHeaders"
      :uploaded="uploaded"
      :labels="{ submit: 'Done', cancel: 'Cancel' }"
    ></avatar-cropper>
    <v-snackbar
      :timeout="5000"
      success
      bottom
      v-model="isUploaded"
    >
      Uploaded!
    </v-snackbar>
  </v-container>
</template>

<script>
import AvatarCropper from 'vue-avatar-cropper'

export default {
  data() {
    return {
      uploadHeaders: {
        Authorization: 'Client-ID 8a15b5b4b5fb102',
      },
      isUploaded: false,
      image: '/static/img/logo.webp',
      valid: false,
      name: '',
    }
  },

  methods: {
    uploaded(res) {
      if (!res.success) return
      this.image = res.data.link
      this.isUploaded = true
    },
    submit() {
      this.$store.dispatch('createGroup', {
        name: this.name,
        description: null,
        picUrl: this.image,
      })
      this.$router.push('/')
    },
  },

  components: {
    AvatarCropper,
  },
}
</script>

<style lang="stylus" scoped>
#set-avatar
  padding-right 16px
  margin-top -10px

.create-group-form
  padding 16px

.button-wrapper
  position relative
</style>

<style lang="stylus">
.avatar-cropper-btn
  margin: 0
</style>
