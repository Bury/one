<template>
	<div class="wrap">
		<h4 class="statistics-title">客流趋势</h4>
		<div class="chart-radio-wrap">
			<span :class="radios == 'areaspline' ? 'lc-active' : ''"  @click="cutChart('areaspline')">折线图</span>
			<span :class="radios == 'column' ? 'lc-active' : ''" @click="cutChart('column')">柱状图</span>
		</div>
		<vue-highcharts :highcharts="Highcharts" :options="options" ref="lineCharts"></vue-highcharts>
	</div>
</template>

<script>
	import statisticsApi from '@/api/statistics';
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';	
	import VueHighcharts from 'vue2-highcharts';
	HighchartsNoData(Highcharts);
	export default {
		name: 'data-view-line',
		props:{
			chartData:{
				type:Object
			},
			lineFlag: {
				type: Boolean
			}
		},
		components: {
			VueHighcharts,
		},
		data() {
			return {
				Highcharts: Highcharts,
				radios: 'areaspline',
				options: {
					chart: {
						type: 'areaspline',
						width:550,
						height: 280,
						backgroundColor: 'rgba(0,0,0,0)',
					},
					title: {
						text: '',
						style: {
							'color': '#ffffff',
							'fongSize': '13px'
						}
					},
					noData:{
						style:{'color':'#457adb'}
					},
					legend: {
						enabled: false
					},
					loading:{
						style:{
							 "color":'#95C7FF',
							 "backgroundColor": "rgba(255,255,255,0.1)",
						}
					},
					credits: {
						text: '',
					},
					colors: [
						'#FFC400'
					],
					plotOptions: {
						series: {
							fillColor: 'rgba(149,199,255,0.2)',
						}
					},
					yAxis: {
						title: {
							text: null
						},
						allowDecimals: false,
						tickAmount: 6,
						gridLineColor: '#567398',
						labels: {
							style: {
								color: "#95C7FF",
								fontSize: '13px'
							}
						}
					},
					xAxis: {
						tickColor: '#567398',
						lineColor: '#567398',
						labels: {
							style: {
								color: "#95C7FF",
							}
						}
					},
					series: [],
				}
			}
		},
		watch:{
			lineFlag:function(){
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
		},
		mounted(){
			this.getChart([]);
			this.refreshChart();
		},
		methods: {
			cutChart(val){
				this.$data.radios = val;
                this.$refs.lineCharts.getChart().series[0].update({
                      type: val
                });
			},
			getChart(val) {
				let lineCharts = this.$refs.lineCharts;
				lineCharts.delegateMethod('showLoading', 'Loading...');
				lineCharts.removeSeries();
				setTimeout(() => {					
					lineCharts.getChart().xAxis[0].setCategories(val.time);
					lineCharts.hideLoading();
					lineCharts.addSeries({
						name:'客流',
						data:val
					});					
				},0)
			},
			
			//初始化请求
//			getCustomer() {
//				statisticsApi.getCustomerSum(this.$props.chartData).then((res) => {	
//					console.log(res)
//					if(res.data.errno === 0) {
//						if(res.data.data !== null) {
//							let arr = {
//								name: "客流",
//								data: res.data.data.sum,
//								time: res.data.data.time
//							};
//						    this.getChart(arr);
//						} else {
// 						    this.getChart([])
//						}
//					}
//				})
//			},
			
			//定时刷新的请求
			refreshChart() {
				let lineCharts = this.$refs.lineCharts;
				statisticsApi.getCustomerSum(this.$props.chartData).then((res) => {	
					if(res.data.errno === 0) {
						if(res.data.data !== null) {							
						    lineCharts.getChart().xAxis[0].setCategories(res.data.data.time);
				            lineCharts.getChart().series[0].setData(res.data.data.sum);
						} else {
   						    
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		.statistics-title {
			text-align: center;
			margin: 0;
			height: 45px;
			font-size: 16px;
			padding-top: 18px;
		}
		.chart-radio-wrap {
			text-align: right;
			height: 35px;
			span{
				display: inline-block;
				cursor: default;
				margin-right: 10px;
			}
			.lc-active{
				color: #95C7FF;
			}
		}
	}
</style>