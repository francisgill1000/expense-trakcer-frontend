<template>
  <ApexChart v-if="loaded" type="bar" :options="chartOptions" :series="series" />
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          title: {
            text: '',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: (val) => val + 'AED',
          },
        },
      },
      series: [
        {
          name: 'Expense',
          data: [],
        },
      ],
    }
  },
  created() {
    this.fetchChartData();
  },
  methods: {
    async fetchChartData() {
      try {
        let user_id = this.$auth.user.id;
        const { labels, values } = await this.$axios.$get(`monthlyChartData?user_id=${user_id}`);
        this.chartOptions.xaxis.categories = labels;
        this.series[0].data = values;
        this.loaded = true;
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    }
  }
}
</script>
