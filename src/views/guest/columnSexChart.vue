<template>
	<div>
		<vue-highcharts :highcharts="Highcharts" :options="options" ref="columnSexChart"></vue-highcharts>
	</div>
</template>

<script>
	import statisticsApi from '@/api/statistics'
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';
	import VueHighcharts from 'vue2-highcharts'
	HighchartsNoData(Highcharts)

	export default {
		name: 'column-sex-chart',
		components: {
			VueHighcharts
		},
		props: {
			sumOrDiff: {
				type: String
			},
			columnSex: {
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
						text: '性别'
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
						'#57B4F7',
						'#FFC200',						
						'#90ED7D'
					],
					series: []
				}
			}
		},
		watch: {
			changeFlag: function() {
				this.getFeatureDiff(this.$props.columnSex);
			}
		},
		created: function() {
			this.getFeatureDiff(this.$props.columnSex);
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
					feature: 'gender',
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
							let sexData = [];	
							let l = thisData.sum[0].value.length;													
							for(let k=0;k<l;k++){
								sexData.push({
									type: "column",
									name: thisData.sum[0].value[k].diff_name,
									data: []
								})
								
							}								
							for(let i = 0; i < thisData.sum.length; i++) {
								
								for(let j=0;j<thisData.sum[i].value.length;j++){
									sexData[j].data.push(thisData.sum[i].value[j].total)    
								}
							}
							this.getData(sexData)
						}
					}
				});
			},

			getData(value) {
				let dataRate = {
					tooltip: {
						formatter: function() {
							let s = this.point.series.name + ':' + (this.point.y * 100) + '%';
							return s;
						}
					},
					yAxis: {
						labels: {
							formatter: function() {
								return this.value * 100 + "%"
							}
						},
						max: 1,
						tickPositioner: function() {
							var positions = [0, 0.2, 0.4, 0.6, 0.8, 1];
							return positions;
						}

					},
					series: {
						dataLabels: {
							enabled: true,
							formatter: function() {
								return this.y * 100 + "%"
							}
						}
					}
				};
				let columnSexChart = this.$refs.columnSexChart;
				columnSexChart.delegateMethod('showLoading', 'Loading...');
				columnSexChart.removeSeries();
				setTimeout(() => {
					columnSexChart.hideLoading();
					while(columnSexChart.getChart().series.length > 0) {
						columnSexChart.getChart().remove(true);
					}

					for(let i = 0; i < value.length; i++) {
						columnSexChart.getChart().addSeries(value[i])
					}
					columnSexChart.getChart().xAxis[0].setCategories(["男", "女"]);
                    columnSexChart.getChart().update(dataRate);
				}, 0)
			},

		}
	}
</script>