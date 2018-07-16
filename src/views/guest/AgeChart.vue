<template>
  <div>
    <vue-highcharts :options="options" ref="ageCharts"></vue-highcharts>
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
      ageData:{
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
                text: '年龄段占比'
            },
            credits: {
                text: '',
            },
            colors:[
                '#66E2B0',
                '#FFC200',
                '#57B4F7',
                '#F86B59',
                '#5FD9F0'
            ],
            series: []
          }
        }
    },
    watch: {
      ageData: function() {
         this.getData(this.$props.ageData);
      }
    },
    methods: {
      getData(value){
        let ageCharts = this.$refs.ageCharts;
        ageCharts.delegateMethod('showLoading', 'Loading...');
        ageCharts.removeSeries();
        setTimeout(() => {
              ageCharts.addSeries({data: value});
              ageCharts.hideLoading();
          }, 100)
      },
      
    }
}
</script>