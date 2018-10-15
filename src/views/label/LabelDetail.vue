<template>
	<div class="label-detail-page">
		<div class="top-box">
			<el-button plain size="mini" class="add-btn1" @click="fnGoback()">返回</el-button>
		</div>
		<div class="saveBox">
			<el-button plain size="mini" @click="saveSelectTag" onclick="clickTotal('407','来客标签保存',1)">保存</el-button>
		</div>
		<table width="60%" class="yingyanTable">
			<thead>
				<tr height="50">
					<th class="col-md-2 text-center">选择</th>
					<th class="col-md-2 text-center">序号</th>
					<th class="col-md-2 text-center">排序</th>
					<th class="col-md-3 text-center">标签类名</th>
					<th class="col-md-3 text-center">操作</th>
				</tr>
			</thead>
			<tbody v-if="tableData.length > 0" style="text-align: center">
				<tr v-for="(item,index) in tableData" :key="index" height="50">
					<td>
						<el-checkbox :checked="item.selected === 0 ? false : true" @change="selectBox($event,item.id)"></el-checkbox>
					</td>
					<td>{{(pagination.currentPage - 1) * 20 + index + 1 }}</td>
					<td>{{item.sort}}</td>
					<td>{{item.name}}</td>
					<td>
						<i class="newI color1 el-icon-yy-Group-" @click="fnEdit(item)"></i>
					</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr>
					<td colspan="5" align="center" height="50px">暂无数据</td>
				</tr>
			</tbody>
		</table>

		<!-- 分页 -->
		<div v-if="tableData.length > 0"  class="paginationBox">
			<el-pagination class="pagination" layout="prev, pager, next" small @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="requestParameters.page_size" :total="pagination.totalCount">
			</el-pagination>
		</div>

		<!-- 添加、修改 -->
		<el-dialog center :title="dialogTitle" :visible.sync="dialogFormVisible">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="排序：" prop="sort">
					<el-input v-model.trim="ruleForm.sort"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button plain size="mini" @click="cancel">取 消</el-button>
				<el-button plain size="mini" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script src="@/assets/js/label/LabelDetail.js"></script>
<style lang="scss" scoped>
	.label-detail-page {
		.top-box {
			position: relative;
			margin-bottom: 20px;
			height: 33px;
			border-bottom: 1px solid #E4E7ED;
			.add-btn1 {
				right: 100px;
			}
		}
	}

	.saveBox {
		width: 60%;
		text-align: right;
		margin: 20px auto;
	}
</style>
