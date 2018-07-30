<!-- 首页 -->
<template>
	<div class="statistics-page">
		<div class="top-box">
			<el-form :inline="true" class="demo-form-inline" size="mini">
				<el-form-item label="门店选择：" v-if="allStores && allStores.length>0">
					<el-select v-model="guestParameters.store_id" placeholder="门店选择">
						<el-option v-for="(item, idx) in allStores" :label="allStores[idx].name" :value="allStores[idx].id" :key="idx"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="时间选择：">
					<el-date-picker v-if="ctrlTimeType[0]" v-model="day" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<el-date-picker v-if="ctrlTimeType[1]" v-model="week" type="week" format="yyyy 第 WW 周" placeholder="选择周">
					</el-date-picker>
					<el-date-picker v-if="ctrlTimeType[2]" v-model="month" type="month" placeholder="选择月">
					</el-date-picker>
					<el-date-picker v-if="ctrlTimeType[3]" v-model="year" type="year" placeholder="选择年">
					</el-date-picker>
					<el-date-picker v-model="userDefined" v-if="ctrlTimeType[4]" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
			<el-form :inline="true" class="demo-form-inline" size="mini">
				<el-form-item label="数据选择：">
					<el-input readonly="readonly" placeholder="请选择数据" style="width: 220px;height: 28px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-edit" @click="selectData"></el-button>
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
		<el-dialog title="数据选择" :visible.sync="datadialog.dataDialogVisible">
			<el-row class="data-select">
				<el-button :type="datadialog.dataTypeShow === true ? 'primary' : ''" @click="dataSelect(1)">求和</el-button>
				<el-button :type="datadialog.dataTypeShow === false ? 'primary' : ''" @click="dataSelect(2)">对比</el-button>
			</el-row>
			<el-radio-group v-model="datadialog.summationType" @change="allOrSet" class="sum-cut" v-show="datadialog.radioShow">
				<el-radio label="1">全部</el-radio>
				<el-radio label="2">自定义</el-radio>
			</el-radio-group>

			<el-form :inline="true" v-show="datadialog.allOrSetShow" class="store-form">
				<template v-for="(val,index) in  datadialog.storeTotal">
					<el-form-item label="门店架构：" :label-width="datadialog.formLabelWidth">
						<el-input auto-complete="off" size="small"></el-input>
					</el-form-item>
					<el-form-item label="门店：" :label-width="datadialog.formLabelWidth">
						<el-input auto-complete="off" size="small"></el-input>
					</el-form-item>
				</template>
			</el-form>
			<div v-show="datadialog.allOrSetShow" class="add-store" @click="addStoreData">
				<el-button icon="el-icon-plus" size="small" circle></el-button><span>添加数据</span>
			</div>

			<span slot="footer" class="dialog-footer">
                   <el-button @click="cancelDialog">取 消</el-button>
                   <el-button type="primary" @click="datadialog.dataDialogVisible = false">确 定</el-button>
            </span>

		</el-dialog>

		<ul class="charts-type">
			<li class="charts-wrap">
				<div style="padding:10px 0 20px;text-align:center;">
					<el-radio-group v-model="chartShowType" size="small">
						<el-radio-button label="0">客流趋势</el-radio-button>
						<el-radio-button label="1">成交率</el-radio-button>
						<el-radio-button label="2">潜在客户流失率</el-radio-button>
						<el-radio-button label="3">成交客户</el-radio-button>
					</el-radio-group>
				</div>
				<guest-chart :guestData="guestData"></guest-chart>
				<el-radio-group v-model="chartOptionsType" class="el-radio-select">
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
			</li>
			<!--
            <li class="charts-wrap">
                <new-old-chart :newOldData="newOldData"></new-old-chart>
            </li>
            <li class="charts-wrap">
                <vip-chart :vipData="vipData"></vip-chart>
            </li>
            <li class="charts-wrap">
                <age-chart :ageData="ageData"></age-chart>
            </li>
            <li class="charts-wrap">
                <sex-chart :sexData="sexData"></sex-chart>
            </li>
            <li class="charts-wrap">
                <device-chart :deviceData="deviceData"></device-chart>
            </li>
            -->

		</ul>

		<el-table :data="tableData" style="width: 100%;" border :default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column type="index" :index="indexRank" label="排名" width="60" align="center">
			</el-table-column>
			<el-table-column prop="" label="名称" align="center">
			</el-table-column>
			<el-table-column prop="date" label="客流量" sortable align="center">
			</el-table-column>
			<el-table-column prop="date" label="新客占比" sortable width="110" align="center">
			</el-table-column>
			<el-table-column prop="date" label="熟客占比" sortable width="110" align="center">
			</el-table-column>
			<el-table-column prop="date" label="男性占比" sortable width="110" align="center">
			</el-table-column>
			<el-table-column prop="date" label="女性占比" sortable width="110" align="center">
			</el-table-column>
			<el-table-column prop="date" label="20岁以下占比" sortable width="135" align="center">
			</el-table-column>
			<el-table-column prop="date" label="20-29岁占比" sortable width="130" align="center">
			</el-table-column>
			<el-table-column prop="date" label="30-39岁占比" sortable width="130" align="center">
			</el-table-column>
			<el-table-column prop="date" label="40-49岁占比" sortable width="130" align="center">
			</el-table-column>
			<el-table-column prop="date" label="50-59岁占比" sortable width="130" align="center">
			</el-table-column>
			<el-table-column prop="date" label="60岁以上占比" sortable width="135" align="center">
			</el-table-column>
		</el-table>

	</div>
</template>

<script src="@/assets/js/guest/Statistics.js"></script>

<style lang="scss" scoped src="@/assets/css/guest/Statistics.scss">