<template>
  <v-row no-gutters>
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
          <v-btn block outlined color="primary" small  @click="getDataFromApi">Submit</v-btn>
        </v-col>
      </v-row>
    </v-navigation-drawer>

    <v-col cols="12">
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
            <!-- <v-toolbar-title
              ><span>{{ Model }} </span></v-toolbar-title
            > -->
            <span>
              <v-icon class="ml-2" color="primary" @click="reload">mdi-reload</v-icon>
            </span>
            <span>
              <v-icon class="ml-2" @click="filterForm = true" color="primary"
                >mdi-filter-outline</v-icon
              >
            </span>
            <v-spacer></v-spacer>
            <ExpenseCreate @success="handleSuccess" />
          </v-toolbar>
        </template>
        <template v-slot:header="{ props: { headers } }">
          <tr v-if="isFilter">
            <td v-for="header in headers" :key="header.text">
              <v-container>
                <v-text-field
                  clearable
                  @click:clear="
                    filters[header.value] = '';
                    applyFilters();
                  "
                  :hide-details="true"
                  v-if="header.filterable && !header.filterSpecial"
                  v-model="filters[header.value]"
                  :id="header.value"
                  @input="applyFilters(header.key, $event)"
                  outlined
                  dense
                  autocomplete="off"
                ></v-text-field>
              </v-container>
            </td>
          </tr>
        </template>

        <!-- <template v-slot:item.email="{ item }">
                      {{ item?.employee?.user?.email }}
                    </template> -->

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
                  <v-icon color="secondary" small> mdi-eye </v-icon>
                  View
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="editItem(item)">
                <v-list-item-title style="cursor: pointer">
                  <v-icon color="secondary" small> mdi-pencil </v-icon>
                  Edit
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
    Model: "Expenses",
    endpoint: "expense",
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
        text: "Shop Name",
        align: "left",
        sortable: false,
        key: "shop_name",
        value: "shop_name",
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
    async getTotalExpense() {
      this.filterForm = false;
      let { data } = await this.$axios.get("customExpense", {
        params: {
          ...this.filters,
        },
      });
      this.totalExpense = data;
      this.$emit("some_value", data);
    },

    getDateEvent(e) {
      this.filters = {
        ...this.filters,
        ...e,
      };
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

      this.$axios.get(`expense`, options).then(({ data }) => {
        this.data = data.data;
        //this.server_datatable_totalItems = data.total;
        this.totalRowsCount = data.total;
        this.loading = false;
        this.getTotalExpense();
      });
    },
  },
};
</script>
