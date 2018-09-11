<template>
	<div class="ageWrap">
		<vue-highcharts :highcharts="Highcharts" :options="options" ref="sexCharts"></vue-highcharts>
	</div>
</template>

<script>
	import Highcharts from 'highcharts';
	import VariablePie from 'highcharts/modules/variable-pie.js';
	import HighchartsNoData from 'highcharts-no-data-to-display';
	import VueHighcharts from 'vue2-highcharts';
	HighchartsNoData(Highcharts);
	VariablePie(Highcharts);
	export default {
		name: 'data-view-sex',
		components: {
			VueHighcharts,
		},
		data() {
			return {
				Highcharts: Highcharts,
				radios: 'line',
				options: {
					chart: {
						type: 'pie',
						width: 350,
						height: 165,
						backgroundColor: 'rgba(0,0,0,0)',
						spacing: [20, 0, 20, 0]
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
						}
					},
					colors: [
						'rgba(149,199,255,0.5)',
						'rgba(255,196,0,0.5)',
						'rgba(101,226,175,0.5)',
						'rgba(89,210,252,0.5)',
						'rgba(255,105,83,0.5)',
						'rgba(79,233,213,0.5)',
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
					series: [{
						name:'人数',
						data: [{
								name: '小于20岁',
								y: 200
							},
							{
								name: '20~29岁',
								y: 400
							},
							{
								name: '30~39岁',
								y: 850
							},
							{
								name: '40~49岁',
								y: 100
							}, {
								name: '50~59岁',
								y: 600
							},
							{
								name: '大于60岁',
								y: 400
							}

						]

					}],
				}
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
		mounted() {
			this.getChart();
		},
		methods: {
			cutChart(val) {
				this.$data.radios = val;
			},
			getChart(val) {
				let sexCharts = this.$refs.sexCharts;
				sexCharts.delegateMethod('showLoading', 'Loading...');
				//sexCharts.removeSeries();
				setTimeout(() => {
					sexCharts.hideLoading();
					//sexCharts.addSeries(val);
				}, 100)
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>