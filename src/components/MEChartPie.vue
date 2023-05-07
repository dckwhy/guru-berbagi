<template>
  <v-card height="300">
    <v-chart auto-resize :options="options" />
  </v-card>
</template>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      options: {
        legend: {
          orient: "vertical",
          x: "right"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        series: [
          {
            name: "Statistik",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            data: [
              { value: 335, name: "Jatim" },
              { value: 310, name: "Jateng" },
              { value: 234, name: "Jabar" },
              { value: 135, name: "DKI" },
              { value: 1548, name: "DIY" }
            ]
          }
        ]
      }
    };
  }
};
</script>