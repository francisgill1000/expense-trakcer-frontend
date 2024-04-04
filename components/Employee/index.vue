<template>
  <v-row no-gutters>
    <v-navigation-drawer absolute top v-model="filterForm">
      <v-toolbar dense flat
        >Filters <v-spacer />
        <v-icon @click="filterForm = false"
          >mdi-close-circle-outline</v-icon
        ></v-toolbar
      >
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
        <v-col cols="12">
          <div class="ma-2">
            <v-btn @click="getDataFromApi">Submit</v-btn>
          </div>
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
      <v-toolbar class="my-1" color="primary" dark rounded dense>
        <v-toolbar-title>
          <span>{{ Model }} </span>
        </v-toolbar-title>
      </v-toolbar>
      <v-data-table
        dense
        :headers="headers"
        :items="data"
        :loading="loading"
        :options.sync="options"
        :footer-props="{
          itemsPerPageOptions: [15, 30, 50],
        }"
        class="elevation-1"
        :server-items-length="totalRowsCount"
      >
        <template v-slot:top>
          <v-toolbar class="mb-2" dense flat>
            <span>
              <v-icon class="ml-2" @click="reload" color="primary"
                >mdi-reload</v-icon
              >
            </span>
            <span>
              <v-icon class="ml-2" @click="filterForm = true" color="primary"
                >mdi-filter-outline</v-icon
              >
            </span>

            <v-spacer></v-spacer>
            <EmployeeCreate @success="handleSuccess" />
          </v-toolbar>
        </template>
        <template v-slot:item.profile_picture="{ item }">
          <v-row>
            <v-col cols="2">
              <v-avatar size="50" class="my-3">
                <v-img style="width: 100%" :src="item.profile_picture"></v-img>
              </v-avatar>
            </v-col>
            <v-col>
              <div class="mt-2">
                <strong>{{item.name}}</strong>
              </div>
              <small>{{item.email}}</small>
              <br>
              <small>{{item.phone}}</small>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.options="{ item }">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark-2 icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list width="120" dense>
              <v-list-item @click="viewItem(item)">
                <v-list-item-title style="cursor: pointer">
                  <EmployeeSingle @success="handleSuccess" :item="item" />
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title style="cursor: pointer">
                  <EmployeeEdit @success="handleSuccess" :item="item" />
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title style="cursor: pointer">
                  <Delete
                    @success="handleSuccess"
                    :id="item.id"
                    :endpoint="endpoint"
                  />
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    filterForm: false,
    Model: "Item",
    endpoint: "employee",
    headers: [
      {
        text: "Employee",
        align: "left",
        sortable: false,
        key: "profile_picture",
        value: "profile_picture",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Address",
        align: "left",
        sortable: false,
        key: "address",
        value: "address",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Date Of Birth",
        align: "left",
        sortable: false,
        key: "date_of_birth",
        value: "date_of_birth",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Position",
        align: "left",
        sortable: false,
        key: "position",
        value: "position",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Salary",
        align: "left",
        sortable: false,
        key: "salary",
        value: "salary",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Hire Date",
        align: "left",
        sortable: false,
        key: "hire_date",
        value: "hire_date",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Legal Id",
        align: "left",
        sortable: false,
        key: "legal_id",
        value: "legal_id",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Local Legal Id",
        align: "left",
        sortable: false,
        key: "local_legal_id",
        value: "local_legal_id",
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
    this.getDataFromApi();
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi();
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
      this.getDataFromApi();
    },
    handleSuccess(value) {
      alert(value || `done`);
      this.getDataFromApi();
    },
    applyFilters() {
      this.getDataFromApi();
    },
    reload() {
      this.filters = {};
      this.isFilter = false;
      this.getDataFromApi();
    },
    getDataFromApi() {
      //this.loading = true;
      this.loading = true;

      let { sortBy, sortDesc, page, itemsPerPage } = this.options;
      this.filters.user_id = this.$auth.user.id;
      let options = {
        params: {
          page: page,
          sortBy: sortBy ? sortBy[0] : "",
          sortDesc: sortDesc ? sortDesc[0] : "",
          itemsPerPage: itemsPerPage, //this.pagination.per_page,
          ...this.filters,
        },
      };

      this.$axios.get(this.endpoint, options).then(({ data }) => {
        this.data = data.data;
        //this.server_datatable_totalItems = data.total;

        this.totalRowsCount = data.total;

        this.loading = false;
      });
    },
  },
};
</script>
