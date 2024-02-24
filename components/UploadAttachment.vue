<template>
  <v-card outlined>
    <v-container>
      <div class="text-center">
      <v-avatar size="225" tile>
        <v-img style="width: 100%" :src="imagePreview"></v-img>
      </v-avatar>
    </div>
    <v-btn
      outlined
      block
      color="primary"
      class="mt-2"
      @click="onpick_attachment"
      >{{ !upload.name ? "Upload" : "Change" }}
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
    <input
      required
      type="file"
      @change="attachment"
      style="display: none"
      accept="image/*"
      ref="attachment_input"
    />
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    imagePreview: "/placeholder.jpg",
    upload: {
      name: "",
    },
  }),
  methods: {
    onpick_attachment() {
      this.$refs.attachment_input.click();
    },
    attachment(e) {
      this.upload.name = e.target.files[0] || "";

      let input = this.$refs.attachment_input;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("uploaded", file[0]);
      }
    },
  },
};
</script>
