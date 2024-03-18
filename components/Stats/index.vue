<template>
  <div>
    <v-row v-for="(card, index) in cards" :key="index">
      <!-- <v-col cols="12">
        <b> {{ card.title }}</b>
      </v-col> -->
      <v-col v-for="(row, index) in card.data" :key="index" cols="12" xs="12" sm="12" md="4">
        <SingleCard :label="row.label" :value="row.value" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["endpoint"],
  data() {
    return {
      cards: [],
    };
  },
  async created() {
    // Assuming you fetch JSON data from an API or a local file
    await this.fetchCardData();
  },
  methods: {
    getCurrencyType(data) {
      return data.toLocaleString("en-US", {
        style: "currency",
        currency: "AED",
      });
    },
    async fetchCardData() {
      await this.$axios.get(this.endpoint, {
        params: {
          user_id: this.$auth.user.id,
        }
      }).then(({ data }) => {
        this.cards = data;
      });
    },
  },
};
</script>
