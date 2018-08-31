<template>
	<div>
		<vue-highcharts :options="options" ref="deviceCharts"></vue-highcharts>
	</div>
</template>

<script>
	import VueHighcharts from 'vue2-highcharts'
	export default {
		name: 'vip-chart',
		components: {
			VueHighcharts
		},
		props: {
			deviceData: {
				type: Array,
			}
		},
		data() {
			return {
				options: {
					chart: {
						type: 'pie'
					},
					title: {
						text: '客流量设备占比'
					},
					credits: {
						text: '',
					},
					colors: [
						'#7CB5EC',
						'#FFC200',
						'#F15780',
						'#8085E9',
						'#90ED7D',
						'#909399'
					],
					series: []
				}
			}
		},
		watch: {
			deviceData: function() {
				this.getData(this.$props.deviceData);
			}
		},
		methods: {
			getData(value) {
				let deviceCharts = this.$refs.deviceCharts;
				deviceCharts.delegateMethod('showLoading', 'Loading...');
				deviceCharts.removeSeries();
				setTimeout(() => {
					deviceCharts.addSeries({
						data: value
					});
					deviceCharts.hideLoading();
				}, 100)
			},

		}
	}
</script>