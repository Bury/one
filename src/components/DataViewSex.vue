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
						width:350,
						height: 165,
						backgroundColor: 'rgba(0,0,0,0)',
						spacing : [20,0,20,0]
					},
					title: {
						text: '',
						floating: true,
					},
					credits: {
						text: '',
					},
					colors:[
					   'rgba(255,196,0,0.3)',
					   'rgba(149,199,255,0.3)'
					],
					plotOptions: {
						 pie: {
                           innerSize: 40,
                           borderColor:'rgba(255,255,255,1)',
                           dataLabels:{
                           	color:"#95C7FF",
                           	formatter:function(){
                           		
                           		return  this.point.name + ' ' + Math.round(this.percentage) + '%'
                           	}					
                           }
                        },
                        
					},
					series: [{
						data:[{
							name:'男',
							y:8000
						},
						{
							name:'女',
							y:6000
						}]
						
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