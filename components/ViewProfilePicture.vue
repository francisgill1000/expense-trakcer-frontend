<template>
  <div class="text-center">
    <v-avatar style="border: 1px solid #6946dd" size="175">
      <img :src="PlaceHolderImage" ref="img" alt="" />
    </v-avatar>
  </div>
</template>
<script>
export default {
  auth: false,
  layout: "login",

  props: {
    PreviewImage: {
      type: String,
      default: "/no-profile-image.jpg",
    },
  },

  data: () => ({
    isClicked: false,
    isCamera: false,
    videoStream: null,
    isUpload: true,
    PlaceHolderImage: null,
  }),

  mounted() {
    this.PlaceHolderImage = this.PreviewImage;
  },
};
</script>
