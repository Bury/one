<template>
	<div>
		<vue-highcharts :options="options" ref="newOldCharts"></vue-highcharts>
	</div>
</template>

<script>
	import statisticsApi from '@/api/statistics'
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';
	import VueHighcharts from 'vue2-highcharts'
	HighchartsNoData(Highcharts)

	export default {
		name: 'new-old-chart',
		components: {
			VueHighcharts
		},
		props: {
			sumOrDiff:{
				type:String
			},
			newOldData: {
				type: Object,
			},
			changeFlag:{
				type:Boolean,
			}
		},
		data() {
			return {
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
				if(this.$props.sumOrDiff === "0"){
					 this.getFeature(this.$props.newOldData);
				}else{
					 this.getFeatureDiff(this.$props.newOldData);
				}
				
			}
		},
		created:function(){
			 this.getFeature(this.$props.newOldData);
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
					feature: 'face',
					begin_time:val.begin_time,
					end_time: val.end_time,
					store_id: val.store_id,
					merchant_organize_id:val.merchant_organize_id
				}
				statisticsApi.getFeaturePie(list).then((res) => {
					if(res.data.errno === 0) {
						console.log(res)
						let thisData = res.data.data;
						if(thisData == null || thisData == '') {
							return false;
						} else {
							 let faceData = [];
							 for(var i = 0; i < thisData.face.length; i++) {
							    faceData.push({							    	
							    	name:thisData.face[i], 
							    	y:thisData.sum[i]
							    })
						    }
						  this.getData(faceData)
						}
					}
				});

			},
			
			//比对柱状图
			getFeatureDiff(val){
				let data = {
					feature: 'face',
					begin_time:val.begin_time,
					end_time: val.end_time,
					store_id: val.store_id,
					merchant_organize_id:val.merchant_organize_id
				};
				statisticsApi.getFeatureDiff(data).then((res) => {
					console.log(res)
					if(res.data.errno === 0) {
						let thisData = res.data.data;
						if(thisData == null || thisData == '') {
							return false;
						} else {
							 let faceData = [];
							 for(var i = 0; i < thisData.length; i++) {
							    faceData.push({
							    	type:"column",
							    	name:thisData[i].diff_name, 
							    	data:thisData[i].sum
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
				  while (newOldCharts.getChart().series.length > 0){
						newOldCharts.getChart().remove(true);
					}
				  if(this.$props.sumOrDiff === "0"){
						newOldCharts.addSeries({
				  	 type:"pie",
					   name: ' 人数',
					   data: value
				  });	
					}else{
						for (let i = 0; i< value.length;i++) {
						 newOldCharts.getChart().addSeries(value[i])
					  }
						newOldCharts.getChart().xAxis[0].setCategories(["新客","熟客"]);
					}
				 }, 0)
			},

		}
	}
</script>