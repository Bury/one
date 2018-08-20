<template>
	<div>
		<vue-highcharts :highcharts="Highcharts" :options="options" ref="columnAgeChart"></vue-highcharts>
	</div>
</template>

<script>
	import statisticsApi from '@/api/statistics'
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';
	import VueHighcharts from 'vue2-highcharts'
	HighchartsNoData(Highcharts)

	export default {
		name: 'column-age-chart',
		components: {
			VueHighcharts
		},
		props: {
			sumOrDiff: {
				type: String
			},
			columnAge: {
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
						text: '年龄段'
					},
					credits: {
						text: '',
					},
					yAxis:{
						title:{
                          text:""
						}
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
				this.getFeatureDiff(this.$props.columnAge);
			}
		},
		created: function() {
			this.getFeatureDiff(this.$props.columnAge);
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
					feature: 'age',
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
							let ageData = [];	
							let l = thisData.sum[0].value.length;													
							for(let k=0;k<l;k++){
								ageData.push({
									type: "column",
									name: thisData.sum[0].value[k].diff_name,
									data: []
								})
								
							}								
							for(let i = 0; i < thisData.sum.length; i++) {
								
								for(let j=0;j<thisData.sum[i].value.length;j++){
									ageData[j].data.push(thisData.sum[i].value[j].total)    
								}
							}
							this.getData(ageData)
						}
					}
				});
			},

			getData(value) {
				let columnAgeChart = this.$refs.columnAgeChart;
				columnAgeChart.delegateMethod('showLoading', 'Loading...');
				columnAgeChart.removeSeries();
				setTimeout(() => {
					columnAgeChart.hideLoading();
					while(columnAgeChart.getChart().series.length > 0) {
						columnAgeChart.getChart().remove(true);
					}

					for(let i = 0; i < value.length; i++) {
						columnAgeChart.getChart().addSeries(value[i])
					}
					columnAgeChart.getChart().xAxis[0].setCategories(["20岁以下", "20-29岁","30-39岁","40-49岁","50-59岁","60岁以上"]);

				}, 0)
			},

		}
	}
</script>