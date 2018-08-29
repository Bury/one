<template>
	<div class="label-detail-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn1" @click="fnGoback()">返回</el-button>
		</div>
		<!--列表-->
		<!--<el-table ref="elTable" border style="width: 60%;" :data="tableData" toolip-effect="dark" >
			<el-table-column type="selection" width="55" align="center"></el-table-column>
			<el-table-column label="排序" prop="name" align="center"></el-table-column>
			<el-table-column label="标签类名" prop="name" align="center"></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button   @click.native.prevent="deleteRow(scope.$index, tableData4)"  type="text" size="small">
						编辑
					</el-button>
				</template>
			</el-table-column>
		</el-table>-->
		<div class="saveBox">
				<el-button type="primary" plain>保存</el-button>
		</div>
		<table width="60%" class="table-bordered">
			<thead style="background-color: #d1d1d1">
				<tr height="40">
					<th class="col-md-1 text-center">选择</th>
					<th class="col-md-3 text-center">排序</th>
					<th class="col-md-3 text-center">标签类名</th>
					<th class="col-md-3 text-center">操作</th>
				</tr>
			</thead>			
			<tbody v-if="tableData.length > 0" style="text-align: center">
				<tr v-for="(item,index) in tableData" :key="index" height="40">
					<td>
						<el-checkbox :checked="item.id === 14" @change="selectBox($event,item.id)"></el-checkbox>
					</td>
					<td>{{(pagination.currentPage - 1) * 20 + index + 1 }}</td>
					<td>{{item.name}}</td>
					<td>
						<el-button type="warning" plain icon="el-icon-edit" circle size="small" @click="fnEdit(item)"></el-button>
					</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr>
					<td colspan="4" align="center" height="50px">暂无数据</td>
				</tr>
			</tbody>
		</table>

		<!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;width:621px;">
			<el-pagination background class="pagination" layout="prev, pager, next" small @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="requestParameters.page_size" :total="pagination.totalCount">
			</el-pagination>
		</div>

		<!-- 添加、修改 -->
		<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="排序：" prop="sort">
					<el-input v-model.trim="ruleForm.sort"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	import labelApi from '../../api/label'
	export default {
		name: 'label-detail',
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
					sort: '',
				},
				saveTag:[],
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
					parent_id: '',
					page: 1,
					page_size: 20
				}

			}
		},
		created: function() {
			this.labeChildlList();
		},
		methods: {
			// 列表
			labeChildlList() {
				this.$data.requestParameters.parent_id = this.$route.query.LabelId;
				let qs = require('querystring')
				labelApi.labeChildlList(qs.stringify(this.$data.requestParameters)).then((res) => {
					console.log(res)
					if(res.data.errno === 0) {
						console.log(res.data.data.list)
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
						this.$data.pagination.totalCount = res.data.data.pagination.totalCount;

					} else {

					}
				})
			},
			handleCurrentChange(currentPage) {
				this.$data.requestParameters.page = currentPage;
				this.labeChildlList();
			},
			selectBox(val, d) {
//				if(val === true){
//					this.saveTag.push()
//				}
			},
			
			

			fnEdit(row) {
				this.$data.dialogTitle = '编辑';
				this.$data.currentId = row.id;
				this.$data.ruleForm.name = row.name;
				this.$data.dialogFormVisible = true;
			},
			fnGoback() {
				this.$router.push('/LabelList');
			},

			cancel() {
				this.$data.dialogFormVisible = false;
				this.$data.ruleForm.name = '';
				this.$data.currentId = '';
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					console.log(valid)
					if(valid) {
						if(this.$data.currentId !== '') {
							let list = {
								'id': this.$data.currentId,
								'name': this.$data.ruleForm.name
							}
							let qs = require('querystring')
							labelApi.editChildLabel(qs.stringify(list)).then((res) => {
								if(res.data.errno === 0) {
									console.log(res)
									this.labeChildlList();

								} else {

								}

							})
						} else {
							let list = {
								'name': this.$data.ruleForm.name,
								'parent_id': this.$route.query.LabelId
							}
							let qs = require('querystring')
							labelApi.addChildLabel(qs.stringify(list)).then((res) => {
								if(res.data.errno === 0) {
									console.log(res)
									this.labeChildlList();

								} else {

								}

							})
						}
						this.$data.ruleForm.name = '';
						this.$data.currentId = '';
						this.$data.dialogFormVisible = false;
					}
				});
			},

		}
	}
</script>
<style lang="scss" scoped>
	.label-detail-page {
		.top-box {
			position: relative;
			margin-bottom: 20px;
			height: 36px;
			border-bottom: 1px solid #d2d2d2;
			.add-btn1 {
				right: 100px;
			}
		}
	}
	.saveBox{
		width: 60%;
		text-align: right;
		margin: 20px auto;
	}
	.el-pagination {
		margin: 20px 0;
		float: right;
	}
</style>