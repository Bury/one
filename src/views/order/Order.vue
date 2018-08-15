<template>
	<div class="guest-list-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
				<el-form-item label="门店架构：">
					<el-cascader v-model="organizeCode" :options="organizes" :props='defaultAttr' @change="getStore">
					</el-cascader>
				</el-form-item>
				<el-form-item label="门店：">
					<el-select v-model="requestParameters.store_id" placeholder="请选择" :no-data-text="nodatatext">
						<el-option v-for="(item,index) in selectStore" :key="index" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="订单编号：">
					<el-input v-model="requestParameters.sn"></el-input>
				</el-form-item>
				<el-form-item label="材质：">
					<el-select v-model="requestParameters.material" placeholder="请选择材质">
						<el-option label="全部" value="">全部</el-option>
						<el-option v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="款式：">
					<el-select v-model="requestParameters.style" placeholder="请选择款式">
						<el-option label="全部" value="">全部</el-option>
						<el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="金额：">
					<el-col :span="11">
						<el-input v-model="requestParameters.price_start"></el-input>
					</el-col>
					<el-col class="line" :span="2" align="center">-</el-col>
					<el-col :span="11">
						<el-input v-model="requestParameters.price_end"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="收银时间：">
					<el-date-picker :picker-options="pickerOptionsSet" v-model="cashTimes" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="创建时间：">
					<el-date-picker :picker-options="pickerOptionsSet" v-model="createdTimes" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="primary" @click="resetForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
		<table width="99%" class="table-bordered">
			<thead style="background-color: #d1d1d1">
				<tr height="40">
					<th class="col-md-1 text-center">序号</th>
					<th class="col-md-1 text-center">订单编号</th>
					<th class="col-md-1 text-center">商品名称</th>
					<th class="col-md-1 text-center">成交金额</th>
					<th class="col-md-2 text-center">客户</th>
					<th class="col-md-1 text-center">门店</th>
					<th class="col-md-2 text-center">收银时间</th>
					<th class="col-md-2 text-center">创建时间</th>
					<th class="col-md-1 text-center">操作</th>
				</tr>
			</thead>
			<tbody v-if="tableData.length > 0" style="text-align: center">
				<tr v-for="(item,index) in tableData" :key="index" height="40">
					<td>{{item.id}}</td>
					<td>{{item.sn}}</td>
					<td>
						<span v-for="good in item.orderGoods" class="margin">[{{good.material_name}}/{{good.style_name}}]</span>
					</td>
					<td>{{item.price | numberFilter}}</td>
					<td>
						<div style="width: 100%;display: flex;padding: 5%;">
							<div style="width:45%;">
								<img :src="item.traffic.avatar" style="width:100%;">
							</div>
							<div style="width:55%;padding:5% 0 0 8%;text-align:left">
								ID:{{item.traffic.customer_id}}<br/> 姓名:{{item.customer_name}}
								<br/> 类型:{{item.traffic.is_new == 0 ? "新客" : "熟客"}}
							</div>
						</div>
					</td>
					<td>{{item.store_name}}</td>
					<td>{{item.cash_t | date(4)}}</td>
					<td>{{item.created_at | date(4)}}</td>
					<td>
						<el-button @click="fnView(item)" type="text" size="small">查看</el-button>
						<el-button @click="fnRemove(item)" type="text" size="small">删除</el-button>
					</td>
				</tr>
			</tbody>
			<tbody v-else style="text-align: center">
				<tr>
					<td colspan="9" height="50">暂无数据</td>
				</tr>
			</tbody>
		</table>

		<div class="noData" v-if="noData" style="text-align: center;margin-top:2rem;font-size: 1.4rem;">暂无数据~</div>
		<!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;max-width:1551px;">
			<el-pagination background class="pagination" layout="prev, pager, next" small @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="requestParameters.page_size" :total="pagination.totalCount">
			</el-pagination>
		</div>
		<!--查看-->
		<el-dialog title="查看" :visible.sync="viewVisible">
			<el-form :model='editForm' ref="editForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="收银时间：">
					<el-date-picker disabled v-model="editForm.cash" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="人脸编号：">
					<el-row>
						<el-col :span='10'>
							<el-input v-model="editForm.traffic.customer_id" disabled></el-input>
						</el-col>
					</el-row>
					<el-form-item>
						<div style="width:200px;height:200px;border:1px solid #eee;margin:40px 0;">
							<template>
								<img :src="editForm.traffic.avatar" style="display:block;margin:0 auto;width:100%;" @click="imgView($event)">
							</template>
						</div>
					</el-form-item>
				</el-form-item>
				<div v-for="(item,index) in editForm.orderGoods" :key="index" v-if="editForm.orderGoods">
					<el-row>
						<el-col :span='7'>
							<el-form-item label="材质：" prop="material" label-width="60px">
								<el-select v-model='item.material' disabled>
									<el-option v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span='7'>
							<el-form-item label="款式：" prop="style" label-width="60px">
								<el-select v-model="item.style" disabled>
									<el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span='7'>
							<el-form-item label='成交金额：'>
								<p class="numberPrice">{{item.price | numberFilter}}</p>
								<!--<el-input v-model='' v-on:input='editInputFun()' disabled></el-input>-->
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<div class="totalAll">
					<p>共计
						<input v-model='editAllNum' class='totalNumber' :disabled='true' prop="editAllNum" />件,总价
						<strong class='totalPrice'>{{editForm.price | numberFilter}}</strong>元
					</p>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="viewClose()">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script src="@/assets/js/order/order.js"></script>
<style lang="scss" scoped>
	.el-table thead {
		color: #333;
	}
	
	.el-pagination {
		margin: 10px;
		float: right;
	}
	
	.numberPrice {
		border: 1px solid #e4e7ed;
		height: 3.5rem;
		width: 8rem;
		background-color: #f5f7fa;
		border-radius: 3px;
		text-align: center;
		color: #606266;
		line-height: 3rem;
	}
	
	.totalAll {
		overflow: hidden;
		P {
			float: right;
			font-weight: 700;
			.totalNumber,
			.totalPrice {
				display: inline-block;
				padding: 0;
				margin: 0 3px;
				width: 100px;
				height: 40px;
				line-height: 40px;
				border-radius: 3px;
				border: 0;
				background: #eee;
				border: 1px solid #999;
				text-align: center;
			}
		}
	}
</style>