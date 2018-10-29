<template>
	<div class="label-list-page">
		<table width="60%" class="yingyanTable">
			<thead style="background-color: #d1d1d1">
				<tr height="50">
					<th class="col-md-2 text-center">标签类名</th>
					<th class="col-md-2 text-center">操作</th>
				</tr>
			</thead>
			<tbody style="text-align: center">
				<tr v-for="(item,index) in tableData" :key="index" height="50">
					<td>{{item.name}}</td>
					<td>
						<i class="newI color1 el-icon-yy-chakan" @click="fnGoPage(item)"></i>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 分页 -->
		<div v-if="tableData.length > 0" class="paginationBox">
			<el-pagination  class="pagination" layout="prev, pager, next" small @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="requestParameters.page_size" :total="pagination.totalCount">
			</el-pagination>
		</div>

		<!-- 添加、修改 -->
		<!--<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="标签类名：" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
		  </div>
		</el-dialog>-->
	</div>
</template>
<script src="@/assets/js/label/LabelList.js"></script>
<style lang="scss" scoped>
	.label-list-page {
		.top-box {
			position: relative;
			margin-bottom: 20px;
			height: 36px;
			border-bottom: 1px solid #E4E7ED;
			.add-btn {
				position: absolute;
				top: 0;
				right: 20px;
			}
		}
	}
</style>
