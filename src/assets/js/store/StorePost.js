import storeRoleApi from '@/api/store_role'
import roleApi from '@/api/role'
import globalRules from '@/config/global_rules'

export default {
	name: 'store-set',
	data() {
		return {
			tableData: [],
			pagination: {
				currentPage: 1,
				totalCount: 0,
			},
			dialogFormVisible: false,
			editFormVisible: false,
			ruleForm: {
				name: '',
				person_in_charge: '',
				phone: ''
			},
			editForm: {
				name: '',
				person_in_charge: '',
				phone: ''
			},
			currentId: '',
			rules: {
				name: globalRules.rules.name(),
			},
			requestParameters: {
				page: 1,
				page_size: 20
			},
			dialogForm2Visible: false,
			currentName: '',
			dialogForm2: [],
			editManage: [],
			checkedIds: [],
			dialogForm: [],
			allManage: [],
			nodeId: '',
			parentId: '',
			grade: '',
			editGrade: ''
		}
	},
	created: function() {
		this.storeRoleLists();
		this.getPowerList();

	},
	methods: {
		//列表
		storeRoleLists() {
			let qs = require('querystring')
			storeRoleApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
				if(res.data.errno === 0) {
					this.$data.tableData = res.data.data.list;
					this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
					this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
				} else {
					this.$message.error(res.data.msg);
				}
			})
		},
		getPowerList() {
			roleApi.storeRoleLists().then((res) => {
				this.$data.dialogForm = res.data.data;
			})
		},

		handleCurrentChange(currentPage) {
			this.$data.requestParameters.page = currentPage;
			this.storeRoleLists();
		},
		cutGrage(val) {
			let list = {
				grade: val,
				role_id: 0
			};
			let qs = require('querystring');
			storeRoleApi.gradePermission(qs.stringify(list)).then((res) => {
				if(res.data.errno === 0) {
					this.$data.allManage = res.data.data;
				} else {
					this.$message(res.data.msg)
				}
			});
		},
		fnRemove(row) {
			this.$confirm('确认删除该岗位：' + row.name + ' ？', '删除提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let list = {
					'id': row.id
				}
				let qs = require('querystring')
				storeRoleApi.dele(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.storeRoleLists();
					} else {
						this.$message.error(res.data.msg);
					}

				})
			}).catch(() => {});
		},
		fnEdit(row) {
			this.$data.currentId = row.id;
			this.$data.editForm = row;
			this.$data.editFormVisible = true;
    },

		fnAdds() {
			this.$data.currentId = "";
			this.$data.ruleForm = {
				name: '',
				person_in_charge: '',
				phone: ''
			};
			this.$data.dialogFormVisible = true;
			this.$data.allManage = this.$data.dialogForm;
		},
		cancel() {
			this.$data.dialogFormVisible = false;
			this.$data.currentId = '';
			this.$data.ruleForm.name = '';
			setTimeout(() => {
				this.$refs.ruleForm.clearValidate();
			})
		},
		editCancle() {
			// this.$data.currentId = '';
			this.$data.editFormVisible = false;
			setTimeout(() => {
				this.$refs.editForm.clearValidate();
			})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if(!valid) {
					return false;
				}
				if(this.$data.grade === '') {
					this.$message("请选择等级！");
					return false;
				};
				let perId = [];
				let arr = this.$data.allManage;
				for(let n = 0; n < arr.length; n++) {
					perId.push(arr[n].id);
					if(arr[n].children) {
						for(let j = 0; j < arr[n].children.length; j++) {
							perId.push(arr[n].children[j].id);
						}
					};
				};
				let list = {
					'name': this.$data.ruleForm.name,
					'grade': this.$data.grade,
					'permission_ids': perId.toString()
				};
				let qs = require('querystring');
				storeRoleApi.adds(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						this.$message({
							message: '岗位设置成功',
							type: 'success',
							duration: 1500
						});
						this.storeRoleLists();
						this.$data.currentId = '';
						this.$data.ruleForm = {
							name: '',
							person_in_charge: '',
							phone: ''
						};
						this.$data.dialogFormVisible = false;
					} else if(res.data.errno == -1) {
						this.$message.error(res.data.msg);

					} else {
						this.$message.error(res.data.msg);
					}

				})

			});
		},
		
		//操作修改
		editSubmitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if(!valid) {
					return false;
				};
				let list = {
					'id': this.$data.currentId,
					'name': this.$data.editForm.name,
					'sort': this.$data.editForm.sort,
				}
				let qs = require('querystring');
				storeRoleApi.edit(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						this.$message({
							message: '岗位名称修改成功',
							type: 'success',
							duration: 1500
						});
						this.storeRoleLists();
						this.$data.currentId = '';
						this.$data.editForm = {
							name: '',
							person_in_csharge: '',
							phone: ''
						};
						this.$data.editFormVisible = false;

					} else {
						this.$message.error(res.data.msg);
					}

				})
			});
		},
		fnSetting(row) {
			this.$data.currentName = row.name;
			this.$data.currentId = row.id;
			let list = {
				id: row.id
			};
			let qs = require('querystring');
			storeRoleApi.view(qs.stringify(list)).then((res) => {
				if(res.data.errno === 0) {
					this.getEditManage(res.data.data.grade);
					this.$data.editGrade = res.data.data.grade;
				} else {
					this.$message.error(res.data.msg);
				}
			})
			this.$data.dialogForm2Visible = true;
		},
		getEditManage(val) {
			let list = {
				grade: val,
				role_id: 0
			};
			let qs = require('querystring');
			storeRoleApi.gradePermission(qs.stringify(list)).then((res) => {
				if(res.data.errno === 0) {
					this.$data.editManage = res.data.data;
				} else {
					this.$message(res.data.msg)
				}
			});
		},
		cutEditGrade(val) {
			this.getEditManage(val);
		},
		fnCancel(formName) {
			this.$data.dialogFormVisible = false;
			this.$data.dialogForm2Visible = false;
			this.$data.ruleForm.name = '';
			this.$data.ruleForm.sort = 0;
			this.$data.currentId = '';
		},
		submitForm2() {
			if(this.$data.editGrade === '') {
				this.$message("请选择等级！");
				return false;
			};
			let perId = [];
			let arr = this.$data.editManage;
			for(let n = 0; n < arr.length; n++) {
				if(arr[n].children) {
					for(let j = 0; j < arr[n].children.length; j++) {
						perId.push(arr[n].children[j].id);
					}
				} else {
					perId.push(arr[n].id);
				}
			};
			let list = {
				'role_id': this.$data.currentId,
				'grade': this.$data.editGrade,
				'permission_ids': perId.toString()
			};
			let qs = require('querystring');
			storeRoleApi.editPermission(qs.stringify(list)).then((res) => {
				if(res.data.errno === 0) {
					this.$data.currentId = '';
					this.$data.dialogForm2Visible = false;
					this.$message('修改成功！');
				} else {
					this.$message.error(res.data.msg);
				}

			})
		},
		closeDialog() {
			setTimeout(() => {
				this.$refs.ruleForm.clearValidate();
				this.$data.dialogFormVisible = false;
			})
		},
		editClose() {
			setTimeout(() => {
				this.$refs.editForm.clearValidate();
				this.$data.editFormVisible = false;
			})
		},
		editManageClose() {
			this.$data.dialogForm2Visible = false;
		}
		//清除数据
		//		clearFormData() {
		//			this.$data.ruleForm.name = '';
		//			// this.$data.dialogForm2 = [];
		//			setTimeout(() => {
		//				this.$refs.ruleForm.clearValidate();
		//				this.$data.dialogFormVisible = false;
		//				this.$data.dialogForm = [];
		//			})
		//		},
	}
}