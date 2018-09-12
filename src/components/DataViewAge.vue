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
	export default {
		name: 'data-view-sex',
		components: {
			VueHighcharts,
		},
		props: {
			chartData: {
				type: Object
			},
			timeFlag: {
				type: Boolean
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
						width: 350,
						height: 165,
						backgroundColor: 'rgba(0,0,0,0)',
						spacing: [10, 0, 10, 0]
					},
					title: {
						text: '',
						floating: true,
					},
					credits: {
						text: '',
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.y}</b><br/>占比:{point.percentage:.2f}%'
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'middle',
						itemStyle: {
							'color': '#95C7FF'
						},
						itemHoverStyle: {
							'color': '#FFC400'
						},
						symbolHeight: 14,
						symbolWidth: 14,
						symbolRadius: 7
					},
					colors: [
						'rgba(149,199,255,0.4)',
						'rgba(255,255,128,0.4)',
						'rgba(255,50,50,0.4)',
						'rgba(0,255,128,0.4)',
						'rgba(255,255,255,0.4)',
						'rgba(0,0,20,0.4)',
					],
					plotOptions: {
						pie: {
							innerSize: 40,
							borderColor: 'rgba(255,255,255,1)',
							dataLabels: {
								color: "#95C7FF",
								enabled: false
							},
							showInLegend: true,
						},

					},
					series: [],
				}
			}
		},
		watch: {
			timeFlag: function() {
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
						name: '人数',
						data: val
					});
				}, 0)
			},
			//初始化请求
			getFeature(val) {
				let list = {
					feature: 'age',
					begin_time: val.begin_time,
					end_time: val.end_time
				}
				statisticsApi.getFeaturePie(list).then((res) => {
					if(res.data.errno === 0) {
						let thisData = res.data.data;
						if(thisData != null && thisData != '') {
							let ageData = [];
							for(var i = 0; i < thisData.age.length; i++) {
								ageData.push({
									name: thisData.age[i],
									y: thisData.sum[i]
								})
							}
							this.getChart(ageData)
						} else {
							this.getChart([])
						}
					} else {
						this.$message(res.data.msg)
					}

				});
			},
			
			//定时刷新的请求
			refreshChart(){
				let sexCharts = this.$refs.sexCharts;
				let list = {
					feature: 'age',
					begin_time: this.$props.chartData.begin_time,
					end_time: this.$props.chartData.end_time
				};
				statisticsApi.getFeaturePie(list).then((res) => {
					if(res.data.errno === 0) {
						let thisData = res.data.data;
						if(thisData != null && thisData != '') {
							let ageData = [];
							for(var i = 0; i < thisData.age.length; i++) {
								ageData.push({
									name: thisData.age[i],
									y: thisData.sum[i]
								})
							}
						sexCharts.getChart().series[0].setData(ageData);
						}
					} else {
						this.$message(res.data.msg)
					}

				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>