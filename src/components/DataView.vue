<template>
	<div class="viewBg">
		<div class="view-box">
			<span class="closeViewBox" @click="closeViewBox"></span>
			<el-row type="flex" justify="space-between">
				<el-col :span="4">
					<img src="../assets/images/logo.png" />
					<img src="../assets/images/logoname.png" />
				</el-col>
				<el-col :span="16">
					<div class="title-box">
						<span class="all-year">全年累计客流量<span class="all-data">{{briefingData.yearly.total_ct | numThousand}}</span><span class="all-font">人</span></span>
                        
                        <!--增长暂时隐藏-->
						<!--<span v-if="briefingData.yearly.total_change == 1" class="title-rise">同比增长<span class="color-f">{{briefingData.yearly.total_rate}}</span></span>
						<span v-if="briefingData.yearly.total_change == 0" class="title-rise" v-else>同比下降<span class="color-g">{{briefingData.yearly.total_rate}}</span></span>-->
					</div>
				</el-col>
				<el-col :span="4">
					<p class="title-time">
						<i class="el-icon-time"></i>
						<span>{{showTime | date(4)}}</span>
					</p>
				</el-col>
			</el-row>

			<ul class="t-select" @mouseover="enterFlag" @mouseout="outFlag">
				<li :class="isSelect === 'day' ? 't-active' : ''" @click="selectTime('day')">今日</li>
				<li :class="isSelect === 'week' ? 't-active' : ''" @click="selectTime('week')">本周</li>
				<li :class="isSelect === 'month' ? 't-active' : ''" @click="selectTime('month')">本月</li>
				<li :class="isSelect === 'year' ? 't-active' : ''"  @click="selectTime('year')">本年</li>
			</ul>

			<div class="c-wrap">
				<div class="c-left">
					<ul class="c-left-ul">
						<li>
							<section>
								<data-view-line :lineFlag="lineFlag" :chartData="guestParameters"></data-view-line>
							</section>
							<section class="c-left-chart-bottom">
								<p>
									<span class="font16">客流</span><br />
								    <span class="font25 color-e">{{briefingData.keliu.total_ct | hundredMillion}}</span><br />
									<span v-if="briefingData.keliu.total_change == 1"  class="font13">对比{{rateFont}}同期上升<span class="color-f">{{briefingData.keliu.total_rate}}</span></span>
									<span v-else-if="briefingData.keliu.total_change == 0"  class="font13">对比{{rateFont}}同期持平</span>
									<span v-else-if="briefingData.keliu.total_change == -1"  class="font13">对比{{rateFont}}同期下降<span class="color-g">{{briefingData.keliu.total_rate}}</span></span>
								</p>
								<p class="ml20">
									<span class="font16">新客</span><br />
									<span class="font25 color-e">{{briefingData.keliu.new_ct | hundredMillion}}</span><br />
									<span v-if="briefingData.keliu.new_change == 1" class="font13">对比{{rateFont}}同期上升<span class="color-f">{{briefingData.keliu.new_rate}}</span></span>
									<span v-else-if="briefingData.keliu.new_change == 0" class="font13">对比{{rateFont}}同期持平</span>
								    <span v-else-if="briefingData.keliu.new_change == -1" class="font13">对比{{rateFont}}同期下降<span class="color-g">{{briefingData.keliu.new_rate}}</span></span>
								</p>
								<p class="ml20">
									<span class="font16">熟客</span><br />
									<span class="font25 color-e">{{briefingData.keliu.old_ct | hundredMillion}}</span><br />
									<span v-if="briefingData.keliu.old_change == 1" class="font13">对比{{rateFont}}同期上升<span class="color-f">{{briefingData.keliu.old_rate}}</span></span>
									<span v-else-if="briefingData.keliu.old_change == 0" class="font13">对比{{rateFont}}同期持平</span>
								    <span v-else-if="briefingData.keliu.old_change == -1" class="font13">对比{{rateFont}}同期下降<span class="color-g">{{briefingData.keliu.old_rate}}</span></span>
								</p>
							</section>
						</li>
						<li class="c-order-wrap">
							<section>
								<span>{{briefingData.order.order_ct | hundredMillion}}</span>
								<p>订单人数</p>
							</section>
							<section class="c-middle-section">
								<span>{{briefingData.order.sales_volume | hundredMillion}}</span>
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
								<tr v-if="briefingData.tag_list !== null" v-for="(item,index) in briefingData.tag_list" :key="index">
									<td v-if="index === 0"><img src="../assets/images/first.png" /><span class="c-tag-space">{{item.name}}</span></td>
									<td v-else-if="index === 1"><img src="../assets/images/second.png" /><span class="c-tag-space">{{item.name}}</span></td>
									<td v-else-if="index === 2"><img src="../assets/images/third.png" /><span class="c-tag-space">{{item.name}}</span></td>
									<td v-else><span class="c-tag-space">{{item.name}}</span></td>
									<td>{{item.ct}}</td>
								</tr>
							</tbody>
						</table>
						<div v-if="briefingData.tag_list == null" class="c-table-no-data">暂无数据</div>
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
								<tr v-if="briefingData.flow_list !== null" v-for="(item,index) in briefingData.flow_list" :key="index">
									<td v-if="index === 0"><img src="../assets/images/first.png" /><span>{{item.name}}</span></td>
									<td v-else-if="index === 1"><img src="../assets/images/second.png" /><span>{{item.name}}</span></td>
									<td v-else-if="index === 2"><img src="../assets/images/third.png" /><span>{{item.name}}</span></td>
									<td v-else>{{item.name}}</td>
									<td>{{item.ct}}</td>
								</tr>
							</tbody>
						</table>
						<div v-if="briefingData.flow_list == null" class="c-table-no-data2">暂无数据</div>
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
								<tr v-if="briefingData.old_list !== null" v-for="(item,index) in briefingData.old_list" :key="index">
									<td v-if="index === 0"><img src="../assets/images/first.png" /><span>{{item.name}}</span></td>
									<td v-else-if="index === 1"><img src="../assets/images/second.png" /><span>{{item.name}}</span></td>
									<td v-else-if="index === 2"><img src="../assets/images/third.png" /><span>{{item.name}}</span></td>
									<td v-else>{{item.name}}</td>
									<td>{{item.ct}}</td>
								</tr>
							</tbody>

						</table>
						<div v-if="briefingData.old_list == null" class="c-table-no-data2">暂无数据</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>
<script src="@/assets/js/components/DataView.js"></script>

<style lang="scss" src="@/assets/css/dataView/DataView.scss">