<template>
  <div>
    <v-tabs centered>
      <v-tab>Expense</v-tab>
      <v-tab>Income</v-tab>
      <v-tab-item>
        <ExpenseCreateForm />
      </v-tab-item>
      <v-tab-item>
        <IncomeCreateForm />
      </v-tab-item>
    </v-tabs>
    <v-container>
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
    </v-container>
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