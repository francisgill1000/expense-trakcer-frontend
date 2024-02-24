<!-- DatePicker.vue -->

<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        dense
        outlined
        v-model="date"
        :label="label"
        readonly
        v-bind="attrs"
        v-on="on"
        hide-details
      ></v-text-field>
    </template>

    <v-date-picker
      color="primary"
      no-title
      v-model="date"
      @input="handleEvent"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Date", // Default label value
    },
    paramKey: {
      type: String,
      default: "date", // Default paramKey value
    },
  },

  data() {
    return {
      menu: false,
      date: new Date().toISOString().substr(0, 10),
    };
  },
  created() {
    this.handleEvent();
  },
  methods: {
    handleEvent() {
      this.menu = false;
      this.$emit("date", { [this.paramKey]: this.date });
    },
  },
};
</script>
