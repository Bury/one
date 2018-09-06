<template>
	<div id="viewBg">
		<div class="view-box">
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
						<span>20180819 22:45:50</span>
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
								<data-view-line></data-view-line>
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
								<td><img src="../assets/images/first.png"/>黄金</td>
								<td>oo</td>
							</tr>
							<tr>
								<td><img src="../assets/images/second.png"/>钻石</td>
								<td>oo</td>
							</tr>
							<tr>
								<td><img src="../assets/images/third.png"/>项链</td>
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
						
					</div>
					<div class="c-middle-div">
						<h4 class="c-h4"><span>年龄比例</span></h4>
						
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
								  <img src="../assets/images/first.png"/>
								  <span>上海南京路店</span>
								</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>
									<img src="../assets/images/second.png"/>
								     <span>杭州延安路店</span>
								</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>
									<img src="../assets/images/third.png"/>
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
								  <img src="../assets/images/first.png"/>
								  <span>上海南京路店</span>
								</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>
									<img src="../assets/images/second.png"/>
								     <span>杭州延安路店</span>
								</td>
								<td>oo</td>
							</tr>
							<tr>
								<td>
									<img src="../assets/images/third.png"/>
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
	export default {
		name: 'data-view',	
		components:{
			DataViewLine
		},
		data() {
			return {
				isSelect: 'y',
				
			}
		},
		created() {
			
		},
		mounted(){
			
		},
		methods: {
			selectTime(val) {
				console.log(val)
			},
			
		}
	}
</script>

<style lang="scss" src="@/assets/css/dataView/DataView.scss">