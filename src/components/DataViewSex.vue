<template>
	<div class="ageWrap">
		<vue-highcharts :highcharts="Highcharts" :options="options" ref="sexCharts"></vue-highcharts>
	</div>
</template>

<script>
	import statisticsApi from '@/api/statistics';
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';	
	import VueHighcharts from 'vue2-highcharts';
	HighchartsNoData(Highcharts);
	
	var t;
	export default {
		name: 'data-view-sex',
		components: {
			VueHighcharts,
		},
		props:{
			sexData:{
				type:Array
			},
			timeing: {
				type: Boolean
			}
		},
		data() {
			return {
				Highcharts: Highcharts,
				options: {
					chart: {
						type: 'pie',
						width:350,
						height: 165,
						backgroundColor: 'rgba(0,0,0,0)',
						spacing : [20,0,20,0]
					},
					title: {
						text:'',
						floating: true,
					},
					credits: {
						text: '',
					},
					loading:{
						style:{
							 "color":'#95C7FF',
							 "backgroundColor": "rgba(255,255,255,0.1)",
						}
					},
					noData:{
						style:{'color':'#457adb'}
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.y}</b><br/>占比:{point.percentage:.2f}%'
					},
					colors:[
					   'rgba(149,199,255,0.8)',
					   'rgba(255,196,0,0.8)',
					   
					],
					plotOptions: {
						 pie: {
						 	innerSize:"60%",
                            borderColor:null,
                            dataLabels:{
                               enabled: true,
                           	   color:"#95C7FF",
                           	   format: '<b>{point.name}</b> {point.percentage:.2f} %',	
                           	   distance:12 
                           }
                        },
                        
					},
					series: [],
				}
			}
		},
		watch:{
			timeing:function(){
				//监听更新chart,
				setTimeout(()=>{
				 this.refreshData(this.$props.sexData);
				},0)
			}
			
		},
		created() {
			Highcharts.setOptions({
				lang: {
					thousandsSep: ',',
					noData: '暂无数据'
				}
			});
		},
		mounted(){
			this.getChart(this.$props.sexData);
		},
		methods: {			
			getChart(val) {
				let sexCharts = this.$refs.sexCharts;
				sexCharts.delegateMethod('showLoading', 'Loading...');
				sexCharts.removeSeries();
				setTimeout(() => {
					sexCharts.hideLoading();
					sexCharts.addSeries({
						name: "人数",
						data: val
					})
				},0)
			},
			
			//刷新图表数据
			refreshData(val){
			   this.$refs.sexCharts.getChart().series[0].setData(val);
			},		
		}
	}
</script>

<style lang="scss" scoped>

</style>