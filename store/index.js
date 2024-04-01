export const state = () => ({
  totalExpense: 0
});

export const mutations = {
  updateTotalExpense(state, value) {
    state.totalExpense = value;
  }
};
