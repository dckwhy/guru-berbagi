<template>
  <v-card height="300"> 
        <v-chart 
          :options="bar"
          ref="bar"
          auto-resize
        />
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
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
        bar : {
            legend: {},
                tooltip: {},
                dataset: {
                    // Provide data.
                    source: [
                        ['Statistik', '2015', '2016', '2017'],
                        ['Propinsi A', ...this.randomize()],
                        ['Propinsi B', ...this.randomize()],
                        ['Propinsi C', ...this.randomize()],
                        ['Propinsi D', ...this.randomize()]
                    ]
                },
                // Declare X axis, which is a category axis, mapping
                // to the first column by default.
                xAxis: { type: 'category' },
                // Declare Y axis, which is a value axis.
                yAxis: {},
                // Declare several series, each of them mapped to a
                // column of the dataset by default.
                series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
        }            
    }
  },
  methods: {
    randomize() {
      return [0, 0, 0].map(() => {
        return Math.round(300 + Math.random() * 700) / 10;
      });
    }
  }
};
</script>