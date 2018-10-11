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
          selected:'',
				},
				saveTag: [],
				currentId: '',
				rules: {
					sort: [{
							required: true,
							message: '请输入排序名',
							trigger: 'blur'
						},
						{
							validator: (rule, value, callback) => {
								if(value.match(/^\+?[1-9]\d*$/)) {
									callback();
								} else {
									callback("只能输入大于0的整数");
								}
							},
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
		watch: {
			dialogFormVisible: function() {
				setTimeout(() => {
					this.$refs.ruleForm.clearValidate();
				});
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
				labelApi.tagList(qs.stringify(this.$data.requestParameters)).then((res) => {
					if(res.data.errno === 0) {
						let list = [];
						for(let i = 0; i < res.data.data.list.length; i++) {
							list.push({
								id: res.data.data.list[i].id,
								status: res.data.data.list[i].selected
							})
						};
						this.$data.saveTag = list;
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
				let v = val === true ? 1 : 0;
				for(let j = 0; j < this.$data.saveTag.length; j++) {
					(this.$data.saveTag[j].id === d) && (this.$data.saveTag[j].status = v);
				}
			},
			saveSelectTag() {

				let list = {
					parent_id:this.$data.requestParameters.parent_id,
					tag_ids: JSON.stringify(this.$data.saveTag)
				};
				let qs = require('querystring');
				labelApi.tagEdit(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						this.$message({
							message: '保存成功！',
							type: 'success'
						});
					} else {
                       this.$message.error(res.data.msg)
					}
				})
			},

			fnEdit(row) {
				this.$data.dialogTitle = '编辑';
				this.$data.currentId = row.id;
				this.$data.ruleForm.sort = '';
				this.$data.ruleForm.selected = row.selected;
				this.$data.dialogFormVisible = true;
			},
			fnGoback() {
				this.$router.push('/LabelList');
			},

			cancel() {
				this.$data.dialogFormVisible = false;
				this.$data.ruleForm.sort = '';
				this.$data.currentId = '';
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
					  if(this.$data.ruleForm.selected == 1){
              let list = {
                'tag_id': this.$data.currentId,
                'sort': this.$data.ruleForm.sort
              }
              let qs = require('querystring');
              labelApi.tagSort(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0) {
                  this.labeChildlList();
                  this.$message.success('排序成功！')
                }else {
                  this.$message(res.data.msg)
                }
              })
            }else if(this.$data.ruleForm.selected == 0){
					    this.$message.info('该标签未保存，不允许排序')
            }
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
