<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()">创建门店</el-button>
		</div>

		<el-form :inline="true"  size="mini">
			<el-form-item label="门店架构：">
				<el-cascader :options="organizes"  :props='defaultAttr' v-model='lookData.organize' @change="getStore">
				</el-cascader>
			</el-form-item>
			<el-form-item label="门店：">
				<el-select v-model="lookData.store_id" placeholder="请选择" :no-data-text="nodatatext">
					<el-option v-for="(item,index) in selectStore " :key="index" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="lookSubmit">查询</el-button>
				<el-button type="primary" @click="fnReset">重置</el-button>
			</el-form-item>
		</el-form>

		<table width="90%" class="table-bordered">
			<thead style="background-color: #d1d1d1">
				<tr height="50">
					<th class="col-md-1 text-center">序号</th>
					<th class="col-md-2 text-center">门店名</th>
					<th class="col-md-4 text-center">门店架构</th>
					<th class="col-md-3 text-center">省市区</th>
					<th class="col-md-2 text-center">操作</th>
				</tr>
			</thead>
			<tbody style="text-align: center">
				<template v-if='tableData.length > 0'>
					<tr v-for="(item,index) in tableData" :key="index" height="40px">
						<td>{{(pagination.currentPage - 1) * 20 + index + 1 }}</td>
						<td>{{item.name}}</td>
						<td>{{item.organizes.name}}</td>
						<td>{{item.province.name + item.city.name + item.area.name}}</td>
						<td>
							<el-button type="primary" size="mini" circle plain icon="el-icon-more" @click="fnGoPage(item)"></el-button>
							<el-button type="warning" size="mini" circle plain icon="el-icon-edit" @click="fnEdit(item)"></el-button>
							<el-button type="danger" size="mini" circle plain icon="el-icon-delete" @click="fnRemove(item)"></el-button>

						</td>
					</tr>
				</template>
				<tr v-else>
					<td colspan="6" height="50">暂无数据</td>
				</tr>
			</tbody>
		</table>
		<!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;width:701px;">
			<el-pagination background class="pagination" layout="prev, pager, next" small @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="requestParameters.page_size" :total="pagination.totalCount">
			</el-pagination>
		</div>

		<!-- 添加、修改 -->
		<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="closeClear">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="门店名称：" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="门店架构：" prop='merchant_organize_id'>
					<el-cascader :options="organizes" :props='defaultAttr' v-model='ruleForm.merchant_organize_id'></el-cascader>
				</el-form-item>
				<el-form-item label="省/市/区：" prop='locate'>
					<el-cascader :options="cityData" v-model="ruleForm.locate" :props="props">
					</el-cascader>
				</el-form-item>
				<el-form-item label="详细地址：" prop="address">
					<el-input v-model="ruleForm.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script src="@/assets/js/store/Store.js"></script>
<style lang="scss" scoped src="@/assets/css/store/Store.scss">
