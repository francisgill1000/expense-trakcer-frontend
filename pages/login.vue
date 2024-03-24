<!-- src/components/RegistrationForm.vue -->

<template>
  <v-container fluid>
    <v-row no-gutter>
      <v-col sm="12" md="4">
        <v-row>
          <!-- <v-col col="12" class="text-center white black--text">
            <b> Your Personal Expense Manager </b>
          </v-col> -->
          <v-col cols="12" class="text-center">
            <!-- <v-icon size="140" color="primary">mdi-bank</v-icon> -->
            <Logo class="mt-10" />
            <!-- <div>Your personal Expense Manager</div> -->
          </v-col>
          <v-col col="12" class="text-center white black--text">
            <b> Your Personal Expense Manager </b>
          </v-col>

          <v-col cols="12">
            <v-text-field outlined dense v-model="form.number" label="Number" required hide-details></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field outlined dense v-model="form.password" label="Password"
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show_password = !show_password"
              :type="show_password ? 'password' : ''" required hide-details></v-text-field>
          </v-col>
          <v-col v-if="error" cols="12" class="px-5 red--text">
            <small>{{ error }}</small>
          </v-col>
          <v-col cols="6">
            <v-checkbox dense hide-details class="pa-0 ma-0" v-model="rememberMe" label="Remember Me" />
          </v-col>
          <v-col cols="12">
            <v-btn @click="login" block class="primary">Login</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn @click="$router.push(`/register`)" block class="primary">Click here to Register</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "guest",
  auth: false,
  data() {
    return {
      show_password: false,
      form: {
        number: null,
        password: null,
      },
      error: null,
      rememberMe: false
    };
  },
  mounted() {
    if (this.$localStorage.get("number")) {
      this.form.number = this.$localStorage.get("number");
    }
    if (this.$localStorage.get("password")) {
      this.form.password = this.$localStorage.get("password");
    }

    if (this.$localStorage.get("number") && this.$localStorage.get("password")) {
      this.rememberMe = true;
    }
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000 * 60 * 15); //15 minutes
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
          if (this.rememberMe) {
            this.$localStorage.set("number", this.form.number);
            this.$localStorage.set("password", this.form.password);
          } else {
            this.$localStorage.remove("number");
            this.$localStorage.remove("password");
          }
          this.$router.push("/");
        })
        .catch(({ response }) => {
          // Handle login error
          this.error = response.data;
          console.error("Login failed:", response.data);
        });
    },
  },
};
</script>
