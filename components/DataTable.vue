<template>
    <v-data-table dense :headers="headers" :items="data" :loading="loading" :options.sync="options" :footer-props="{
        itemsPerPageOptions: [15, 30, 50],
    }" :server-items-length="totalRowsCount">

        <template v-slot:item.options="{ item }">
            <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn dark-2 icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list width="120" dense>
                    <v-list-item v-if="editComponent">
                        <v-list-item-title style="cursor: pointer">
                            <component :is="editComponent" @success="handleSuccess" :item="item"></component>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title style="cursor: pointer">
                            <Delete @success="handleSuccess" :id="item.id" :endpoint="endpoint" />
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>

    </v-data-table>
</template>

<script>
export default {
    props: {
        filters: {
            type: Object,
            default: () => {
                return {}
            }
        },

        endpoint: {
            type: String,
            default: ''
        },
        editComponent: {
            type: String,
            default: '',
        },
        headers: {
            type: Array,
            default: () => {
                return []
            }
        }
    },

    data: () => ({
        loading: false,
        data: [],
        totalRowsCount: 0,
        options: {},
        payload: {}
    }),

    async created() {
        this.payload = this.filters;
        this.loading = false;
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
        reload() {
            this.payload = {};
            this.getDataFromApi();
        },
        handleSuccess(value) {
            alert(value || `done`);
            this.payload = {};
            this.getDataFromApi();
        },
        getDataFromApi() {
            //this.loading = true;
            this.loading = true;

            let { sortBy, sortDesc, page, itemsPerPage } = this.options;
            this.payload.user_id = this.$auth.user.id;
            let options = {
                params: {
                    page: page,
                    sortBy: sortBy ? sortBy[0] : "",
                    sortDesc: sortDesc ? sortDesc[0] : "",
                    itemsPerPage: itemsPerPage, //this.pagination.per_page,
                    ...this.payload,
                },
            };

            this.$axios.get(this.endpoint, options).then(({ data }) => {
                this.data = data.data;
                this.totalRowsCount = data.total;
                this.loading = false;
            })
                .catch(e => console.log(e));
        },
    },
};
</script>