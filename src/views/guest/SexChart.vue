<template>
  <div>
    <vue-highcharts :options="options" ref="sexCharts"></vue-highcharts>
  </div>
</template>
 
<script>
import VueHighcharts from 'vue2-highcharts'
export default{
    name:'vip-chart',
    components: {
        VueHighcharts
    },
    props:{
      sexData:{
        type:Array,
      }
    },
    data(){
      return{
        options: {
            chart: {
                type: 'pie'
            },
            title: {
                text: '性别占比'
            },
            credits: {
                text: '',
            },
            colors:[
                '#FFC200',
                '#57B4F7', 
            ],
            series: []
          }
        }
    },
    watch: {
      sexData: function() {
         this.getData(this.$props.sexData);
      }
    },
    methods: {
      getData(value){
        let sexCharts = this.$refs.sexCharts;
        sexCharts.delegateMethod('showLoading', 'Loading...');
        sexCharts.removeSeries();
        setTimeout(() => {
              sexCharts.addSeries({data: value});
              sexCharts.hideLoading();
          }, 100)
      },
      
    }
}
</script>