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
                <div class="headline text-centers">Record Your Income</div>
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
                <v-date-picker
                  color="blue"
                  no-title
                  v-model="payload.date"
                  label="Date"
                  required
                ></v-date-picker>
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
        date: null,
      },
    };
  },
  async created() {
    // this.getData();
    this.payload = this.item;
  },
  methods: {
    // async getData() {
    //   this.data = await this.$axios.get(`https://backend.florencetech.online/api/income`);
    // },
    async submit() {
      try {
        const incomeData = {
          label: this.payload.label,
          amount: this.payload.amount,
          date: this.payload.date,
          user_id: this.$auth.user.id,
        };
        // Sending the income data to the backend
        await this.$axios.put("income/" + this.payload.id,
          incomeData
        );

        // Reset form fields after submitting
        // this.payload.label = "";
        // this.payload.amount = "";
        // this.payload.date = null;

        this.$emit("success","Income has been updated");
        this.dialog = false;
        // Optionally, you can fetch updated data from the server or perform other actions
      } catch ({ response }) {
        this.errorResponse = response.data.message;
        // console.error("Error adding income:", response.data.message);
      }
    },
  },
};
</script>
