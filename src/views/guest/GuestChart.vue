<template>
  <div>
    <vue-highcharts :options="options" ref="guestCharts"></vue-highcharts>
  </div>
</template>
 
<script>
import VueHighcharts from 'vue2-highcharts'
export default{
    name:'line-chart',
    components: {
        VueHighcharts
    },
    props:{
      type:String,
      guestData:{
        type:Object,
      }
    },
    data(){
      return{
        options: {
            chart: {
                type: ''//line/column
            },
            title: {
                text: '客流量占比'
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            credits: {
                text: '',
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        // 开启数据标签
                        enabled: true          
                    },
                    // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                    enableMouseTracking: true
                }
            },
            series: []
          }
        }
    },
    watch: {
      guestData: function() {
         this.getData(this.$props.guestData);
      }
    },
    methods: {
      getData(value){
        let guestCharts = this.$refs.guestCharts;
        guestCharts.delegateMethod('showLoading', 'Loading...');


        let chart_class=this.$data.options.chart.type

        this.$data.options.chart.type = this.$props.type;
        this.$data.options.xAxis.categories = value.time;
        console.log(value.time)
        guestCharts.removeSeries();
        setTimeout(() => {
              guestCharts.addSeries({name:' 客流量统计',data: value.sum});
              guestCharts.hideLoading();

              //alert(chart_class)
              //alert(this.$data.options.chart.type)
              if((chart_class!='') && (chart_class!=this.$data.options.chart.type)){
                  guestCharts.getChart().series[0].update({
                      type: this.$data.options.chart.type
                  })
              }
              
          }, 100)
        
      },
    }
}
</script>