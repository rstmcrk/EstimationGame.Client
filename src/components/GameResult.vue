
<template>
  <div
    class="col-md-8"
    style="font-family: Roboto, Helvetica, Arial, sans-serif !important"
  >
    <div class="row justify-content-center">
      <div id="estimateChart" style="width: 600px; height: 400px"></div>
    </div>
    <br />
    <br />
    <br />
    <button
      class="btn btn-lg"
      style="background-color: rgb(44, 124, 182); color: white"
      @click="resetGame"
      v-if="user.moderator"
    >
      Start New Estimation Round
    </button>
  </div>
</template>

<script>
import { VueEcharts } from "vue3-echarts";
import { option } from "../assets/VueEchartsData";
import { mapGetters } from "vuex";
import { isConnected } from "../plugins/signalr";
import * as echarts from "echarts";

export default {
  components: { VueEcharts },
  data() {
    return {
      pieChartOption: { ...option },
      showChart: false,
    };
  },
  computed: {
    ...mapGetters({
      group: "getGroup",
      user: "getUser",
    }),
    isConnected() {
      return isConnected.value;
    },
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      var chartDom = document.getElementById("estimateChart");
      var myChart = echarts.init(chartDom);

      if (
        Array.isArray(this.group.optionValues) &&
        this.group.optionValues.length > 0
      ) {
        const formattedData = this.group.optionValues.map((item) => {
          return {
            value: item.value,
            name: item.name,
          };
        });

        console.log('result', formattedData);

        this.pieChartOption.series[0].data = formattedData;

        myChart.setOption(this.pieChartOption);
        this.showChart = true;
      }
    },
    resetGame() {
      if (isConnected) {
        this.$signalr.invoke("ResetGame", this.$route.params.id);
      }

      this.$emit('disable-estimate-btn');
    },
  },
};
</script>
