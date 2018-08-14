<template>
	<div>
		<vue-highcharts :options="options" ref="ageCharts"></vue-highcharts>
	</div>
</template>

<script>
	import statisticsApi from '@/api/statistics'
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';
	import VueHighcharts from 'vue2-highcharts'
	HighchartsNoData(Highcharts)

	let testData = [{
		name: '东京',
		data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
	}, {
		name: '纽约',
		data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
	}, {
		name: '伦敦',
		data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
	}, {
		name: '柏林',
		data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
	}];
	let xData = ['20岁以下','20-29岁','30-39岁','40-49岁','50-59岁','60岁以上']
	export default {
		name: 'vip-chart',
		components: {
			VueHighcharts
		},
		props: {
			sumOrDiff:{
				type:String
			},
			ageData: {
				type: Object,
			},
			changeFlag: {
				type: Boolean,
			}
		},
		data() {
			return {
				options: {
					chart: {
						type: 'pie'
					},
					title: {
						text: '年龄段占比'
					},
					credits: {
						text: '',
					},
					colors: [
						'#66E2B0',
						'#FFC200',
						'#57B4F7',
						'#F86B59',
						'#5FD9F0'
					],
					series: []
				}
			}
		},
		watch: {
			changeFlag: function() {
				this.getFeature(this.$props.ageData);
			}
		},
		created: function() {
			this.getFeature(this.$props.ageData);
			Highcharts.setOptions({
				lang: {
					thousandsSep: ',',
					noData: '暂无数据'
				}
			});
		},
		methods: {
			getFeature(val) {
				let list = {
					feature: 'age',
					begin_time: val.begin_time,
					end_time: val.end_time,
					store_id: val.store_id,
					merchant_organize_id: val.merchant_organize_id
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
							this.getData(ageData)
						} 
					}else {
							this.$message(res.data.msg)
					}
					
				});

			},
			getData(value) {
				let ageCharts = this.$refs.ageCharts;
				ageCharts.delegateMethod('showLoading', 'Loading...');
				ageCharts.removeSeries();
				setTimeout(() => {
					ageCharts.hideLoading();
					ageCharts.addSeries({
						name: "人数",
						data: value
					});

				}, 100)
			},

		}
	}
</script>