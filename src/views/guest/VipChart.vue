<template>
  <div>
    <vue-highcharts :options="options" ref="vipCharts"></vue-highcharts>
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
      vipData:{
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
                text: 'VIP匿名客户占比'
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
    created:function(){

    },
    watch: {
      vipData: function() {
         this.getData(this.$props.vipData);
      }
    },
    methods: {
      getData(value){
        let vipCharts = this.$refs.vipCharts;
        vipCharts.delegateMethod('showLoading', 'Loading...');
        vipCharts.removeSeries();
        setTimeout(() => {
              vipCharts.addSeries({data: value});
              vipCharts.hideLoading();
          }, 100)
      },
      
    }
}
</script>