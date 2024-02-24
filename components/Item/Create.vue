<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-icon right color="primary" v-bind="attrs" v-on="on"
          >mdi-plus-circle-outline</v-icon
        >
      </template>

      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <div class="headline text-centers">Create your item</div>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="label"
                  label="Label"
                  outlined
                  dense
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="amount"
                  label="Amount"
                  type="number"
                  required
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <UploadAttachment @uploaded="handleAttachment" />
              </v-col>
              <v-col cols="12" class="error--text" v-if="errorResponse">
                {{ errorResponse }}
              </v-col>
              <v-col cols="12">
                <v-btn type="submit" color="primary" @click="submit" block
                  >Submit</v-btn
                >
                <v-btn type="submit" @click="dialog = false" block>Close</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      label: "",
      amount: "",
      src: "",
      errorResponse: null,
      data: [],
    };
  },
  async created() {},
  methods: {
    handleAttachment(e) {
      this.src = e;
    },
    async submit() {
      try {

        let formData = new FormData();

        formData.append("label", this.label);
        formData.append("amount", this.amount);
        formData.append("user_id", this.$auth.user.id);
        formData.append("src", this.src);

        await this.$axios.post("item", formData);

        // Reset form fields after submitting
        this.$emit("success", "item has been created");
        this.dialog = false;
        // Optionally, you can fetch upsrcd data from the server or perform other actions
      } catch ({ response }) {
        this.errorResponse = response.data.message;
      }
    },
  },
};
</script>
