<template>
  <m-card v-bind="$attrs" v-on="$listeners">
    <v-card height="300" text class="py-2">
      <v-chart auto-resize :options="options"/>
    </v-card>
    <template v-slot:footer v-slot="loading">
      <m-elapsed :loading="loading"></m-elapsed>
    </template>
  </m-card>
</template>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/bar";
// import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

export default {
  inheritAttrs: false,
  components: {
    "v-chart": ECharts
  },
  props: {
    opLegend: { default: () => ["Organisasai 1", "Organisasai 2", "Organisasai 3", "Organisasai 4", "Organisasai 5"] },
    opSeries: {
      default: () => [
        {
          name: "Organisasai 1",
          data: [150]
        },
        {
          name: "Organisasai 2",
          data: [80]
        },
        {
          name: "Organisasai 3",
          data: [100]
        },
        {
          name: "Organisasai 4",
          data: [210]
        },
        {
          name: "Organisasai 5",
          data: [60]
        }
      ]
    },
    opLabel: { default: "Data" }
  },
  data() {
    return {};
  },
  computed: {
    options() {
      return {
        // title: {
        //   text: "Pendapatan Harian",
        //   textStyle: {
        //     fontSize: 16,
        //     fontFamily: "Roboto"
        //     // color: this.$vuetify.theme.primary,
        //   }
        // },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 12,
            fontFamily: "Roboto"
            // color: this.$vuetify.theme.primary,
          },
          formatter: "{b} {a}<br>{c}"
        },
        legend: {
          data: this.opLegend,
          // orient: "vertical",
          right: 10
          // top: 20,
          // bottom: 20
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          axisLabel: {
            show: false
          },
          // type: "category",
          // // boundaryGap: false,
          data: [this.opLabel]
        },
        yAxis: {
          type: "value"
        },
        series: this.opSeries
          ? this.opSeries.map(s => ({ ...s, type: "bar" }))
          : []
      };
    }
  },
  mounted() {},
  methods: {}
};
</script>