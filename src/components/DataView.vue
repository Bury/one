<template>
	<div id="viewBg">
		<div class="view-box">
			<span class="closeViewBox" @click="closeViewBox"></span>
			<el-row type="flex" justify="space-between">
				<el-col :span="4">
					<img src="../assets/images/logo.png" />
					<img src="../assets/images/logoname.png" />
				</el-col>
				<el-col :span="16">
					<div class="title-box">
						<span class="all-year">全年累计客流量<span class="all-data">{{briefingData.yearly.total_ct}}</span><span class="all-font">人</span></span>
						<span class="title-rise">同比增长<span>{{briefingData.yearly.total_rate}}</span></span>
					</div>
				</el-col>
				<el-col :span="4">
					<p class="title-time">
						<i class="el-icon-time"></i>
						<span>{{showTime | date(4)}}</span>
					</p>
				</el-col>
			</el-row>

			<ul class="t-select">
				<li :class="isSelect === 'day' ? 't-active' : ''" @click="selectTime('day')">今日</li>
				<li :class="isSelect === 'week' ? 't-active' : ''" @click="selectTime('week')">本周</li>
				<li :class="isSelect === 'month' ? 't-active' : ''" @click="selectTime('month')">本月</li>
				<li :class="isSelect === 'year' ? 't-active' : ''" @click="selectTime('year')">当年</li>
			</ul>

			<div class="c-wrap">
				<div class="c-left">
					<ul class="c-left-ul">
						<li>
							<section>
								<data-view-line :lineFlag="lineFlag" :chartData="guestParameters"></data-view-line>
							</section>
							<section class="c-left-chart-bottom">
								<p>客流<span class="font30 color-e">{{briefingData.keliu.total_ct}}</span>人&nbsp;环比上升<span class="color-f">{{briefingData.keliu.total_rate}}</span></p>
								<p class="ml20">新客<span class="font30 color-e">{{briefingData.keliu.new_ct}}</span>人&nbsp;环比下降<span class="color-g">{{briefingData.keliu.new_rate}}</span></p>
							</section>
						</li>
						<li class="c-order-wrap">
							<section>
								<span>{{briefingData.order.order_ct}}</span>
								<p>订单数</p>
							</section>
							<section class="c-middle-section">
								<span>{{briefingData.order.sales_volume}}</span>
								<p>销售额</p>
							</section>
							<section>
								<span>{{briefingData.order.turnover_rate}}</span>
								<p>成交率</p>
							</section>
						</li>
						<li class="c-camera">

							<span class="c-left-eye"><img src="../assets/images/eye.png"/>摄像头</span>
							<span class="ml20">在线<span class="font23 color-g">{{briefingData.device.online}}</span>台</span>
							<span class="ml20">离线<span class="font23 color-e">{{briefingData.device.offline}}</span>台</span>
						</li>
					</ul>
				</div>
				<div class="c-middle">
					<div class="c-middle-div mb16">
						<h4 class="c-h4"><span>热门标签</span></h4>
						<table class="c-table">
							<thead>
								<tr>
									<th><span class="c-tag-space">标签</span></th>
									<th><span class="c-tag-space">次数</span></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in briefingData.tag_list" :key="index">
									<td v-if="index === 0"><img src="../assets/images/first.png" /><span class="c-tag-space">{{item.name}}</span></td>
									<td v-else-if="index === 1"><img src="../assets/images/second.png" /><span class="c-tag-space">{{item.name}}</span></td>
									<td v-else-if="index === 2"><img src="../assets/images/third.png" /><span class="c-tag-space">{{item.name}}</span></td>
									<td v-else><span class="c-tag-space">{{item.name}}</span></td>
									<td>{{item.ct}}</td>
								</tr>
							</tbody>

						</table>
					</div>
					<div class="c-middle-div mb16">
						<h4 class="c-h4"><span>性别比例</span></h4>
						<data-view-sex :timeing="timeingFlag" :sexData="sexData"></data-view-sex>
					</div>
					<div class="c-middle-div">
						<h4 class="c-h4"><span>年龄比例</span></h4>
						<data-view-age :timeing="timeingFlag" :ageData="ageData"></data-view-age>
					</div>

				</div>
				<div class="c-right">
					<div class="c-right-div mb16">
						<h4 class="c-h4"><span>客流量排行</span></h4>
						<table class="c-table">
							<thead>
								<tr>
									<th>门店</th>
									<th>客流量</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in briefingData.flow_list" :key="index">
									<td v-if="index === 0"><img src="../assets/images/first.png" /><span>{{item.name}}</span></td>
									<td v-else-if="index === 1"><img src="../assets/images/second.png" /><span>{{item.name}}</span></td>
									<td v-else-if="index === 2"><img src="../assets/images/third.png" /><span>{{item.name}}</span></td>
									<td v-else>{{item.name}}</td>
									<td>{{item.ct}}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="c-right-div">
						<h4 class="c-h4"><span>熟客占比排行</span></h4>
						<table class="c-table">
							<thead>
								<tr>
									<th>门店</th>
									<th>熟客占比</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in briefingData.old_list" :key="index">
									<td v-if="index === 0"><img src="../assets/images/first.png" /><span>{{item.name}}</span></td>
									<td v-else-if="index === 1"><img src="../assets/images/second.png" /><span>{{item.name}}</span></td>
									<td v-else-if="index === 2"><img src="../assets/images/third.png" /><span>{{item.name}}</span></td>
									<td v-else>{{item.name}}</td>
									<td>{{item.ct}}</td>
								</tr>
							</tbody>

						</table>
					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import statisticsApi from '@/api/statistics';
	import DataViewLine from './DataViewLine';
	import DataViewSex from './DataViewSex';
	import DataViewAge from './DataViewAge';

	var t, c;

	export default {
		name: 'data-view',
		components: {
			DataViewLine,
			DataViewSex,
			DataViewAge
		},
		data() {
			return {
				isSelect: 'day',
				showTime: '',
				guestParameters: {
					begin_time: '',
					end_time: ''
				},
				briefingData: {
					keliu: {
						new_ct: '',
						new_rate: '',
						total_ct: '',
						tatal_rate: ''
					},
					order: {
						order_ct: '',
						sales_volume: '',
						turnover_rate: '',
					},
					device: {
						online: '',
						offline: ''
					},
					yearly: {
						total_ct: '',
						total_rate: ''
					},
					tag_list: [],
					flow_list: [],
					old_list: []
				},
				sexData: [],
				ageData: [],
				lineFlag: true,
				timeingFlag: true
			}
		},
		created() {
			this.getBeginEndTime('day');
			this.rightTopTime();
			this.getRank();
			this.getRatio();
		},
		mounted() {
			//右上角时间的定时器
			t = setInterval(() => {
				this.rightTopTime();
			}, 1000);

			//刷新chart定时器
			c = setInterval(() => {
				this.$data.lineFlag = !this.$data.lineFlag;//折线图的数据改变操作
				this.getRatio();//性别年龄饼状图的数据操作
				this.getRank();//简报数据总览的数据操作
			}, 60000);
		},
		destroyed() {
			//组件销毁后清空定时器			
			clearInterval(t);
			clearInterval(c);
		},
		methods: {
			rightTopTime() {
				let rightTopTime = new Date();
				this.$data.showTime = rightTopTime.getTime() / 1000;
			},
			selectTime(val) {
				this.$data.isSelect = val;
				this.getBeginEndTime(val);
				this.$data.lineFlag = !this.$data.lineFlag;//折线图的数据改变操作
				this.getRatio();//性别年龄饼状图的数据操作
				this.getRank(); //简报数据总览的数据操作
			},
			//时间转为秒
			getS(value) {
				var formatTimeS = new Date(value).getTime() / 1000;
				return formatTimeS;
			},
			getBeginEndTime(val) {
				let t = new Date();
				let y = t.getFullYear();
				let m = t.getMonth() + 1;
				let d = t.getDate();
				let weekd = t.getDay();
				switch(val) {
					case "day":
						this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`);
						this.$data.guestParameters.end_time = this.getS(`${y}/${m}/${d} 23:59:59`);
						break;
					case "week":
						if(weekd === 0) {
							weekd = 7
						};
						this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`) - 86400 * (weekd - 1);
						this.$data.guestParameters.end_time = this.getS(`${y}/${m}/${d} 23:59:59`) + 86400 * (7 - weekd);
						break;
					case "month":
						let nexty, nextm;
						m === 12 ? (nexty = y + 1, nextm = 1) : (nexty = y, nextm = m + 1)
						this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/01 00:00:00`);
						this.$data.guestParameters.end_time = this.getS(`${nexty}/${nextm}/01 00:00:00`) - 1;
						break;
					case "year":
						this.$data.guestParameters.begin_time = this.getS(`${y}/01/01 00:00:00`);
						this.$data.guestParameters.end_time = this.getS(`${y}/12/31 23:59:59`);
						break;
				}
			},

			//简报数据总览
			getRank() {
				let list = {
					type: this.$data.isSelect
				};
				statisticsApi.briefingData(list).then((res) => {
					if(res.data.errno === 0) {
						this.$data.briefingData = res.data.data;
					} else {
						this.$message(res.data.msg)
					}
				})
			},

			//性别年龄比例请求
			getRatio() {
				let list = {
					type: this.$data.isSelect,
					ratio_data: '1,2'
				};
				statisticsApi.briefingRatio(list).then((res) => {
					if(res.data.errno === 0) {
						let thisData = res.data.data;
						let age = [],
							sex = [];
						if(thisData.age !== null) {
							for(let i = 0; i < thisData.age.age.length; i++) {
								age.push({
									name: thisData.age.age[i],
									y: thisData.age.sum[i]
								})
							};
							this.$data.sexData = sex;
						}
						if(thisData.gender !== null) {
							for(let j = 0; j < thisData.gender.gender.length; j++) {
								sex.push({
									name: thisData.gender.gender[j],
									y: thisData.gender.sum[j]
								})
							};
							this.$data.ageData = age;
						}
						this.$data.timeingFlag = !this.$data.timeingFlag;
					}
				})

			},
			//关闭全屏首页
			closeViewBox() {
				console.log("99")
			}
		}
	}
</script>

<style lang="scss" src="@/assets/css/dataView/DataView.scss">