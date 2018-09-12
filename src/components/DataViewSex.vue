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
			chartData:{
				type:Object
			},
			timeFlag:{
				type:Boolean
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
					tooltip: {
						pointFormat: '{series.name}: <b>{point.y}</b><br/>占比:{point.percentage:.1f}%'
					},
					colors:[
					   'rgba(149,199,255,0.3)',
					   'rgba(255,196,0,0.3)'
					   
					],
					plotOptions: {
						 pie: {
                            innerSize: '60%',
                            borderColor:'rgba(255,255,255,1)',
                            dataLabels:{
                           	color:"#95C7FF",
                           	formatter:function(){                           		
                           		return  this.point.name + ' ' + Math.round(this.percentage) + '%'
                           	}					
                           }
                        },
                        
					},
					series: [],
				}
			}
		},
		watch:{
			timeFlag:function(){
				this.getFeature(this.$props.chartData);
			},
			timeing:function(){
				//监听刷新chart
				this.refreshChart();
			}
			
		},
		created() {
			Highcharts.setOptions({
				lang: {
					thousandsSep: ',',
					noData: '暂无数据'
				}
			});
			
			this.getFeature(this.$props.chartData);

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
			
			//初始化请求
			getFeature(val) {
				let list = {
					feature: 'gender',
					begin_time: val.begin_time,
					end_time: val.end_time,
				};
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
							this.getChart(sexData);
						} else {
							this.getChart([])
						}
					} else {
						this.$message(res.data.msg)
					}
				});

			},
			
			//定时刷新的请求
			refreshChart() {
				let sexCharts = this.$refs.sexCharts;
				let list = {
					feature: 'gender',
					begin_time: this.$props.chartData.begin_time,
					end_time: this.$props.chartData.end_time,
				};
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
							sexCharts.getChart().series[0].setData(sexData);
						}
					} else {
						this.$message(res.data.msg)
					}
				});

			},
		}
	}
</script>

<style lang="scss" scoped>

</style>