<template>
	<div id="viewBg">
		<div class="view-box">
			<span class="closeViewBox"  @click="closeViewBox"></span>
			<el-row type="flex" justify="space-between">
				<el-col :span="4">
					<img src="../assets/images/logo.png" />
					<img src="../assets/images/logoname.png" />
				</el-col>
				<el-col :span="16">
					<div class="title-box">
						<span class="all-year">全年累计客流量<span class="all-data">978569875</span><span class="all-font">人</span></span>
						<span class="title-rise">同比增长<span>11.68%</span></span>
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
				<li :class="isSelect === 'd' ? 't-active' : ''" @click="selectTime('d')">今日</li>
				<li :class="isSelect === 'w' ? 't-active' : ''" @click="selectTime('w')">本周</li>
				<li :class="isSelect === 'm' ? 't-active' : ''" @click="selectTime('m')">本月</li>
				<li :class="isSelect === 'y' ? 't-active' : ''" @click="selectTime('y')">当年</li>
			</ul>

			<div class="c-wrap">
				<div class="c-left">
					<ul class="c-left-ul">
						<li>
							<section>
								<data-view-line :timeFlag="changeFlag" :timeing="timeingFlag" :chartData="guestParameters"></data-view-line>
							</section>
							<section class="c-left-chart-bottom">
								<p>客流<span class="font30 color-e">5555555</span>人&nbsp;环比上升<span class="color-f">12.28%</span></p>
								<p class="ml20">新客<span class="font30 color-e">8273</span>人&nbsp;环比下降<span class="color-g">0.24%</span></p>
							</section>
						</li>
						<li class="c-order-wrap">
							<section>
								<span>999</span>
								<p>订单数</p>
							</section>
							<section class="c-middle-section">
								<span>6565.00</span>
								<p>销售额</p>
							</section>
							<section>
								<span>56%</span>
								<p>成交率</p>
							</section>
						</li>
						<li class="c-camera">

							<span class="c-left-eye"><img src="../assets/images/eye.png"/>摄像头</span>
							<span class="ml20">在线<span class="font23 color-g">2036</span>台</span>
							<span class="ml20">离线<span class="font23 color-e">7</span>台</span>
						</li>
					</ul>
				</div>
				<div class="c-middle">
					<div class="c-middle-div mb16">
						<h4 class="c-h4"><span>热门标签</span></h4>
						<table class="c-table">
							<tr>
								<th>标签</th>
								<th>次数</th>
							</tr>
							<tr>
								<td><img src="../assets/images/first.png" />黄金</td>
								<td>oo</td>
							</tr>
							<tr>
								<td><img src="../assets/images/second.png" />钻石</td>
								<td>oo</td>
							</tr>
							<tr>
								<td><img src="../assets/images/third.png" />项链</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>戒指</td>
								<td>oo</td>
							</tr>
						</table>
					</div>
					<div class="c-middle-div mb16">
						<h4 class="c-h4"><span>性别比例</span></h4>
						<data-view-sex :timeFlag="changeFlag" :timeing="timeingFlag" :chartData="guestParameters"></data-view-sex>
					</div>
					<div class="c-middle-div">
						<h4 class="c-h4"><span>年龄比例</span></h4>
						<data-view-age :timeFlag="changeFlag" :timeing="timeingFlag" :chartData="guestParameters"></data-view-age>
					</div>

				</div>
				<div class="c-right">
					<div class="c-right-div mb16">
						<h4 class="c-h4"><span>客流量排行</span></h4>
						<table class="c-table">
							<tr>
								<th>门店</th>
								<th>客流量</th>
							</tr>
							<tr>
								<td>
									<img src="../assets/images/first.png" />
									<span>上海南京路店</span>
								</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>
									<img src="../assets/images/second.png" />
									<span>杭州延安路店</span>
								</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>
									<img src="../assets/images/third.png" />
									<span>北京三里屯店</span>
								</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>深圳荒岛上</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>深施蒂利克上</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>十多个十多个</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>深时代光华</td>
								<td>oo</td>
							</tr>

						</table>
					</div>

					<div class="c-right-div">
						<h4 class="c-h4"><span>熟客占比</span></h4>
						<table class="c-table">
							<tr>
								<th>门店</th>
								<th>客流量</th>
							</tr>
							<tr>
								<td>
									<img src="../assets/images/first.png" />
									<span>上海南京路店</span>
								</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>
									<img src="../assets/images/second.png" />
									<span>杭州延安路店</span>
								</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>
									<img src="../assets/images/third.png" />
									<span>北京三里屯店</span>
								</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>深圳荒岛上</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>深施蒂利克上</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>十多个十多个</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>深时代光华</td>
								<td>oo</td>
							</tr>

						</table>
					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import DataViewLine from './DataViewLine';
	import DataViewSex from './DataViewSex';
	import DataViewAge from './DataViewAge';
	
	var t,c;
	
	export default {
		name: 'data-view',
		components: {
			DataViewLine,
			DataViewSex,
			DataViewAge
		},
		data() {
			return {
				isSelect: 'd',
				showTime: '',
				guestParameters: {
					begin_time: '',
					end_time: ''
				},
				changeFlag: true,
				timeingFlag:true
			}
		},
		created() {
			this.getBeginEndTime('d');
            this.rightTopTime();
		},
		mounted(){
			//右上角时间的定时器
		    t =	setInterval(()=> {
				this.rightTopTime();
			},1000);
			
			//刷新chart定时器
			c = setInterval(()=>{
				this.$data.timeingFlag = !this.$data.timeingFlag;
			},60000);
		},
		destroyed(){
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
				this.$data.changeFlag = !this.$data.changeFlag;
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
					case "d":
						this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`);
						this.$data.guestParameters.end_time = this.getS(`${y}/${m}/${d} 23:59:59`);
						break;
					case "w":
						if(weekd === 0) {
							weekd = 7
						};
						this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`) - 86400 * (weekd - 1);
						this.$data.guestParameters.end_time = this.getS(`${y}/${m}/${d} 23:59:59`) + 86400 * (7 - weekd);
						break;
					case "m":
						let nexty, nextm;
						m === 12 ? (nexty = y + 1, nextm = 1) : (nexty = y, nextm = m + 1)
						this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/01 00:00:00`);
						this.$data.guestParameters.end_time = this.getS(`${nexty}/${nextm}/01 00:00:00`) - 1;
						break;
					case "y":
						this.$data.guestParameters.begin_time = this.getS(`${y}/01/01 00:00:00`);
						this.$data.guestParameters.end_time = this.getS(`${y}/12/31 23:59:59`);
						break;
				}
			},
			//关闭全屏首页
			closeViewBox(){
				console.log("99")
			}
		}
	}
</script>

<style lang="scss" src="@/assets/css/dataView/DataView.scss">