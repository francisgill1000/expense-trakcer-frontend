<template>
  <div>
    
    <SingleCard label="Total Expense" :value="totalExpense" />

    <Expense
      @some_value="
        (e) => {
          totalExpense = e;
        }
      "
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    totalExpense: 0,
  }),
};
</script>
