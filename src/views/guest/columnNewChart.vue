<template>
	<div>
		<vue-highcharts :highcharts="Highcharts" :options="options" ref="columnNewChart"></vue-highcharts>
	</div>
</template>

<script>
	import statisticsApi from '@/api/statistics'
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';
	import VueHighcharts from 'vue2-highcharts'
	HighchartsNoData(Highcharts)

	export default {
		name: 'column-new-chart',
		components: {
			VueHighcharts
		},
		props: {
			sumOrDiff: {
				type: String
			},
			columnNew: {
				type: Object,
			},
			changeFlag: {
				type: Boolean,
			}
		},
		data() {
			return {
				Highcharts:Highcharts,
				xName:[],
				options: {
					chart: {
						type: ''
					},
					title: {
						text: '新客熟客占比'
					},
					credits: {
						text: '',
					},
					colors: [
						'#FFC200',
						'#57B4F7',
						'#90ED7D'
					],
					series: []
				}
			}
		},
		watch: {
			changeFlag: function() {
				this.getFeatureDiff(this.$props.columnNew);
			}
		},
		created: function() {
			this.getFeatureDiff(this.$props.columnNew);
			Highcharts.setOptions({
				lang: {
					thousandsSep: ',',
					noData: '暂无数据'
				}
			});
		},
		methods: {

			//比对柱状图
			getFeatureDiff(val) {
				let data = {
					feature: 'face',
					begin_time: val.begin_time,
					end_time: val.end_time,
					store_id: val.store_id,
					merchant_organize_id: val.merchant_organize_id
				};
				statisticsApi.getFeatureDiff(data).then((res) => {
					if(res.data.errno === 0) {
						let thisData = res.data.data;
						if(thisData == null || thisData == '') {
							return false;
						} else {
							this.$data.xName = thisData.feature;
							let faceData = [];	
							let l = thisData.sum[0].value.length;													
							for(let k=0;k<l;k++){
								faceData.push({
									type: "column",
									name: thisData.sum[0].value[k].diff_name,
									data: []
								})
								
							}								
							for(let i = 0; i < thisData.sum.length; i++) {
								
								for(let j=0;j<thisData.sum[i].value.length;j++){
									faceData[j].data.push(thisData.sum[i].value[j].total)    
								}
							}
							this.getData(faceData)
						}
					}
				});
			},

			getData(value) {
				let columnNewChart = this.$refs.columnNewChart;
				columnNewChart.delegateMethod('showLoading', 'Loading...');
				columnNewChart.removeSeries();
				setTimeout(() => {
					columnNewChart.hideLoading();
					while(columnNewChart.getChart().series.length > 0) {
						columnNewChart.getChart().remove(true);
					}

					for(let i = 0; i < value.length; i++) {
						columnNewChart.getChart().addSeries(value[i])
					}
					
					columnNewChart.getChart().xAxis[0].setCategories(["新客", "熟客"]);
					//如果使用后台传来的值，setCategories()传入this.$data.xName

				}, 0)
			},

		}
	}
</script>