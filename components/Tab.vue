<template>
  <v-tabs v-model="activeTab" background-color="primary" dense centered dark>
    <v-tab v-for="(tab, index) in tabs" :key="index">
      {{ tab }}
    </v-tab>

    <v-tab-item>
      <Expense />
    </v-tab-item>

    <v-tab-item>
      <v-card>
        <v-card-text>
          <!-- Content for the Profit/Loss tab -->
          <p>This is the Profit/Loss tab content.</p>
        </v-card-text>
      </v-card>
    </v-tab-item>

    <v-tab-item>
      <v-card>
        <v-card-text>
          <!-- Content for the Income tab -->
          <p>This is the Income tab content.</p>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        "Expense",
        //  "Profit/Loss",
        //  "Earning"
      ],
    };
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
