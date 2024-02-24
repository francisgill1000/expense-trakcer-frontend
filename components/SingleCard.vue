<template>
  <v-toolbar
    class="primary mb-1"
    dark
    dense
    flat
  >
  <b>{{ label }}</b>
  <v-spacer></v-spacer>
  <b>{{ value }}</b>
    <!-- style="background: linear-gradient(to right, #002846, #1cb5e0)" -->
  </v-toolbar>
</template>

<script>
export default {
  props: ["label", "value"],
};
</script>
