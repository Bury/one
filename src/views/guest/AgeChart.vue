<template>
	<div>
		<vue-highcharts :highcharts="Highcharts" :options="options" ref="ageCharts"></vue-highcharts>
	</div>
</template>

<script>
	import statisticsApi from '@/api/statistics'
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';
	import VueHighcharts from 'vue2-highcharts'
	HighchartsNoData(Highcharts)

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
				Highcharts:Highcharts,
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
						}else{
							this.getData([])
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