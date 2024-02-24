<template>
  <v-container>
    <v-row>
      <!-- <v-col>
        <div class="headline text-centers">Record Your Expense</div>
      </v-col> -->
      <v-col cols="12">
        <v-text-field
          v-model="shop_name"
          label="Shop Name"
          outlined
          dense
          hide-details
          required
        ></v-text-field>
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
          outlined
          dense
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <DatePicker
            @date="
              (e) => {
                date = e.date;
              }
            "
          />

      </v-col>
      <v-col cols="12" class="error--text" v-if="errorResponse">
        {{ errorResponse }}
      </v-col>
      <v-col cols="12">
        <v-btn type="submit" color="primary" block @click="submit">Submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
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

        alert("Expense has been recorded");

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
