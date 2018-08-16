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
						type: 'line'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: []
					},
					yAxis: {
						allowDecimals:false,
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
			setData() {
				let val = this.$props.statisticsType;
				switch(val) {
					case "1":
						if(this.$props.sumOrDiff === "0") {
							this.isShow = true;
							if(this.$data.chartOptionsType === 0) {
								this.getCustomer()
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
				let guestCharts = this.$refs.guestCharts;
				guestCharts.delegateMethod('showLoading', 'Loading...');
				guestCharts.removeSeries();	
				setTimeout(() => {
					guestCharts.hideLoading();
					if(value.length !== 0) {
						for(var i = 0; i < value.length; i++) {
							guestCharts.addSeries(value[i])
						}
						guestCharts.getChart().xAxis[0].setCategories(value[0].time);
					} else {
						guestCharts.addSeries(value)
					}
				}, 0)

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
				statisticsApi.getFeatureGraph(postData).then((res) => {
					let arr = [];
					if(res.data.errno === 0) {
						let d = res.data.data;
						d.forEach(function(val, index) {
							arr.push({
								name: val.value,
								data: val.sum,
								time: val.time
							})
						})

						this.drawChart(arr)
					} else {
						this.drawChart(arr)
					}
				})
			},

			//客流统计默认数据
			getCustomer() {
				console.log(this.$data.postParameters)
				statisticsApi.getCustomerSum(this.$data.postParameters).then((res) => {		
					console.log(res)
					if(res.data.errno === 0) {
						let arr = [{
							name: "总客流",
							data: res.data.data.sum,
							time: res.data.data.time
						}]
						this.drawChart(arr)
					}
				})
			},

			//客流统计折线图比对			
			getCustomerDiff() {
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
							this.drawChart(arr)
						}
					} else {
						this.$message(res.data.msg)
					}
				})
			},
			//成交率
			orderSum() {
				statisticsApi.getOrderSum(this.$data.postParameters).then((res) => {
					if(res.data.errno === 0) {
						let arr = [{
							name: "成交率",
							data: res.data.data.success,
							time: res.data.data.time
						}]
						this.drawChart(arr);
					}
				})
			},

			//成交率折线图比对
			orderDiff() {
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
						}
					} else {
						this.$message(res.data.msg)
					}
				})
			},

			//潜在客户流失率
			customerLostSum() {
				statisticsApi.customerlostSum(this.$data.postParameters).then((res) => {
					if(res.data.errno === 0) {
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
					}
				})
			},

			//潜在客户流失率比对
			customerLostDiff() {
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
							this.drawChart(arr)
						}
					} else {
						this.$message(res.data.msg)
					}
				})
			},

			//成交客户流失率
			orderLostSum() {
				statisticsApi.orderlostSum(this.$data.postParameters).then((res) => {
					if(res.data.errno === 0) {
						let dat = [];
						res.data.data.diff.forEach(function(val) {
							dat.push(parseFloat(val))
						})
						let arr = [{
							name: "成交客户流失率",
							data: dat,
							time: res.data.data.time
						}]
						this.drawChart(arr)
					}
				})
			},

			//成交客户流失率比对
			orderLostDiff() {
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
							this.drawChart(arr)
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
					console.log("s")
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
		right: -60px;
		z-index: 2;
		div {
			margin-bottom: 15px;
		}
	}
</style>