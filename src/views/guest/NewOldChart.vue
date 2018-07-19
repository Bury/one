<template>
  <div>
    <vue-highcharts :options="options" ref="newOldCharts"></vue-highcharts>
  </div>
</template>
 
<script>
import VueHighcharts from 'vue2-highcharts'
export default{
    name:'new-old-chart',
    components: {
        VueHighcharts
    },
    props:{
      newOldData:{
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
                text: '新客熟客占比'
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
      newOldData: function() {
         this.getData(this.$props.newOldData);
      }
    },
    methods: {
      getData(value){
        let newOldCharts = this.$refs.newOldCharts;
        newOldCharts.delegateMethod('showLoading', 'Loading...');
        newOldCharts.removeSeries();
        setTimeout(() => {
              newOldCharts.addSeries({data: value});
              newOldCharts.hideLoading();
          }, 100)
      },
      
    }
}
</script>