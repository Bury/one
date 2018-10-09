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
						<el-button  size="mini" @click="fnGoPage(item)">编辑</el-button>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 分页 -->
		<div v-if="tableData.length > 0" class="paginationBox">
			<el-pagination background class="pagination" layout="prev, pager, next" small @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="requestParameters.page_size" :total="pagination.totalCount">
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
<script>
	import labelApi from '../../api/label'
	export default {
		name: 'label-list',
		data() {
			return {
				tableData: [],
				pagination: {
					currentPage: 1,
					totalCount: 0,
				},
				dialogTitle: "",
				dialogFormVisible: false,
				ruleForm: {
					name: '',
				},
				currentId: '',
				rules: {
					name: [{
							required: true,
							message: '请输入标签类名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 4,
							message: '长度在 2 到 4 个字符',
							trigger: 'blur'
						}
					]
				},
				requestParameters: {
					page: 1,
					page_size: 20
				}

			}
		},
		created: function() {
			this.labelList();
		},
		methods: {
			// 列表
			labelList() {
				let qs = require('querystring');
				labelApi.labelList(qs.stringify(this.$data.requestParameters)).then((res) => {
					if(res.data.errno === 0) {
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
						this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
					} else {

					}
				})
			},
			handleCurrentChange(currentPage) {
				this.$data.requestParameters.page = currentPage;
				this.labelList();
			},
			fnGoPage(row) {
				this.$router.push({
					name: 'LabelDetail',
					query: {
						LabelId: row.id
					}
				});
			},

//			cancel() {
//				this.$data.dialogFormVisible = false;
//				this.$data.ruleForm.name = '';
//				this.$data.currentId = '';
//			},
//			submitForm(formName) {
//				this.$refs[formName].validate((valid) => {
//					if(valid) {
//						if(this.$data.currentId !== '') {
//							let list = {
//								'id': this.$data.currentId,
//								'name': this.$data.ruleForm.name
//							}
//							let qs = require('querystring')
//							labelApi.editLabel(qs.stringify(list)).then((res) => {
//								if(res.data.errno === 0) {
//									this.labelList();
//								} else {
//									this.$message.error(res.data.msg)
//								}
//							})
//						} else {
//							let list = {
//								'name': this.$data.ruleForm.name
//							}
//							let qs = require('querystring')
//							labelApi.addLabel(qs.stringify(list)).then((res) => {
//								if(res.data.errno === 0) {
//									this.labelList();
//								} else {
//									this.$message.error(res.data.msg)
//								}
//							})
//						}
//						this.$data.ruleForm.name = '';
//						this.$data.currentId = '';
//						this.$data.dialogFormVisible = false;
//					}
//				});
//			}
		}
	}
</script>
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
