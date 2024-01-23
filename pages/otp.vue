<!-- src/components/RegistrationForm.vue -->

<template>
  <div>
    <v-container fluid>
      <v-row no-gutter>
        <v-col col="12" class="text-center white black--text">
          <b> Your Personal Expense Manager </b>
        </v-col>

        <v-col cols="12" class="text-center">
          <Logo class="my-5" />
          <!-- <div>Your personal Expense Manager</div> -->
        </v-col>
        <v-col cols="12">
          <v-otp-input length="6"></v-otp-input>
        </v-col>
        <v-col v-if="error" cols="12" class="px-5 red--text">
          <small>{{ error }}</small>
        </v-col>
        <v-col cols="12">
          <v-btn @click="submitForm" outlined block>Enter OTP</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn @click="$router.push(`/login`)" outlined block
            >Click here to Login</v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-btn @click="$router.push(`/register`)" outlined block
            >Click here to Register</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "guest",
  data() {
    return {
      number:null,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      // Handle form submission here
      // You can use axios or another method to send the data to your API
      try {
        // let { res } = await this.$axios.post(
        //   `http://localhost:8000/api/user`,
        //   this.number
        // );
        // this.response = {
        //   success: true,
        //   message: ,
        // };
        // alert(`"Your registration completed"`);

        this.$router.push("/reset-password");
      } catch ({ response }) {
        console.log((this.error = response?.data?.message));
      }
    },
  },
};
</script>
