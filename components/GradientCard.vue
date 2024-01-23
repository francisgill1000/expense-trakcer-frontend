<template>
  <v-card class="dark-gradient-card">
    <!-- Your card content goes here -->
    <v-card-title class="white--text">
      <v-row>
        <v-col>Today Expense</v-col>
        <v-col class="text-right">{{ todayExpense }}</v-col>
      </v-row>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    todayExpense: null,
  }),
  created() {
    this.$axios
      .get(`todayExpense`, {
        params: {
          user_id: this.$auth.user.id,
        },
      })
      .then(({ data }) => {
        this.todayExpense = data.toLocaleString("en-US", {
          style: "currency",
          currency: "AED",
        });
      });
  },
};
</script>

<style scoped>
.dark-gradient-card {
  background: linear-gradient(to right, #002846, #1cb5e0);
}
</style>
