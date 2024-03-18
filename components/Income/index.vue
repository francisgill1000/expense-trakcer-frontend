<template>
  <v-row no-gutters>
    <v-navigation-drawer absolute top v-model="filterForm">
      <v-toolbar dense flat>Filters <v-spacer />
        <v-icon color="primary" @click="filterForm = false">mdi-close-circle-outline</v-icon></v-toolbar>
      <v-row no-gutters class="pa-2">
        <v-col cols="12" class="mb-3">
          <DatePicker label="Start Date" paramKey="start_date" @date="getDateEvent" />
        </v-col>
        <v-col cols="12">
          <DatePicker label="End Date" paramKey="end_date" @date="getDateEvent" />
        </v-col>
        <v-col cols="12" class="mt-3">
          <v-btn block outlined color="primary" small @click="refresh">Submit</v-btn>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <!-- <v-dialog v-model="filterForm">
      <v-card>
        <v-card-title>
          Filters <v-spacer></v-spacer
          ><v-icon @click="filterForm = false"
            >mdi-close-circle-outline</v-icon
          ></v-card-title
        >
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
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
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog> -->
    <v-col md="12" sm="12">
      <v-toolbar class="mb-2" dense flat>
        <v-icon class="ml-2" color="primary" @click="reload">mdi-reload</v-icon>
        <v-icon class="ml-2" color="primary" @click="filterForm = true">mdi-filter-outline</v-icon>
        <v-spacer></v-spacer>
        <IncomeCreate @success="handleSuccess" />
      </v-toolbar>
      <DataTable :key="dataRefreshKey" :headers="headers" :endpoint="endpoint" :filters="filters" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    filterForm: false,
    Model: "Incomes",
    endpoint: "income",
    dataRefreshKey: 0,
    headers: [
      {
        text: "#",
        align: "left",
        sortable: false,
        key: "id",
        value: "id",
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
        text: "Amount",
        align: "left",
        sortable: false,
        key: "amount",
        value: "amount",
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

    disabled: false,

    menu: false,
    payload: {},

    tab: null,

    totalRowsCount: 0,
    filters: {},
    isFilter: false,
    sortBy: "id",
    sortDesc: false,
    snack: false,
    snackColor: "",
    snackText: "",
    loading: true,
    DialogBox: false,
    response: "",
    snackbar: false,
    options: {},
    search: "",
    snackbar: false,
    ids: [],
    loading: false,
    //total: 0,
    editedIndex: -1,
    response: "",
    formAction: "Create",
  }),

  async created() {
    this.loading = false;
  },

  watch: {
    options: {
      handler() {
        this.refresh();
      },
      deep: true,
    },
  },
  methods: {
    getDateEvent(e) {
      this.filters = {
        ...this.filters,
        ...e,
      };
      this.refresh();
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
    refresh() {
      this.dataRefreshKey += 1;
    },
  },
};
</script>
