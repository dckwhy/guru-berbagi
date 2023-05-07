<template>
  <m-card v-bind="$attrs" v-on="$listeners" :loading="loading" refresh @refresh="load">
    <v-card height="250" text class="py-0">
      <v-chart auto-resize :options="options"/>
    </v-card>
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
// import "echarts/lib/chart/pie";
// import "echarts/lib/chart/pictorialBar";
import "echarts/lib/chart/map";
import "echarts/lib/component/geo";
// import "echarts/lib/chart/line";
// import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/legend";
// import "echarts/theme/dark"; // dark, infographic, macarons, roma, shine, vintage

import bali from "@/maps/kabkota_bali.json";
ECharts.registerMap("bali", bali);

export default {
  inheritAttrs: false,  
  components: {
    "v-chart": ECharts
  },
  data: () => ({
    loading: false,
    options: {
      title: {
        text: "Usaha Wisata",
        subtext: "2019",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        textStyle: {
          fontSize: 12,
          fontFamily: "Roboto"
          // color: this.$vuetify.theme.primary,
        }
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["2019"]
      },
      visualMap: {
        min: 0,
        max: 0,
        left: "left",
        top: "bottom",
        text: ["Maks", "Min"],
        calculable: true,
        inRange: {
          color: ["#e0ffff", "#006edd"]
        },
        textStyle: {
          fontSize: 12,
          fontFamily: "Roboto"
          // color: this.$vuetify.theme.primary,
        }
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: {
        name: "Bali",
        type: "map",
        mapType: "bali",
        roam: false,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          },
          textStyle: {
            fontSize: 12,
            fontFamily: "Roboto"
            // color: this.$vuetify.theme.primary,
          }
        },
        data: []
      }
    }
  }),
  mounted() {
    this.load();
  },
  activated() {    
  },
  methods: {
    load() {
      this.loading = true;
      this.$store
        .dispatch("wisata/jumlahUsahaWisata")
        .then(res => {
          this.options.visualMap.max = 0;
          res.forEach(m => {
            this.options.visualMap.max += m.total;
          });
          this.options.series.data = res.map(m => ({
            name: m.nama.toUpperCase(),
            value: m.total
          }));
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    }
  }
};
</script>