<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="secondary" small v-bind="attrs" v-on="on">
        mdi-pencil
      </v-icon>
      Edit
    </template>

    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <div class="headline text-centers">Edit Your Item</div>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="payload.label"
                label="Label"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="payload.amount"
                label="Amount"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <UploadAttachment @uploaded="handleAttachment" />
            </v-col>
            <v-col cols="12" class="error--text" v-if="errorResponse">
              {{ errorResponse }}
            </v-col>
            <v-col>
              <v-btn type="submit" color="primary" @click="submit"
                >Submit</v-btn
              >
            </v-col>
            <v-col> </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      dialog: false,
      errorResponse: null,
      data: [],

      payload: {
        label: "",
        amount: "",
        src: null,
      },
    };
  },
  async created() {
    // this.getData();
    this.payload = this.item;
  },
  methods: {
    handleAttachment(e) {
      this.payload.src = e;
    },
    // async getData() {
    //   this.data = await this.$axios.get(`https://backend.florencetech.online/api/item`);
    // },
    async submit() {
      try {
        let formData = new FormData();

        formData.append("label", this.payload.label);
        formData.append("amount", this.payload.amount);
        formData.append("src", this.payload.src);

        await this.$axios.post("item-update/" + this.payload.id, formData);

        this.$emit("success", "Item has been upsrcd");
        this.dialog = false;
        // Optionally, you can fetch upsrcd data from the server or perform other actions
      } catch ({ response }) {
        this.errorResponse = response.data.message;
        // console.error("Error adding item:", response.data.message);
      }
    },
  },
};
</script>
