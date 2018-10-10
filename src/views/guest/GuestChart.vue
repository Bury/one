<template>
	<div class="chartWrap">
		<div class="chartLine">
			<vue-highcharts :highcharts="Highcharts" :options="options" ref="guestCharts"></vue-highcharts>
		</div>
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
			sumOrDiff: {
				type: String
			},
			changeFlag: {
				type: Boolean,
			},
			statisticsType: {
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
                meanValue:0, //平均线的值
                meanFlag:false, //平均是否显示
				isShow: false,
				chartData: "",
				postParameters: {
					begin_time: '',
					end_time: '',
					store_id: [],
					merchant_organize_id: [],
				},
				options: {
					chart: {
						type: 'line',
						height: '320',
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: []
					},
					yAxis: {
						allowDecimals: false,
						title: {
							text: ''
						}
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
						series: {
							dataLabels: {
								border: 1,
								align: 'center',
								enabled: true,
								rotation: -30,
								x: 2,
								y: -10
							}
						},
						line: {
							// 关闭鼠标跟踪，对应的提示框、点击事件会失效
							enableMouseTracking: true
						}
					},
					series: [{
						name: "客流统计",
						data: []
					}]
				}
			}
		},
		watch: {
			changeFlag: function() {
				this.$data.postParameters = this.$props.postVal;
				this.setData();
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
		mounted: function() {

		},
		methods: {

			//判断数组是否都为零
			zeroFlag(arr) {
				arr = arr || [];
				let flag = arr.some(function(item) {
					return item === 0;
				})
				return flag;
			},

			setData() {
				let val = this.$props.statisticsType;
				switch(val) {
					case "1":
						if(this.$props.sumOrDiff === "0") {
							this.isShow = true;
							if(this.$data.chartOptionsType === 0) {
								this.getCustomer();
							} else if(this.$data.chartOptionsType === 1) {
								this.postFeatureSum("face")
							} else if(this.$data.chartOptionsType === 2) {
								this.postFeatureSum("age")
							} else if(this.$data.chartOptionsType === 3) {
								this.postFeatureSum("gender")
							}
						} else {
							this.isShow = false;
							this.getCustomerDiff();
						}
						break;
					case "2":
						this.isShow = false;
						if(this.$props.sumOrDiff === "0") {
							this.orderSum();
						} else {
							this.orderDiff();
						}
						break;
					case "3":
						this.isShow = false;
						if(this.$props.sumOrDiff === "0") {
							this.customerLostSum()
						} else {
							this.customerLostDiff()
						}
						break;
					case "4":
						this.isShow = false;
						if(this.$props.sumOrDiff === "0") {
							this.orderLostSum();
						} else {
							this.orderLostDiff();
						}
						break;
					default:
						break;
				}
			},

			//绘制图形
			drawChart(value) {
                let meanFlag = this.$data.meanFlag,
                    meanValue = this.$data.meanValue;
				let dataRate = {
					tooltip: {
						formatter: function() {

							let s = '时间:' + this.point.category + '<br/>' + this.point.series.name + ':' + parseFloat(Math.round(this.point.y * 10000) / 100) + '%';
							return s;
						}
					},
					yAxis: {
						labels: {
							formatter: function() {
								return parseFloat(Math.round(this.value * 10000) / 100) + "%"
							}
						},
						max: 1,
						tickPositioner: function() {
							var positions = [0, 0.2, 0.4, 0.6, 0.8, 1];
							return positions;
						},
						plotLines: [{
							color: meanFlag ? 'rgba(255, 196, 1,1)' : 'rgba(255, 196, 1,0)',
							dashStyle: 'Dash', 
							value: meanValue, 
							width: 2,
							zIndex:10
						}]

					}
				};
				let dataSum = {
					tooltip: {
						formatter: function() {
							let s = '时间:' + this.point.category + '<br/>' + this.point.series.name + ':' + this.point.y;
							return s;
						}
					},
					yAxis: {
						labels: {
							formatter: function() {
								return this.value
							}
						},
						max: null,
						tickPositioner: function() {
							let positions = [],
								increment;
							if(meanValue > 10){
								increment = parseFloat(meanValue) > this.dataMax ? Math.ceil(meanValue / 4) : 
								Math.ceil(this.dataMax / 4);
							}else{
								increment = this.dataMax > 10 ? Math.ceil(this.dataMax / 4) : 2;
							}
							for(let i = 0; i < 6; i++) {
								positions.push(increment * i)
							};
							return positions;
						},
						plotLines: [{
							color: meanFlag ? 'rgba(255, 196, 1,1)' : 'rgba(255, 196, 1,0)', 
							dashStyle: 'Dash', 
							value: meanValue, 
							width: 2,
							zIndex:10
						}]
					}
				};
				let guestCharts = this.$refs.guestCharts;
				guestCharts.delegateMethod('showLoading', 'Loading...');
				guestCharts.removeSeries();
				setTimeout(() => {
					guestCharts.hideLoading();
					if(value.length !== 0) {
						guestCharts.getChart().xAxis[0].setCategories(value[0].time);

						if(this.$props.statisticsType !== '1') {
							for(var i = 0; i < value.length; i++) {
								value[i].dataLabels = {
									enabled: true,
									formatter: function() {
										return parseFloat(Math.round(this.y * 10000) / 100) + "%";
									}
								}
								guestCharts.addSeries(value[i])
							};
							guestCharts.getChart().update(dataRate);
						} else {

							for(var i = 0; i < value.length; i++) {
								value[i].dataLabels = {
									enabled: true,
									formatter: function() {
										return this.y;
									}
								}
								guestCharts.addSeries(value[i]);
							};
							guestCharts.getChart().update(dataSum);
						}

					} else {
						guestCharts.addSeries(value)
					}
				}, 0)

			},

			//客流统计特征图
			postFeatureSum(flag) {
				this.$data.meanValue = 0;
				this.$data.meanFlag = false;
				let postData = {
					feature: flag,
					begin_time: this.$props.postVal.begin_time,
					end_time: this.$props.postVal.end_time,
					store_id: this.$props.postVal.store_id,
					merchant_organize_id: this.$props.postVal.merchant_organize_id,
				};
				statisticsApi.getFeatureGraph(postData).then((res) => {
					let arr = [];
					if(res.data.errno === 0) {
						if(res.data.data !== null) {
							let d = res.data.data;
							d.forEach(function(val, index) {
								arr.push({
									name: val.value,
									data: val.sum,
									time: val.time
								})
							})
							this.drawChart(arr);
						} else {
							this.drawChart([]);
						}
					} else {
						this.$message(res.data.msg)
					}
				})
			},

			//客流统计默认数据求和
			getCustomer() {
				statisticsApi.getCustomerSum(this.$data.postParameters).then((res) => {
					if(res.data.errno === 0) {
						if(res.data.data !== null) {
							let arr = [{
								name: "总客流",
								data: res.data.data.sum,
								time: res.data.data.time
							}];
							if(typeof(res.data.data.mean) != 'undefined'){
								this.$data.meanValue = res.data.data.mean.toFixed(1);
								this.$data.meanFlag = true;
							}else{
								this.$data.meanValue = 0;
								this.$data.meanFlag = false;
							};
							this.drawChart(arr);
						} else {
							this.drawChart([])
						}
					}
				})
			},

			//客流统计折线图比对
			getCustomerDiff() {
				this.$data.meanValue = 0;
				this.$data.meanFlag = false; // 隐藏平均线
				statisticsApi.getCustomerDiff(this.$data.postParameters).then((res) => {
					if(res.data.errno === 0) {
						if(res.data.data !== null) {
							let arr = [];
							for(let i = 0; i < res.data.data.length; i++) {
								arr.push({
									name: res.data.data[i].diff_name,
									data: res.data.data[i].sum,
									time: res.data.data[i].time
								})
							}
							this.drawChart(arr);
						} else {
							this.drawChart([])
						}
					} else {
						this.$message(res.data.msg)
					}
				})
			},
			//成交率求和
			orderSum() {
				statisticsApi.getOrderSum(this.$data.postParameters).then((res) => {
					if(res.data.errno === 0) {
						if(res.data.data !== null) {
							let arr = [{
								name: "成交率",
								data: res.data.data.success,
								time: res.data.data.time
							}];
							if(typeof(res.data.data.mean) != 'undefined'){
								this.$data.meanValue = res.data.data.mean.toFixed(2);
								this.$data.meanFlag = true;
							}else{
								this.$data.meanValue = 0;
								this.$data.meanFlag = false;
							};
							this.drawChart(arr);
						} else {
							this.drawChart([])
						}
					}
				})
			},

			//成交率折线图比对
			orderDiff() {
				this.$data.meanValue = 0;
				this.$data.meanFlag = false;
				statisticsApi.getOrderDiff(this.$data.postParameters).then((res) => {
					if(res.data.errno === 0) {
						if(res.data.data !== null) {
							let arr = [];
							for(let i = 0; i < res.data.data.length; i++) {
								arr.push({
									name: res.data.data[i].diff_name,
									data: res.data.data[i].success,
									time: res.data.data[i].time
								})
							}
							this.drawChart(arr)
						} else {
							this.drawChart([])
						}
					} else {
						this.$message(res.data.msg)
					}
				})
			},

			//潜在客户流失率
			customerLostSum() {
				this.$data.meanValue = 0;
				this.$data.meanFlag = false;
				statisticsApi.customerlostSum(this.$data.postParameters).then((res) => {
					if(res.data.errno === 0) {
						if(res.data.data !== null) {
							let dat = [];
							res.data.data.diff.forEach(function(val) {
								dat.push(parseFloat(val))
							});
							let arr = [{
								name: "潜在客户流失率",
								data: dat,
								time: res.data.data.time
							}]
							this.drawChart(arr);
						} else {
							this.drawChart([])
						}
					}
				})
			},

			//潜在客户流失率比对
			customerLostDiff() {
				this.$data.meanValue = 0;
				this.$data.meanFlag = false;
				statisticsApi.customerlostDiff(this.$data.postParameters).then((res) => {
					if(res.data.errno === 0) {
						if(res.data.data !== null) {
							let arr = [];
							for(let i = 0; i < res.data.data.length; i++) {
								arr.push({
									name: res.data.data[i].diff_name,
									data: res.data.data[i].diff,
									time: res.data.data[i].time
								})
							}
							this.drawChart(arr);
						} else {
							this.drawChart([]);
						}
					} else {
						this.$message(res.data.msg)
					}
				})
			},

			//成交客户流失率
			orderLostSum() {
				this.$data.meanValue = 0;
				this.$data.meanFlag = false;
				statisticsApi.orderlostSum(this.$data.postParameters).then((res) => {
					if(res.data.errno === 0) {
						if(res.data.data !== null) {
							let dat = [];
							res.data.data.diff.forEach(function(val) {
								dat.push(parseFloat(val))
							})
							let arr = [{
								name: "成交客户流失率",
								data: dat,
								time: res.data.data.time
							}]
							this.drawChart(arr);
						} else {
							this.drawChart([]);
						}
					}
				})
			},

			//成交客户流失率比对
			orderLostDiff() {
				this.$data.meanValue = 0;
				this.$data.meanFlag = false;
				statisticsApi.orderlostDiff(this.$data.postParameters).then((res) => {
					if(res.data.errno === 0) {
						if(res.data.data !== null) {
							let arr = [];
							for(let i = 0; i < res.data.data.length; i++) {
								arr.push({
									name: res.data.data[i].diff_name,
									data: res.data.data[i].diff,
									time: res.data.data[i].time
								})
							}
							this.drawChart(arr);
						} else {
							this.drawChart([]);
						}
					} else {
						this.$message(res.data.msg)
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
	
	.chartLine {
		margin-left: 0;
		width: calc(100% - 110px);
	}
	
	.el-radio-select {
		position: absolute;
		width: 100px;
		top: 70px;
		right: 0px;
		z-index: 2;
		div {
			margin-bottom: 15px;
		}
	}
</style>