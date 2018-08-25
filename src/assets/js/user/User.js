import userApi from '@/api/user'
import roleApi from '@/api/role'
import globalFunctions from '@/config/global_functions'
import globalRules from '@/config/global_rules'

export default {
	name: 'account-set',
	data() {
		return {
			tableData: [],
			allRoles: [],
			pagination: {
				currentPage: 1,
				totalCount: 0,
			},
			requestParameters: {
				page: 1,
				page_size: 20,
				username: '',
				merchant_role_id: '',
				phone: '',
			},
			dialogTitle: "",
			userDialogFormVisible: false,
			ruleForm: {
				username: '',
				truename: '',
				phone: '',
				role_id: '',
				password: '',
			},
			rules: {
				username: globalRules.rules.username(),
				password: globalRules.rules.password(),
				truename: globalRules.rules.truename(),
				phone: globalRules.rules.phone(),
			},
			userEditVisible: false,
			editForm: {
				id: '',
				role_id: '',
				username: '',
				phone: '',
				truename: '',
				status: '',
				password: '',
			},
		}
	},
	watch: {
		userDialogFormVisible: function() {
			setTimeout(() => {
				this.$refs.ruleForm.clearValidate();
			}, 0)
		},
		userEditVisible: function() {
			setTimeout(() => {
				this.$refs.editForm.clearValidate();
			}, 0)
		}

	},
	created: function() {
		this.lists();
		this.getRoles();
	},
	methods: {
		//列表
		lists() {
			let qs = require('querystring')
			userApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
				if(res.data.errno === 0) {
					if(res.data.data.list.length !== 0) {
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
						this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
					} else {
						this.$data.tableData = []
					}
				} else if(res.data.errno == 1000002) {
					this.$message.error(res.data.msg);
				} else {
					this.$message.error(res.data.msg);
				}
			})
		},

		//清除新增的弹窗数据
		fuResetRuleForm() {
			this.$data.ruleForm.username = '';
			this.$data.ruleForm.password = '';
			this.$data.ruleForm.truename = '';
			this.$data.ruleForm.phone = '';
			this.$data.ruleForm.role_id = '';
		},

		//清除编辑的弹框数据
		editClear() {
			this.$data.editForm.id = '';
			this.$data.editForm.role_id = '';
			this.$data.editForm.username = '';
			this.$data.editForm.phone = '';
			this.$data.editForm.truename = '';
			this.$data.editForm.status = '';
			this.$data.editForm.password = '';
		},

		//获得岗位列表
		getRoles() {
			roleApi.lists_results().then((res) => {
				if(res.data.errno === 0) {
					this.$data.allRoles = res.data.data;
				}
			})
		},

		//点击分页发送数据
		handleCurrentChange(currentPage) {
			this.$data.requestParameters.page = currentPage;
			this.lists();
		},

		//删除该数据
		fnRemove(row) {
			this.$confirm('确认删除该角色：' + row.username + ' ？', '删除提示', {
				confirmButtonText: '确定',
				fnCancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let list = {
					'id': row.id
				}
				let qs = require('querystring')
				userApi.dele(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						this.$message({
							type: 'success',
							message: '操作成功'
						});
						this.lists();
					} else {
						this.$message.error(res.data.msg);
					}

				})
			}).catch(() => {});
		},
		//新增
		fnAdds() {
			this.fuResetRuleForm();
			this.$data.userDialogFormVisible = true;
		},

		fnEdit(row) {
			this.$data.editForm.id = row.id;
			this.$data.editForm.role_id = row.storeRole.id;
			this.$data.editForm.username = row.username;
			this.$data.editForm.phone = row.phone;
			this.$data.editForm.truename = row.truename;
			this.$data.editForm.status = row.status;
			this.$data.editForm.password = '';
			this.$data.userEditVisible = true;
		},

		onSubmitSearch() {
			this.lists();
		},

		//新增的提交
		addSubmitForm() {
			let qs = require('querystring');
			this.$refs.ruleForm.validate((valid) => {
				if(valid) {
					userApi.adds(qs.stringify(this.$data.ruleForm)).then((res) => {
						if(res.data.errno === 0) {
							this.$message({
								message: '操作成功',
								type: 'success',
								duration: 1500
							});
							this.lists();
							this.fuResetRuleForm();
							this.$data.userDialogFormVisible = false;
						} else {
							this.$message.error(res.data.msg);

						}
					});
				} else {
					return false;
				}
			})

		},

		//编辑的提交
		submitForm() {
			let qs = require('querystring');
			this.$refs.editForm.validate((valid) => {
				if(valid) {
					userApi.edit(qs.stringify(this.$data.editForm)).then((res) => {
						if(res.data.errno === 0) {
							this.$message({
								message: '操作成功',
								type: 'success',
								duration: 1500
							});
							this.lists();
							this.$data.userEditVisible = false;
						} else {
							this.$message.error(res.data.msg);
						}
					})
				}else{
					return false;
				}
			})

		},

		fnCancel() {
			this.$data.userDialogFormVisible = false;
		},
		editDialogClose() {
			this.editClear();
			this.$data.userEditVisible = false;
		},
		fnEditCancel() {
			this.$data.userEditVisible = false;
		},

		//重置搜索
		resetSearch() {
			this.$data.requestParameters.username = '';
			this.$data.requestParameters.merchant_role_id = '';
			this.$data.requestParameters.phone = '';
		},
	}
}