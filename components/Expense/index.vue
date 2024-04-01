<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-navigation-drawer absolute top v-model="filterForm">
        <v-toolbar dense flat
          >Filters <v-spacer />
          <v-icon @click="filterForm = false" color="primary"
            >mdi-close-circle-outline</v-icon
          ></v-toolbar
        >
        <v-row no-gutters class="pa-2">
          <v-col cols="12" class="mb-3">
            <DatePicker
              label="Start Date"
              paramKey="start_date"
              @date="getDateEvent"
            />
          </v-col>
          <v-col cols="12">
            <DatePicker
              label="End Date"
              paramKey="end_date"
              @date="getDateEvent"
            />
          </v-col>
          <v-col cols="12" class="mt-3">
            <v-btn block outlined color="primary" small @click="refresh"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </v-navigation-drawer>
      <v-toolbar class="mb-2" dense flat>
        <v-icon class="ml-2" color="primary" @click="reload">mdi-reload</v-icon>
        <v-icon class="ml-2" color="primary" @click="filterForm = true"
          >mdi-filter-outline</v-icon
        >
        <v-spacer></v-spacer>
        <ExpenseCreate @success="handleSuccess" />
      </v-toolbar>
      <DataTable
        editComponent="ExpenseEdit"
        :key="dataRefreshKey"
        :headers="headers"
        :endpoint="endpoint"
        :filters="filters"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    filterForm: false,
    Model: "Expenses",
    endpoint: "expense",
    dataRefreshKey: 0,
    headers: [
      {
        text: "Amount",
        align: "left",
        sortable: false,
        key: "amount",
        value: "amount",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Label",
        align: "left",
        sortable: false,
        key: "label",
        value: "label",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Shop Name",
        align: "left",
        sortable: false,
        key: "shop_name",
        value: "shop_name",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Date",
        align: "left",
        sortable: false,
        key: "date",
        value: "date",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Details",
        align: "left",
        sortable: false,
        key: "options",
        value: "options",
      },
    ],
    data: [],
    errors: [],
    tab: null,
    filters: {},
    isFilter: false,
    dateFilter: {},
  }),

  watch: {
    options: {
      handler() {},
      deep: true,
    },
  },
  methods: {
    async getTotalExpense() {
      this.filterForm = false;
      let { data } = await this.$axios.get("customExpense", {
        params: {
          ...this.filters,
          ...this.dateFilter,
        },
      });
      this.totalExpense = data;
      this.$emit("some_value", data);
    },

    refresh() {
      this.dataRefreshKey += 1;
      this.getTotalExpense();
    },

    getDateEvent(e) {
      this.dateFilter = {
        ...this.dateFilter,
        ...e,
      };
    },
    handleSuccess(value) {
      alert(value || `done`);
      this.refresh();
    },
    applyFilters() {
      this.refresh();
    },
    reload() {
      this.filters = {};
      this.isFilter = false;
      this.refresh();
    },
  },
};
</script>
