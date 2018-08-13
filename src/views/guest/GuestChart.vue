<template>
	<div class="chartWrap">
		<vue-highcharts :highcharts="Highcharts" :options="options" ref="guestCharts"></vue-highcharts>
		<el-radio-group v-model="chartOptionsType" @change="customerType" class="el-radio-select" v-if="isShow">
			<div>
				<el-radio :label="0">默认</el-radio>
			</div>
			<div>
				<el-radio :label="1">新熟客</el-radio>
			</div>
			<div>
				<el-radio :label="2">年龄段</el-radio>
			</div>
			<div>
				<el-radio :label="3">性别</el-radio>
			</div>
		</el-radio-group>

	</div>
</template>

<script>
	import statisticsApi from '@/api/statistics'
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';
	import VueHighcharts from 'vue2-highcharts'
	HighchartsNoData(Highcharts)

	export default {
		name: 'line-chart',
		components: {
			VueHighcharts
		},
		props: {
			guestData: {
				type: Object,
			},
			isAll: {
				type: String,
			},
			postVal: {
				type: Object,
			}
		},
		data() {
			return {
				Highcharts: Highcharts,
				chartOptionsType: 0,
				isShow: false,
				chartData:"",
				postParameters:{
					begin_time: '',
				  end_time: '',
			  	store_id: [],
				  merchant_organize_id:[],
				},
				options: {
					chart: {
						type: 'line'
					},
					title: {
						text: '客流量占比'
					},
					xAxis: {
						categories: []
					},
					yAxis: {
						title: {
							text: ''
						}
					},
					credits: {
						text: '',
					},
					plotOptions: {
						line: {
							dataLabels: {
								// 开启数据标签
								enabled: true
							},
							// 关闭鼠标跟踪，对应的提示框、点击事件会失效
							enableMouseTracking: true
						}
					},
					series: [{
						 name:"客流统计",
						 data:[]
					}]
				}
			}
		},
		watch: {
			isAll: function() {
				this.setData()
			}
		},
		created: function() {
			this.$data.postParameters = this.$props.postVal;
			this.setData();					
			Highcharts.setOptions({
				lang: {
					thousandsSep: ',',
					noData: '暂无数据'
				}
			 });
		},
		mounted:function () {
			 			
		},
		methods: {
			setData() {
				let val = this.$props.isAll;        
        switch (val){
        	case "1":
        	  this.isShow = true;
        	  this.getCustomer()
        		break;
        	case "2":
        	  this.isShow = false;
        	  this.orderSum();
        		break;
        	case "3":
        	  this.isShow = false;
        	  this.customerLostSum()
        		break;
        	case "4":
        	  this.isShow =false;
        	  this.orderLostSum();
        		break;	
        	default:
        		break;
        }
			},
			
			//绘制图形
			drawChart(value) {
				console.log(value)
				let guestCharts = this.$refs.guestCharts;
				guestCharts.delegateMethod('showLoading', 'Loading...');
				guestCharts.removeSeries();
				setTimeout(() => {
					guestCharts.hideLoading();	
					if(value.length !== 0){
						for(var i = 0; i < value.length; i++) {
						 guestCharts.addSeries(value[i])
				    }
					  guestCharts.getChart().xAxis[0].setCategories(value[0].time);
					}
					
        }, 100)

			},
			
			//客流统计分类数据
			postFeatureSum(flag) {
				let postData = {
					feature: flag,
					begin_time: this.$props.postVal.begin_time,
					end_time: this.$props.postVal.end_time,
					store_id: this.$props.postVal.store_id,
					merchant_organize_id: this.$props.postVal.merchant_organize_id,
				}
				let qs = require('querystring');
				statisticsApi.getFeatureGraph(qs.stringify(postData)).then((res) => {
					if(res.data.errno === 0) {
						  let d = res.data.data;
						  let arr = [];
						  d.forEach(function(val,index){
						  	 arr.push({name:val.value,data:val.sum,time:val.time})
						  })
						  this.drawChart(arr)
					}
				})
			},
			
			
			//客流统计默认数据
			getCustomer(){
			  let qs = require('querystring');
		   	statisticsApi.getCustomerSum(qs.stringify(this.$data.postParameters)).then((res) => {
				 if(res.data.errno === 0) {
					  let arr = [{
					  	  name:"总客流",
					  	  data:res.data.data.sum,
					  	  time:res.data.data.time
					  }]
					   this.drawChart(arr)
				  }
			  })
		 },	
		     //成交率
			orderSum(){
			  let qs = require('querystring');
		   	statisticsApi.getOrderSum(qs.stringify(this.$data.postParameters)).then((res) => {
				 if(res.data.errno === 0) {
					  let arr = [{
					  	  name:"成交率",
					  	  data:res.data.data.success,
					  	  time:res.data.data.time
					  }]
					   this.drawChart(arr)
				  }
			  })
		 },	
		     //潜在客户流失率
			customerLostSum(){
			  let qs = require('querystring');
		   	statisticsApi.customerlostSum(qs.stringify(this.$data.postParameters)).then((res) => {
				 if(res.data.errno === 0) {
					  let arr = [{
					  	  name:"潜在客户流失率",
					  	  data:res.data.data.diff,
					  	  time:res.data.data.time
					  }]
					   this.drawChart(arr)
				  }
			  })
		 },	
		    //成交客户流失率
			orderLostSum(){
			  let qs = require('querystring');
		   	statisticsApi.orderlostSum(qs.stringify(this.$data.postParameters)).then((res) => {
				 if(res.data.errno === 0) {
				 		console.log(res)
					  let arr = [{
					  	  name:"成交客户流失率",
					  	  data:res.data.data.diff,
					  	  time:res.data.data.time
					  }]
					   this.drawChart(arr)
				  }
			  })
		 },	

			//客流统计求和类型切换
			customerType(val) {
				if(val === 0) {
					this.getCustomer()
				} else if(val === 1) {
					this.postFeatureSum("face")
				} else if(val === 2) {
					this.postFeatureSum("age")
				} else if(val === 3) {
					this.postFeatureSum("gender")
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chartWrap {
		position: relative;
	}
	
	.el-radio-select {
		position: absolute;
		top: 100px;
		right: -70px;
		div {
			margin-bottom: 15px;
		}
	}
</style>