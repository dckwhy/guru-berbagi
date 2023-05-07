<template>
  <v-card elevation="0">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="title mb-1">{{title}}</v-list-item-title>
        <v-list-item-subtitle>{{description}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card height="400" text elevation="0">
      <v-chart auto-resize :options="options" theme="light" />
    </v-card>
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
// import "echarts/lib/component/title";
// import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
// import echartsTheme from 'ant-design-vue-echart-theme'

// ECharts.registerTheme('light', echartsTheme)

export default {
  inheritAttrs: false,
  components: {
    "v-chart": ECharts
  },
  props: {
    title: {
      type: String,
      default: "Judul"
    },
    description: {
      type: String,
      default: "Deskripsi"
    },
    opLegend: {
      default: () => ["Aksi A", "Aksi B", "Aksi C", "Aksi D", "Aksi E"]
    },
    opData: {
      default: () => [
        { value: 135, name: "Aksi A" },
        { value: 20, name: "Aksi B" },
        { value: 10, name: "Aksi C" },
        { value: 15, name: "Aksi D" }
      ]
    }
  },
  data() {
    return {};
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b} : {c} ({d}%)",
          // formatter: "{b} : {c} ",
          formatter: "{b} ",
          textStyle: {
            fontSize: 12,
            fontFamily: "Roboto"
            // color: this.$vuetify.theme.primary,
          }
        },
        legend: {
          data: this.opLegend,
          // orient: "vertical",
          // right: 10
          left: 10,
          // top: 20,
          bottom: 20
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        series: {
          type: "pie",
          radius: ["20%", "70%"],
          selectedMode: "single",
          label: {
            normal: {
              show: true,
              position: "inner",
              // formatter: "{b} : {c} ({d}%)"
              formatter: "{d}%"
            },
            emphasis: {
              show: true
            }
          },
          data: this.opData
        }
      };
    }
  },
  mounted() {},
  methods: {}
};
</script>