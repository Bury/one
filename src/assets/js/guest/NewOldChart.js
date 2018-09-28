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
			Highcharts: Highcharts,
			options: {
				chart: {
					height:'320',
					type: 'pie'
				},
				title: {
					text: ''
				},
				tooltip: {
					pointFormat:'{series.name}: <b>{point.y}</b><br/>占比:{point.percentage:.1f}%'
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
	mounted: function() {

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