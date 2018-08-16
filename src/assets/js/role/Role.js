    import roleApi from '@/api/role'
    import globalRules from '@/config/global_rules'
	export default {
		name: 'role-set',
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
					sort: '0',
				},
				currentId: '',
				currentName: '',
				rules: {
					name: globalRules.rules.roleNameRule(),
					sort: globalRules.rules.roleOrderRule()
				},
				dialogForm2Visible: false,
				dialogForm2: [],
				checkedIds: [],
				requestParameters: {
					page: 1,
					page_size: 10
				},
        dialogForm : [],


			}
		},
		watch:{
			dialogFormVisible:function(){
				setTimeout(()=>{
					this.$refs.ruleForm.clearValidate();
				},0)
			}
		},
		created: function() {
			this.lists();

		},
		methods: {
			//列表
			lists() {
				let qs = require('querystring')
				roleApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
					console.log(res)
					if(res.data.errno === 0) {
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
						this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},

			handleCurrentChange(currentPage) {
				this.$data.requestParameters.page = currentPage;
				this.lists();
			},

			fnRemove(row) {
				this.$confirm('确认删除该角色：' + row.name + ' ？', '删除提示', {
					confirmButtonText: '确定',
					fnCancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let list = {
						'id': row.id
					}
					let qs = require('querystring')
					roleApi.dele(qs.stringify(list)).then((res) => {
						if(res.data.errno === 0) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.lists();
						} else {
							this.$message.error(res.data.msg);
						}

					})
				}).catch(() => {
					// this.$message({
					//   type: 'info',
					//   message: '已取消删除'
					// });
				});
			},
			fnEdit(row) {
				this.$data.dialogTitle = '编辑';
				this.$data.currentId = row.id;
				this.$data.ruleForm.name = row.name;
				this.$data.ruleForm.sort = row.sort;
				this.$data.dialogFormVisible = true;

			},
			fnAdds() {
				this.$data.dialogTitle = '添加';
				this.$data.currentId = "";
				this.$data.ruleForm.name = "";
				this.$data.ruleForm.sort = 0;
				this.$data.dialogFormVisible = true;
				roleApi.merchantRoleLists().then((res) => {
				  console.log(res);
				  this.$data.dialogForm = res.data.data;
        })
			},
			fnCancel(formName) {
				this.$data.dialogFormVisible = false;
				this.$data.dialogForm2Visible = false;
				this.$data.ruleForm.name = '';
				this.$data.ruleForm.sort = 0;
				this.$data.currentId = '';
        setTimeout(()=>{
          this.$refs.ruleForm.resetFields();
        })
        // this.$data.dialogForm2 = [];
				// this.$refs[formName].resetFields(); //关闭dialog后重置验证结果
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.$data.currentId !== '') {
              this.$data.checkedIds = this.$refs.tree.getCheckedKeys();
							let list = {
								'id': this.$data.currentId,
								'name': this.$data.ruleForm.name,
                'sort': this.$data.ruleForm.sort,
								'permission_ids': this.$data.checkedIds.toString(),
							}
							let qs = require('querystring')
							roleApi.edit(qs.stringify(list)).then((res) => {
								if(res.data.errno === 0) {
									this.$message({
										message: '操作成功',
										type: 'success',
										duration: 1500
									});
									this.lists();
									this.$data.ruleForm.name = '';
									this.$data.ruleForm.sort = 0;
									this.$data.currentId = '';
									this.$data.dialogFormVisible = false;

								} else {
									this.$message.error('请至少选择一个权限');
								}

							})
						} else {
              this.$data.checkedIds = this.$refs.tree.getCheckedKeys();
							let list = {
								'name': this.$data.ruleForm.name,
								'sort': this.$data.ruleForm.sort,
                'permission_ids': this.$data.checkedIds.toString(),
							}
							let qs = require('querystring')
							roleApi.adds(qs.stringify(list)).then((res) => {
								if(res.data.errno === 0) {
									this.$message({
										message: '操作成功',
										type: 'success',
										duration: 1500
									});
									this.lists();
									this.$data.ruleForm.name = '';
									this.$data.ruleForm.sort = '';
									this.$data.currentId = '';
									this.$data.dialogFormVisible = false;

								} else {
									this.$message.error(res.data.msg);

								}
							})
						}
					}
				});
			},

			fnSet(row) {
			  // console.log(row);
				this.$data.currentName = row.name;
				this.$data.currentId = row.id;
				let list = {
					'role_id': row.id
				}
				let qs = require('querystring');
				roleApi.viewPermission(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						this.$data.dialogForm2 = res.data.data;
						var checkedId = [];
						for(var i = 0; i < this.$data.dialogForm2.length; i++) {
							var rootIdx = i;
							if(this.$data.dialogForm2[rootIdx].is_permission === 1) {
								var len = checkedId.length;
								checkedId[len] = this.$data.dialogForm2[rootIdx].id;

							}
							if(this.$data.dialogForm2[rootIdx].children && this.$data.dialogForm2[rootIdx].children.length > 0) {
								for(var j = 0; j < this.$data.dialogForm2[rootIdx].children.length; j++) {
									var childIdx = j;
									if(this.$data.dialogForm2[rootIdx].children[childIdx].is_permission === 1) {
										var len = checkedId.length;
										checkedId[len] = this.$data.dialogForm2[rootIdx].children[childIdx].id;

									}
								}
							}
						}
						this.$data.checkedIds = checkedId;
					} else {
						this.$message.error(res.data.msg);
					}

				})
				this.$data.dialogForm2Visible = true;
			},

			submitForm2() {
				this.$data.checkedIds = this.$refs.tree.getCheckedKeys();
				let list = {
					'role_id': this.$data.currentId,
					'permission_ids': this.$data.checkedIds.toString()
				}
				let qs = require('querystring')
				roleApi.editPermission(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						this.$data.currentId = '';
						this.$data.dialogForm2Visible = false;
					} else {
						this.$message.error('请至少选择一个权限');

					}

				})
			},
      dialogClose(){
        this.$data.dialogFormVisible = false;
        this.$data.ruleForm = {};
        setTimeout(()=>{
          this.$refs.ruleForm.resetFields();
        })
      },
		}
	}
