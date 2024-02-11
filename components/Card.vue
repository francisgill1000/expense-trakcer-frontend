<template>
  <div>
    <v-row v-for="(card, index) in cards" :key="index" class="my-5">
      <v-col cols="12">
        {{ card.title }}
      </v-col>

      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>

      <v-col v-for="(row, index) in card.data" :key="index" cols="4">
        <v-card class="dark-gradient-card">
          <!-- Your card content goes here -->
          <v-card-title class="white--text">
            <v-row>
              <v-col>{{ row.label }}</v-col>
              <v-col class="text-right"
                >{{ getCurrencyType(row.value) }}</v-col
              >
            </v-row>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
    };
  },
  mounted() {
    // Assuming you fetch JSON data from an API or a local file
    this.fetchCardData();
  },
  methods: {
    getCurrencyType(data) {
      return data.toLocaleString("en-US", {
        style: "currency",
        currency: "AED",
      });
    },
    fetchCardData() {
      // Assuming you fetch JSON data from an API or a local file
      // Replace this with your actual fetch logic
      // Example JSON data structure
      const jsonData = [
        {
          title: "Today",
          data: [
            {
              endpoint: "todayExpense",
              label: "Expense",
              value: 5.0,
            },
            {
              endpoint: "todayIncome",
              label: "Income",
              value: 10.0,
            },
            {
              endpoint: "todayIncome",
              label: "Profit/Loss",
              value: 5.0,
            },
          ],
        },
        {
          title: "Weekly",
          data: [
            {
              endpoint: "todayExpense",
              label: "Expense",
              value: 5.0,
            },
            {
              endpoint: "todayIncome",
              label: "Income",
              value: 10.0,
            },
            {
              endpoint: "todayIncome",
              label: "Profit/Loss",
              value: 5.0,
            },
          ],
        },
        {
          title: "Monthly",
          data: [
            {
              endpoint: "todayExpense",
              label: "Expense",
              value: 5.0,
            },
            {
              endpoint: "todayIncome",
              label: "Income",
              value: 10.0,
            },
            {
              endpoint: "todayIncome",
              label: "Profit/Loss",
              value: 5.0,
            },
          ],
        },
      ];

      // Update the cards data
      this.cards = jsonData;
    },
  },
};
</script>
<style scoped>
.dark-gradient-card {
  background: linear-gradient(to right, #002846, #1cb5e0);
}
</style>
