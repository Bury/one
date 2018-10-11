<template>
	<div>
		<vue-highcharts :highcharts="Highcharts" :options="options" ref="sexCharts"></vue-highcharts>
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
			sumOrDiff: {
				type: String
			},
			sexData: {
				type: Object,
			},
			changeFlag: {
				type: Boolean,
			}
		},
		data() {
			return {
				Highcharts: Highcharts,
				options: {
					chart: {
						height: '320',
						type: 'pie'
					},
					title: {
						text: ''
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.y}</b><br/>占比:{point.percentage:.1f}%'
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
					plotOptions: {
						pie: {
							innerSize: "60%",
						}
					},
					series: []
				}
			}
		},
		watch: {
			changeFlag: function() {
				this.getFeature(this.$props.sexData);
			}
		},
		created: function() {
			this.getFeature(this.$props.sexData);
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
					feature: 'gender',
					begin_time: val.begin_time,
					end_time: val.end_time,
					store_id: val.store_id,
					merchant_organize_id: val.merchant_organize_id
				}
				statisticsApi.getFeaturePie(list).then((res) => {
					if(res.data.errno === 0) {
						let thisData = res.data.data;
						if(thisData != null && thisData != '') {
							let sexData = [];
							for(var i = 0; i < thisData.gender.length; i++) {
								sexData.push({
									name: thisData.gender[i],
									y: thisData.sum[i]
								})
							}
							this.getData(sexData)
						} else {
							this.getData([])
						}
					} else {
						this.$message(res.data.msg)
					}
				});

			},
			getData(value) {
				let sexCharts = this.$refs.sexCharts;
				sexCharts.delegateMethod('showLoading', 'Loading...');
				sexCharts.removeSeries();
				setTimeout(() => {
					sexCharts.hideLoading();
					sexCharts.addSeries({
						name: "人数",
						data: value
					});

				}, 0)
			},

		}
	}
</script>