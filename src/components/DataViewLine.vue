<template>
	<div class="wrap">
		<h4 class="statistics-title">客流趋势</h4>
		<div class="chart-radio-wrap">
			<span :class="radios == 'line' ? 'lc-active' : ''"  @click="cutChart('line')">折线图</span>
			<span :class="radios == 'column' ? 'lc-active' : ''" @click="cutChart('column')">柱状图</span>
		</div>
		<vue-highcharts :options="options" ref="ageCharts"></vue-highcharts>
	</div>
</template>

<script>
	import VueHighcharts from 'vue2-highcharts';
	export default {
		name: 'data-view-line',
		components: {
			VueHighcharts,
		},
		data() {
			return {
				radios: 'line',
				options: {
					chart: {
						type: 'areaspline',
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
					legend: {
						enabled: false
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
								color: "#95C7FF"
							}
						}
					},
					series: [],
				}
			}
		},
		created() {

		},
		mounted() {
			let datac = {
				name: '安装，实施人员',
				data: [200, 563, 98, 68, 77, 50, 500, 8]
			};
			this.getChart(datac);
			setInterval(() => {

			}, 1000)
		},
		methods: {
			cutChart(val){
				this.$data.radios = val;				
			},
			getChart(val) {
				let ageCharts = this.$refs.ageCharts;
				ageCharts.delegateMethod('showLoading', 'Loading...');
				//				ageCharts.removeSeries();
				setTimeout(() => {
					ageCharts.hideLoading();
					ageCharts.addSeries(val);
				}, 100)
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