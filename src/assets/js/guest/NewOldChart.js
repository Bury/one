    import statisticsApi from '@/api/statistics';
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';
	import VueHighcharts from 'vue2-highcharts';
	HighchartsNoData(Highcharts)

	export default {
		name: 'new-old-chart',
		components: {
			VueHighcharts
		},
		props: {
			sumOrDiff: {
				type: String
			},
			newOldData: {
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
				this.getFeature(this.$props.newOldData);

			}
		},
		created: function() {			
			Highcharts.setOptions({
				lang: {
					thousandsSep: ',',
					noData: '暂无数据'
				}
			});			
			this.getFeature(this.$props.newOldData);
		},
		mounted:function(){
			
		},
		methods: {
			getFeature(val) {
				let list = {
					feature: 'face',
					begin_time: val.begin_time,
					end_time: val.end_time,
					store_id: val.store_id,
					merchant_organize_id: val.merchant_organize_id
				}
				statisticsApi.getFeaturePie(list).then((res) => {
					if(res.data.errno === 0) {
						let thisData = res.data.data;
						if(thisData == null || thisData == '') {	
							this.getData([])
							return false;
						} else {
							let faceData = [];
							for(var i = 0; i < thisData.face.length; i++) {
								faceData.push({
									name: thisData.face[i],
									y: thisData.sum[i]
								})
							}
							this.getData(faceData)
						}
					}
				});

			},

			getData(value) {
				let newOldCharts = this.$refs.newOldCharts;
				newOldCharts.delegateMethod('showLoading', 'Loading...');
				newOldCharts.removeSeries();
				setTimeout(() => {
					newOldCharts.hideLoading();
                    newOldCharts.addSeries({
						name: ' 人数',
						data: value
					});

				}, 0)
			},

		}
	}