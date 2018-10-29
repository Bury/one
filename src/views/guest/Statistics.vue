
  <!-- 首页 -->
<template>
	<div class="statistics-page">
		<div class="top-box top-box-time">
			<el-tabs v-model="timeType" type="card" @tab-click="changeTimeType">
				<el-tab-pane label="日统计" name="day"></el-tab-pane>
				<el-tab-pane label="周统计" name="week"></el-tab-pane>
				<el-tab-pane label="月统计" name="month"></el-tab-pane>
				<el-tab-pane label="年统计" name="year"></el-tab-pane>
				<el-tab-pane label="自定义统计" name="userDefined"></el-tab-pane>
			</el-tabs>
			<el-form :inline="true" class="demo-form-inline" size="mini">
				<el-form-item label="时间选择：">
					<el-date-picker v-show="ctrlTimeType[0]" v-model="day" type="date" placeholder="选择日期时间" :picker-options="pickerOptionsSet">
					</el-date-picker>
					<el-date-picker v-show="ctrlTimeType[1]" v-model="week" type="week" format="yyyy 第 WW 周" placeholder="选择周" :picker-options="pickerOptionsSet">
					</el-date-picker>
					<el-date-picker v-show="ctrlTimeType[2]" v-model="month" type="month" placeholder="选择月" :picker-options="pickerOptionsSet">
					</el-date-picker>
					<el-date-picker v-show="ctrlTimeType[3]" v-model="year" type="year" placeholder="选择年" :picker-options="pickerOptionsSet">
					</el-date-picker>
					<el-date-picker :picker-options="pickerOptionsSet" v-model="times_start" v-show="ctrlTimeType[4]" type="date" placeholder="开始时间" :clearable=false>
					</el-date-picker>
					<span v-show="ctrlTimeType[4]">-</span>
					<el-date-picker :picker-options="pickerOptionsSet" v-model="times_end" v-show="ctrlTimeType[4]" type="date" placeholder="结束时间" :clearable=false>
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button plain size="mini" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
			<el-form class="demo-form-inline" size="mini">
				<el-form-item label="模式选择：">
					<el-radio-group v-model="pattern" @change="patternSelect">
						<el-radio label="1">门店数据汇总</el-radio>
						<el-radio label="2">门店数据对比</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="范围选择：">
					<button class="yy-button yy-btn-mini yy-btn-checked" @click.prevent="editSumDiff">{{selectType}}</button>
				</el-form-item>
			</el-form>

		</div>

		<!--数据选择弹框-->
		<el-dialog title="门店选择" width="960px" :visible.sync="datadialog.dataDialogVisible" :before-close="closeDialog">
			<!--<el-row class="data-select">
				<el-button :type="datadialog.dataTypeShow === true ? 'primary' : ''" @click="dataSelect(1)">汇总</el-button>
				<el-button :type="datadialog.dataTypeShow === false ? 'primary' : ''" @click="dataSelect(2)">对比</el-button>
			</el-row>-->
			<div class="sum-cut" v-show="datadialog.radioShow">
				<el-radio-group v-model="datadialog.summationType" @change="allOrSet">
					<el-radio label="1">全部</el-radio>
					<el-radio label="2">自定义</el-radio>
				</el-radio-group>
			</div>

			<ul v-show="datadialog.allOrSetShow" class="store-form">
				<li v-for="(val,index) in  storeGroup" :key="index">
					<span>门店架构：</span>
					<el-cascader size="small" :options="organizes" change-on-select v-model="val.organizeId" :props="defaultAttr" @change="getStoreId(index)">
					</el-cascader>
					<span class="store">门店：</span>
					<el-select style="width: 180px;" size="small" placeholder="请选择" v-model="val.storeId" :no-data-text="val.showText">
						<el-option v-for="(val,idx) in storeGroup[index].stores" :label="val.name" :value="val.id" :key="idx">
						</el-option>
					</el-select>
					<el-button :disabled="datadialog.canDel" @click="delStore(index)" style="margin-left: 10px;" size="small" plain>删除</el-button>
				</li>
				<li class="add-store" v-show="storeGroup.length < 3 || pattern === '1'" @click="addStoreData">
					<el-button icon="el-icon-plus" size="mini" circle></el-button><span>添加数据</span>
				</li>
			</ul>

			<span slot="footer" class="dialog-footer">
                   <el-button size="mini" @click="cancelDialog">取 消</el-button>
                   <el-button size="mini" @click="setSubmit">确 定</el-button>
            </span>
		</el-dialog>

		<div v-show="customShow">
			<ul class="charts-type">
				<li class="charts-wrap cwA">
					<section v-if="sumOrDiff === '0'">
						<div class="sumTop">
						   <h5>到店人数</h5>
						   <span style="font-family: numFont">{{goStoreSum[0].passenger_flow}}</span>
						</div>
						<ul class="sumBottom">
							<li style="width: 30%;">
								<span style="font-family: numFont">{{goStoreSum[0].sales_singular}}</span>
								<p>订单人数</p>
							</li>
							<li style="width: 40%;">
								<span style="font-family: numFont">{{goStoreSum[0].sales_volume | hundredMillion}}</span>
								<p>销售额</p>
							</li>
							<li style="width: 30%;">
								<span style="font-family: numFont">{{goStoreSum[0].turnover_rate}}</span>
								<p>成交率</p>
							</li>
						</ul>
					</section>

					<section v-if="sumOrDiff === '1'">
						<table class="diffTable">
							<tr>
								<th>店名</th>
								<th>到店人数</th>
								<th>订单人数</th>
								<th>销售额</th>
								<th>成交率</th>
							</tr>
							<tr   v-for="(item,index) in goStoreSum">
								<td>{{item.name}}</td>
								<td>{{item.passenger_flow}}</td>
								<td>{{item.sales_singular}}</td>
								<td>{{item.sales_volume | hundredMillion}}</td>
								<td>{{item.turnover_rate}}</td>
							</tr>
						</table>
					</section>
				</li>
				<li class="charts-wrap cwB">
					<h4 class="title-guest-chart">客流统计</h4>
					<div style="padding:10px 0 12px;text-align:center;">

						<el-radio-group v-model="statisticsType" @change="customerClass" size="small">
							<el-radio-button label="1" onclick="clickTotal('301','客流趋势',1)">客流趋势</el-radio-button>
							<el-radio-button label="2" onclick="clickTotal('302','成交率',1)">成交率</el-radio-button>
							<el-radio-button label="3" onclick="clickTotal('303','潜在客户流失率',1)">潜在客户流失率</el-radio-button>
							<el-radio-button label="4" onclick="clickTotal('304','成交客户流失率',1)">成交客户流失率</el-radio-button>
						</el-radio-group>
					</div>
					<guest-chart :sumOrDiff="sumOrDiff" :changeFlag="changeFlag" :postVal="guestParameters" :statisticsType="statisticsType"></guest-chart>
				</li>
				<template v-if="sumOrDiff === '0'">
					<li v-show="statisticsType === '1'" class="charts-wrap cwColumnPie">
						<h4 class="title-guest-chart">新客熟客占比</h4>
						<new-old-chart :sumOrDiff="sumOrDiff" :newOldData="guestParameters" :changeFlag="changeFlag"></new-old-chart>
					</li>
					<li v-show="statisticsType === '1'" class="charts-wrap cwColumnPie">
						<h4 class="title-guest-chart">年龄段占比</h4>
						<age-chart :sumOrDiff="sumOrDiff" :ageData="guestParameters" :changeFlag="changeFlag"></age-chart>
					</li>
					<li v-show="statisticsType === '1'" class="charts-wrap cwColumnPie">
						<h4 class="title-guest-chart">性别占比</h4>
						<sex-chart :sumOrDiff="sumOrDiff" :sexData="guestParameters" :changeFlag="changeFlag"></sex-chart>
					</li>
				</template>
				<template v-else>
					<li v-show="statisticsType === '1'" class="charts-wrap cwColumnPie">
						<h4 class="title-guest-chart">新客熟客占比</h4>
						<column-new-chart :sumOrDiff="sumOrDiff" :columnNew="guestParameters" :changeFlag="changeFlag"></column-new-chart>
					</li>
					<li v-show="statisticsType === '1'" class="charts-wrap cwColumnPie">
						<h4 class="title-guest-chart">年龄段占比</h4>
						<column-age-chart :sumOrDiff="sumOrDiff" :columnAge="guestParameters" :changeFlag="changeFlag"></column-age-chart>
					</li>
					<li v-show="statisticsType === '1'" class="charts-wrap cwColumnPie">
						<h4 class="title-guest-chart">性别占比</h4>
						<column-sex-chart :sumOrDiff="sumOrDiff" :columnSex="guestParameters" :changeFlag="changeFlag"></column-sex-chart>
					</li>
				</template>
			</ul>

			<div class="bottomTable" v-if="statisticsType === '1'">
				<h4 class="title-guest-chart">客流列表</h4>
				<el-table :data="tableData" stripe v-loading="loading" style="width: 100%;margin-top: 30px;" border @sort-change="changeSort">
					<el-table-column type="index" :index="indexRank" label="排名" width="60" align="center">
					</el-table-column>
					<el-table-column prop="name" label="名称" align="center">
					</el-table-column>
					<el-table-column prop="customer" label="总客流" sortable="custom" width="110" align="center">
					</el-table-column>
					<el-table-column prop="new" label="新客占比" :formatter="formatterVal" sortable="custom" width="110" align="center">
					</el-table-column>
					<el-table-column prop="old" label="熟客占比" :formatter="formatterVal" sortable="custom" width="110" align="center">
					</el-table-column>
					<el-table-column prop="men" label="男性占比" :formatter="formatterVal" sortable="custom" width="110" align="center">
					</el-table-column>
					<el-table-column prop="women" label="女性占比" :formatter="formatterVal" sortable="custom" width="110" align="center">
					</el-table-column>
					<el-table-column prop="0-20" label="20岁以下占比" :formatter="formatterVal" sortable="custom" width="135" align="center">
					</el-table-column>
					<el-table-column prop="20-29" label="20-29岁占比" :formatter="formatterVal" sortable="custom" width="130" align="center">
					</el-table-column>
					<el-table-column prop="30-39" label="30-39岁占比" :formatter="formatterVal" sortable="custom" width="130" align="center">
					</el-table-column>
					<el-table-column prop="40-49" label="40-49岁占比" :formatter="formatterVal" sortable="custom" width="130" align="center">
					</el-table-column>
					<el-table-column prop="50-59" label="50-59岁占比" :formatter="formatterVal" sortable="custom" width="130" align="center">
					</el-table-column>
					<el-table-column prop="60-" label="60岁以上占比" :formatter="formatterVal" sortable="custom" width="135" align="center">
					</el-table-column>
				</el-table>
				<div style="text-align: center;">
					<el-pagination class="pagination" layout="prev, pager, next" small @current-change="currentPage" :current-page="pagination.currentPage" :page-size="listParameters.page_size" :page-count="pagination.totalCount">
					</el-pagination>
				</div>
			</div>
		</div>
		<div v-show="customShow === false" style="text-align: center;padding-top: 20px;">请选择时间</div>
	</div>
</template>

<script src="@/assets/js/guest/Statistics.js"></script>

<style lang="scss" scoped src="@/assets/css/guest/Statistics.scss">
