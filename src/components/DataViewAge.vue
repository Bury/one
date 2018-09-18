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
			ageData: {
				type: Array
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
						spacing: [2, 0, 2, 0]
					},
					title: {
						text: '',
						floating: true,
					},
					credits: {
						text: '',
					},
					noData:{
						style:{'color':'#457adb'}
					},
					loading:{
						style:{
							 "color":'#95C7FF',
							 "backgroundColor": "rgba(255,255,255,0.1)",
						}
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.y}</b><br/>占比:{point.percentage:.2f}%'
					},
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom',
						itemStyle: {
							'color': '#95C7FF'
						},
						itemHoverStyle: {
							'color': '#FFC400'
						},
						itemDistance:1,
						margin:0,
						symbolHeight: 12,
						symbolWidth: 12,
						symbolRadius: 6,
						labelFormatter: function () {
				              return this.name + ' ' + this.percentage.toFixed(2) + '%' ;
			            }
					},
					colors: [
						'rgba(149,199,255,0.8)',
						'rgba(255,196,0,0.8)',
						'rgba(101,266,175,0.8)',
						'rgba(202,129,222,0.8)',
						'rgba(255,105,83,0.8)',
						'rgba(255,255,255,0.8)',
					],
					plotOptions: {
						pie: {
							innerSize: 46,
							borderColor: null,
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
			timeing:function(){
				//监听更新chart
				this.refreshData(this.$props.ageData);
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
			this.getChart(this.$props.ageData);
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
			
			//刷新图表数据
			refreshData(val){
			   this.$refs.sexCharts.getChart().series[0].setData(val);
			},	
		}
	}
</script>

<style lang="scss" scoped>
</style>