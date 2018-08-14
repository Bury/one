<template>
  <div>
    <vue-highcharts :options="options" ref="sexCharts"></vue-highcharts>
  </div>
</template>
 
<script>
	import statisticsApi from '@/api/statistics'
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';
	import VueHighcharts from 'vue2-highcharts'
	HighchartsNoData(Highcharts)
export default{
    name:'vip-chart',
    components: {
        VueHighcharts
    },
    props:{
    	sumOrDiff:{
				type:String
			},
      sexData:{
        type:Object,
      },
      changeFlag: {
				type: Boolean,
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
      changeFlag: function() {
         this.getFeature(this.$props.sexData);
      }
    },
    created: function() {
			this.getFeature(this.$props.sexData);
			Highcharts.setOptions({
				lang: {
					thousandsSep: ',',
					noData: '暂无数据'
				}
			});
		},
    methods: {
    	getFeature(val) {
				let list = {
					feature: 'gender',
					begin_time: val.begin_time,
					end_time: val.end_time,
					store_id: val.store_id,
					merchant_organize_id: val.merchant_organize_id
				}
				statisticsApi.getFeaturePie(list).then((res) => {
					if(res.data.errno === 0) {
						let thisData = res.data.data;
						if(thisData != null && thisData != '') {
							let sexData = [];
							for(var i = 0; i < thisData.gender.length; i++) {
								sexData.push({
									name: thisData.gender[i],
									y: thisData.sum[i]
								})
							}
							this.getData(sexData)
						}
					}else {
							this.$message(res.data.msg)
					}
				});

			},
      getData(value){
        let sexCharts = this.$refs.sexCharts;
        sexCharts.delegateMethod('showLoading', 'Loading...');
        sexCharts.removeSeries();
        setTimeout(() => {
        	    sexCharts.hideLoading();
              sexCharts.addSeries({
              	name:"人数",
              	data: value
              });
              
          }, 0)
      },
      
    }
}
</script>