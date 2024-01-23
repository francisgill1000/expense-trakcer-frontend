<!-- DatePicker.vue -->

<template>
  <div class="mt-6 mx-2">
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
        ></v-text-field>
      </template>

      <v-date-picker color="white" no-title v-model="date" @input="handleEvent"></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: ["label", "paramKey"],

  data() {
    return {
      menu: false,
      date: null,
    };
  },
  methods: {
    handleEvent() {
      this.menu = false;
      this.$emit("date", { [this.paramKey]: this.date });
    },
  },
};
</script>
