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
import "echarts/lib/chart/line";
// import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
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
    opSeries: {
      default: () => [
        {
          name: "Aksi A",
          type: "line",
          data: [15, 10, 17, 12, 2, 14, 25]
        },
        {
          name: "Aksi B",
          type: "line",
          data: [0, 2, 5, 0, 0, 10, 0]
        },
        {
          name: "Aksi C",
          type: "line",
          data: [0, 3, 5, 12, 2, 8, 3]
        },
        {
          name: "Aksi D",
          type: "line",
          data: [0, 0, 1, 2, 0, 5, 3]
        },
        {
          name: "Aksi E",
          type: "line",
          data: [5, 6, 7, 2, 14, 4, 5]
        }
      ]
    },
    opX: {
      default: () => [
        "01/01/2019",
        "02/01/2019",
        "03/01/2019",
        "03/01/2019",
        "04/01/2019",
        "05/01/2019",
        "06/01/2019"
      ]
    }
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
          trigger: "axis",
          textStyle: {
            fontSize: 12,
            fontFamily: "Roboto"
            // color: this.$vuetify.theme.primary,
          }
        },
        legend: {
          // data: ["Roda 2", "Roda 4", "Total"],
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
          type: "category",
          boundaryGap: false,
          data: this.opX
        },
        yAxis: {
          type: "value"
        },
        series: this.opSeries
      };
    }
  },

  methods: {}
};
</script>