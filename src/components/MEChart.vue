<template>
  <v-card height="300"> 
      <v-chart auto-resize :options="polar"/>
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
import 'echarts/lib/component/tooltip'

export default {
  components: {
    "v-chart": ECharts
  },
  data(){
    return {
       polar : {
          
          tooltip : {
              trigger: 'click',
              formatter: "Test saja"
          },
          toolbox: {
              show : true,
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {
                      show: true,
                      type: ['pie', 'funnel']
                  },
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          calculable : true,
          series : [             
              {
                  name:'Statistik',
                  type:'pie',
                  radius : [30, 110],
                  center : ['50%', '50%'],
                  roseType : 'area',
                  data:[
                      {value:10, name:'Propinsi A'},
                      {value:5,  name:'Propinsi B'},
                      {value:15, name:'Propinsi C'},
                      {value:25, name:'Propinsi D'},
                      {value:20, name:'Propinsi E'},
                      {value:35, name:'Propinsi F'},
                      {value:30, name:'Propinsi G'},
                      {value:40, name:'Propinsi H'}
                  ]
              }
          ]
        }
    }
  }
};
</script>