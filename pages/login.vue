<!-- src/components/RegistrationForm.vue -->

<template>
  <div>
    <v-row no-gutter>
      <v-col>
        <v-col col="12" class="text-center white black--text">
          <b> Your Personal Expense Manager </b>
        </v-col>
      </v-col>
    </v-row>
    <v-container fill-height>
      <v-row no-gutter class="ma-2">
        <v-col cols="12" class="text-center">
          <Logo class="my-5" />
          <!-- <div>Your personal Expense Manager</div> -->
        </v-col>
        <v-col cols="12">
          <v-text-field
            outlined
            dense
            v-model="form.number"
            label="Number"
            required
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            outlined
            dense
            v-model="form.password"
            label="Password"
            type="password"
            required
            hide-details
          ></v-text-field>
        </v-col>
        <v-col v-if="error" cols="12" class="px-5 red--text">
          <small>{{ error }}</small>
        </v-col>

        <v-col cols="12">
          <v-btn @click="login" outlined block>Login</v-btn>
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
  auth:false,
  data() {
    return {
      form: {
        number: null,
        password: null,
      },
      error: null,
    };
  },
  methods: {
    async login() {
      // Call your login method here
      this.$auth
        .loginWith("local", {
          data: this.form,
        })
        .then(() => {
          // Redirect or perform actions after successful login
          this.$router.push("/");
        })
        .catch((error) => {
          // Handle login error
          console.error("Login failed:", error);
        });
    },
  },
};
</script>
