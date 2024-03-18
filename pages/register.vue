<!-- src/components/RegistrationForm.vue -->

<template>
  <div>
    <v-container fluid>
      <v-row no-gutter>
        <v-col cols="12" class="text-center">
          <Logo class="mt-10" />
          <!-- <div>Your personal Expense Manager</div> -->
        </v-col>
        <v-col col="12" class="text-center white black--text">
          <b> Your Personal Expense Manager </b>
        </v-col>

        <v-col cols="12">
          <v-text-field outlined dense v-model="form.name" label="Name" required hide-details></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field outlined dense v-model="form.number" label="Number" required hide-details></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field outlined dense v-model="form.password" label="Password" type="password" required
            hide-details></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field outlined dense v-model="form.password_confirmation" label="Confirm Password" type="password"
            required hide-details></v-text-field>
        </v-col>
        <v-col v-if="error" cols="12" class="px-5 red--text">
          <small>{{ error }}</small>
        </v-col>
        <v-col cols="12">
          <v-btn @click="submitForm" block class="primary">Register</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn @click="$router.push(`/login`)" block class="primary">Click here to Login</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "guest",
  auth: false,
  data() {
    return {
      form: {
        name: "",
        number: "",
        password: "",
        password_confirmation: "",
      },
      error: null,
    };
  },
  methods: {
    async submitForm() {
      // Handle form submission here
      // You can use axios or another method to send the data to your API
      console.log("Form submitted:", this.form);
      try {
        let { res } = await this.$axios.post(`user`, this.form);
        // this.response = {
        //   success: true,
        //   message: ,
        // };
        alert(`"Your registration completed"`);

        this.$router.push("/login");
      } catch ({ response }) {
        console.log((this.error = response?.data?.message));
      }
    },
  },
};
</script>
