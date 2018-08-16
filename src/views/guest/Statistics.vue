<!-- 首页 -->
<template>
	<div class="statistics-page">
		<div class="top-box">
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
					<el-date-picker v-show="ctrlTimeType[4]" v-model="userDefined" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptionsSet">
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
			<el-form :inline="true" class="demo-form-inline" size="mini">
				<el-form-item label="数据选择：">
					<el-input readonly="readonly" v-model="selectType" placeholder="请选择数据" style="width: 220px;height: 28px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-edit" @click="editSumDiff"></el-button>
				</el-form-item>
			</el-form>
			<el-tabs v-model="timeType" type="card" @tab-click="changeTimeType">
				<el-tab-pane label="日统计" name="day"></el-tab-pane>
				<el-tab-pane label="周统计" name="week"></el-tab-pane>
				<el-tab-pane label="月统计" name="month"></el-tab-pane>
				<el-tab-pane label="年统计" name="year"></el-tab-pane>
				<el-tab-pane label="自定义统计" name="userDefined"></el-tab-pane>
			</el-tabs>
		</div>

		<!--数据选择弹框-->
		<el-dialog title="数据选择" :visible.sync="datadialog.dataDialogVisible" :before-close="closeDialog">
			<el-row class="data-select">
				<el-button :type="datadialog.dataTypeShow === true ? 'primary' : ''" @click="dataSelect(1)">求和</el-button>
				<el-button :type="datadialog.dataTypeShow === false ? 'primary' : ''" @click="dataSelect(2)">对比</el-button>
			</el-row>
			<el-radio-group v-model="datadialog.summationType" @change="allOrSet" class="sum-cut" v-show="datadialog.radioShow">
				<el-radio label="1">全部</el-radio>
				<el-radio label="2">自定义</el-radio>
			</el-radio-group>
			<ul v-show="datadialog.allOrSetShow" class="store-form">
				<li v-for="(val,index) in  storeGroup">
					<span>门店组织：</span>
					<el-cascader size="small" :options="organizes" v-model="val.organizeId" :props="defaultAttr" @change="getStoreId(index)">
					</el-cascader>
					<span class="store">门店：</span>
					<el-select style="width: 180px;" size="small" placeholder="请选择" v-model="val.storeId" :no-data-text="val.showText">
						<el-option v-for="(val,idx) in storeGroup[index].stores" :label="val.name" :value="val.id" :key="idx">
						</el-option>
					</el-select>
					<el-button :disabled="datadialog.canDel" @click="delStore(index)" style="margin-left: 10px;" size="small" plain>删除</el-button>
				</li>
				<li class="add-store" v-show="storeGroup.length < 3 || datadialog.dataTypeShow === true" @click="addStoreData">
					<el-button icon="el-icon-plus" size="mini" circle></el-button><span>添加数据</span>
				</li>
			</ul>

			<span slot="footer" class="dialog-footer">
                   <el-button @click="cancelDialog">取 消</el-button>
                   <el-button type="primary" @click="setSubmit">确 定</el-button>
            </span>
		</el-dialog>

		<ul class="charts-type">
			<li class="charts-wrap">
				<div style="padding:10px 0 20px;text-align:center;">
					<el-radio-group v-model="statisticsType" @change="customerClass" size="small">
						<el-radio-button label="1">客流趋势</el-radio-button>
						<el-radio-button label="2">成交率</el-radio-button>
						<el-radio-button label="3">潜在客户流失率</el-radio-button>
						<el-radio-button label="4">成交客户流失率</el-radio-button>
					</el-radio-group>
				</div>
				<guest-chart :sumOrDiff="sumOrDiff" :changeFlag="changeFlag" :postVal="guestParameters" :statisticsType="statisticsType"></guest-chart>
			</li>
			<template v-if="sumOrDiff === '0'">
				<li v-show="statisticsType === '1'" class="charts-wrap">
					<new-old-chart :sumOrDiff="sumOrDiff" :newOldData="guestParameters" :changeFlag="changeFlag"></new-old-chart>
				</li>
				<li v-show="statisticsType === '1'" class="charts-wrap">
					<age-chart :sumOrDiff="sumOrDiff" :ageData="guestParameters" :changeFlag="changeFlag"></age-chart>
				</li>
				<li v-show="statisticsType === '1'" class="charts-wrap">
					<sex-chart :sumOrDiff="sumOrDiff" :sexData="guestParameters" :changeFlag="changeFlag"></sex-chart>
				</li>
			</template>
			<template v-else>				
				<li v-show="statisticsType === '1'" class="charts-wrap">
					<column-new-chart :sumOrDiff="sumOrDiff" :columnNew="guestParameters" :changeFlag="changeFlag"></column-new-chart>
				</li>
				<li v-show="statisticsType === '1'" class="charts-wrap">
					<column-age-chart :sumOrDiff="sumOrDiff" :columnAge="guestParameters" :changeFlag="changeFlag"></column-age-chart>
				</li>
				<li v-show="statisticsType === '1'" class="charts-wrap">
					<column-sex-chart :sumOrDiff="sumOrDiff" :columnSex="guestParameters" :changeFlag="changeFlag"></column-sex-chart>
				</li>
			</template>
		</ul>

		<template v-if="statisticsType === '1'">
			<el-table :data="tableData" stripe v-loading="loading" style="width: 100%;" border @sort-change="changeSort">
				<el-table-column type="index" :index="indexRank" label="排名" width="60" align="center">
				</el-table-column>
				<el-table-column prop="name" label="名称" align="center">
				</el-table-column>
				<el-table-column prop="customer" label="客流量" sortable="custom" align="center">
				</el-table-column>
				<el-table-column prop="new" label="新客占比" sortable="custom" width="110" align="center">
				</el-table-column>
				<el-table-column prop="old" label="熟客占比" sortable="custom"="custom" width="110" align="center">
				</el-table-column>
				<el-table-column prop="men" label="男性占比" sortable="custom" width="110" align="center">
				</el-table-column>
				<el-table-column prop="women" label="女性占比" sortable="custom" width="110" align="center">
				</el-table-column>
				<el-table-column prop="0-20" label="20岁以下占比" sortable="custom" width="135" align="center">
				</el-table-column>
				<el-table-column prop="20-29" label="20-29岁占比" sortable="custom" width="130" align="center">
				</el-table-column>
				<el-table-column prop="30-39" label="30-39岁占比" sortable="custom" width="130" align="center">
				</el-table-column>
				<el-table-column prop="40-49" label="40-49岁占比" sortable="custom" width="130" align="center">
				</el-table-column>
				<el-table-column prop="50-59" label="50-59岁占比" sortable="custom" width="130" align="center">
				</el-table-column>
				<el-table-column prop="60-" label="60岁以上占比" sortable="custom" width="135" align="center">
				</el-table-column>
			</el-table>
			<div style="margin:0 auto;max-width:1551px; text-align: right;">
				<el-pagination background class="pagination" layout="prev, pager, next" small @current-change="currentPage" :current-page="pagination.currentPage" :page-size="listParameters.page_size" :page-count="pagination.totalCount">
				</el-pagination>
			</div>
		</template>
	</div>
</template>

<script src="@/assets/js/guest/Statistics.js"></script>

<style lang="scss" scoped src="@/assets/css/guest/Statistics.scss">