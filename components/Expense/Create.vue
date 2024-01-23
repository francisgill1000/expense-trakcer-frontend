<template>
  <!-- <v-container>
    <v-row>
      <v-col>
        <div class="headline text-centers">Record Your Expense</div>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="shop_name"
          label="Shop Name"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="label" label="Label" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="amount"
          label="Amount"
          type="number"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-date-picker
          color="blue"
          no-title
          v-model="date"
          label="Date"
          required
        ></v-date-picker>
      </v-col>
      <v-col cols="12" class="error--text" v-if="errorResponse">
        {{ errorResponse }}
      </v-col>
      <v-col>
        <v-btn type="submit" color="primary" @click="submit">Submit</v-btn>
      </v-col>
    </v-row>
  </v-container> -->
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" outlined dense color="">
          Expense
          <v-icon right dense dark>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <div class="headline text-centers">Record Your Expense</div>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="shop_name"
                  label="Shop Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="label"
                  label="Label"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="amount"
                  label="Amount"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-date-picker
                  color="blue"
                  no-title
                  v-model="date"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      shop_name: "",
      label: "",
      amount: "",
      date: null,
      errorResponse: null,
      data: [],
    };
  },
  async created() {
    // this.getData();
  },
  methods: {
    // async getData() {
    //   this.data = await this.$axios.get(`https://backend.florencetech.online/api/expense`);
    // },
    async submit() {
      try {
        const expenseData = {
          shop_name: this.shop_name,
          label: this.label,
          amount: this.amount,
          date: this.date,
          user_id: this.$auth.user.id,
        };
        // Sending the expense data to the backend
        await this.$axios.post("expense", expenseData);

        // Reset form fields after submitting
        this.shop_name = "";
        this.label = "";
        this.amount = "";
        this.date = null;

        this.$emit("success");
        this.dialog = false;
        // Optionally, you can fetch updated data from the server or perform other actions
      } catch ({ response }) {
        this.errorResponse = response.data.message;
        // console.error("Error adding expense:", response.data.message);
      }
    },
  },
};
</script>
