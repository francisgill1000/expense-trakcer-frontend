<template>
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
</template>
