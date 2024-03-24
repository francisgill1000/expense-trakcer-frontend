<template>
  <div>
    <v-card outlined>
      <ApexChartsBar />
    </v-card>

    <v-card outlined class="my-1">
      <v-toolbar flat dense dark color="primary">Expense List</v-toolbar>
      <Expense />
    </v-card>

    <!-- <v-tabs centered>
      <v-tab>Expense</v-tab>
      <v-tab>Income</v-tab>
      <v-tab-item>
        <ExpenseCreateForm />
      </v-tab-item>
      <v-tab-item>
        <IncomeCreateForm />
      </v-tab-item>
    </v-tabs> -->
    <!-- <v-container>
      <v-tabs v-model="tab" background-color="primary" dark centered>
        <v-tab>
          List View
        </v-tab>
        <v-tab>
          Graphical View
        </v-tab>
        <v-tab-item>
          <Expense />
        </v-tab-item>
        <v-tab-item>
          <ApexChartsBar />
        </v-tab-item>
      </v-tabs>
    </v-container> -->
  </div>
</template>
<script>

export default {
  data() {
    return {
      tab: null,
    };
  }
};
</script>