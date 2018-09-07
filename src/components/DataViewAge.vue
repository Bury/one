<template>
	<div class="ageWrap">
		<vue-highcharts :options="options" ref="sexCharts"></vue-highcharts>
	</div>
</template>

<script>
	import VueHighcharts from 'vue2-highcharts';
	export default {
		name: 'data-view-sex',
		components: {
			VueHighcharts,
		},
		data() {
			return {
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
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'middle',
						itemStyle:{
							'color':'#95C7FF'
						},
						itemHoverStyle:{
							'color':'#FFC400'
						}
					},
					colors: [						
						'rgba(149,199,255,0.4)',
						'rgba(255,196,0,0.4)',
						'rgba(101,226,175,0.4)',
						'rgba(89,210,252,0.4)',
						'rgba(255,105,83,0.4)',
						'rgba(79,233,213,0.4)',
					],
					plotOptions: {
						pie: {
							innerSize: 40,
							borderColor: 'rgba(255,255,255,1)',
							dataLabels: {
								color: "#95C7FF",
								formatter: function() {

									return this.point.name + ' ' + Math.round(this.percentage) + '%'
								},
								enabled: false
							},
							showInLegend: true,
						},

					},
					series: [{
						data: [{
								name: '小于20岁',
								y: 88
							},
							{
								name: '20~29岁',
								y: 50
							},
							{
								name: '30~39岁',
								y: 65
							},
							{
								name: '40~49岁',
								y: 678
							},{
								name: '20~59岁',
								y: 66
							},
							{
								name: '大于60岁',
								y: 60
							}
							
						]

					}],
				}
			}
		},
		created() {

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
				//				sexCharts.removeSeries();
				setTimeout(() => {
					sexCharts.hideLoading();
					//					sexCharts.addSeries(val);
				}, 100)
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>