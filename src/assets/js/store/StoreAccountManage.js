import storeApi from '@/api/store'
import storeRole from '@/api/store_role'
import storeAccountApi from '@/api/store_account'
import globalRules from '@/config/global_rules'

export default {
	name: 'store-account-manage',
	data() {
		return {
			tableData: [],
			organizes: [],
			selectStore: [],
			organizeCode: [],
			allRole: [],
			nodatatext: '请选择门店架构',
			noeditStore: '请选择门店架构',
			defaultAttr: {
				label: 'name',
				value: 'id',
				children: 'children',
			},
			pagination: {
				currentPage: 1,
				totalCount: 0,
			},
			requestParameters: {
				store_id: '',
				merchant_organize_id: '',
				merchant_role_id: '',
				username: '',
				truename: '',
				phone: '',
				page: 1,
				page_size: 10,
			},
			editFormVisible: false,
			editFormOrganize: [],
			editStore: [],
			editFormData: {
				id: '',
				store_id: '',
				username: '',
				truename: '',
				phone: '',
				role_id: ''
			},
			editRules: {
				username: globalRules.rules.username('请输入账号'),
				truename: globalRules.rules.truename(),
				phone: globalRules.rules.phone(),
				store_id: globalRules.rules.selectRule("请选择门店"),
				role_id: globalRules.rules.selectRule("请选择岗位")
			},
			changePwdFormVisible: false,
			changePwdFormData: {
				id: '',
				password: '',
				repassword: '',
			},
			changePwdRules: {
				password: globalRules.rules.password(),
				repassword: [{
						required: true,
						message: '请再次输入密码',
						trigger: 'blur'
					},
					{
						validator: (rule, value, callback) => {
							if(value !== this.$data.changePwdFormData.password) {
								callback(new Error('两次输入密码不一致!'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}

				]
			},
			addsFormVisible: false,
			addFormOrganize:[],
			addStore:[],
			addsFormData: {
				store_id: '',
				username: '',
				truename: '',
				role_id: '',
				phone: '',
				password: '',

			},
			addsRules: {
				store_id: globalRules.rules.selectRule("请选择门店"),
				username: globalRules.rules.username('请输入账号'),
				truename: globalRules.rules.truename(),
				phone: globalRules.rules.phone(),
				role_id: globalRules.rules.selectRule("请选择岗位"),
				password: globalRules.rules.password(),
				repassword: [{
						required: true,
						message: '请再次输入密码',
						trigger: 'blur'
					},
					{
						validator: (rule, value, callback) => {
							if(value !== this.$data.addsFormData.password) {
								callback(new Error('两次输入密码不一致!'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}
				]
			},
			avatarFormVisible: false
		}
	},
	watch: {
		editFormVisible: function(val) {
			if(val) {
				setTimeout(() => {
					this.$refs.editFormData.clearValidate()
				}, 0)
			} else {
				this.$data.editFormData = {
					id: '',
					store_id: '',
					username: '',
					truename: '',
					phone: '',
					role_id: ''
				}
				this.$data.editFormOrganize = [];
				this.$data.editStore = [];
			}
		},
		addsFormVisible: function(val) {
			if(val) {
				setTimeout(() => {
					this.$refs.addsFormData.clearValidate()
				}, 0)
			} else {
				this.fnClearAddsFormData()
			}
		}
	},
	created: function() {
		this.accountLists();
		this.getOrganizes();
		this.getRoleLists();
	},
	methods: {
		//列表
		accountLists() {
			let qs = require('querystring');
			storeAccountApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
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
			this.accountLists();
		},

		fnRemove(row) {
			this.$confirm('确认删除该帐号：' + row.username + ' ？', '删除提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let list = {
					'id': row.id
				}
				let qs = require('querystring')
				storeAccountApi.dele(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						this.$message({
							type: 'success',
							message: '操作成功'
						});
						this.accountLists();
					} else {
						this.$message.error(res.data.msg);
					}

				})
			});
		},
		fnEdit(row) {
			this.$data.editFormVisible = true;
			let org = [];
			this.$data.editFormData = {
				id: row.id,
				username: row.username,
				truename: row.truename,
				phone: row.phone,
				role_id: row.storeRole.id,
				store_id: row.store.id,
			}

			if(row.organizes.length == 0) {
				return false
			}
			row.organizes.id.split(',').forEach(function(val) {
				org.push(parseInt(val))
			});
			this.$data.editFormOrganize = org;
			let merid = org[org.length - 1];
			storeApi.organizeStoreResult({
				'merchant_organize_id': merid
			}).then((res) => {
				if(res.data.errno === 0) {
					if(res.data.data == null) {
						this.$data.nodatatext = "暂无门店"
						this.$data.editStore = [];
					} else {
						this.$data.editStore = res.data.data;
					}
				} else {
					this.$message(res.data.msg)
				}
			})
		},

		getRoleLists() {
			storeRole.allList().then((res) => {
				if(res.data.errno === 0) {
					this.$data.allRole = res.data.data;
				} else {
					this.$message.error(res.data.msg);
				}
			})
		},
		editCancel() {
			this.$data.editFormVisible = false;
		},
		editSubmit(formName) {

			this.$refs[formName].validate((valid) => {
				if(valid) {
					let qs = require('querystring')
					storeAccountApi.edit(qs.stringify(this.$data.editFormData)).then((res) => {
						if(res.data.errno === 0) {
							this.$message({
								type: 'success',
								message: '操作成功'
							});
							this.accountLists();
							this.$data.editFormData = {
								id: '',
								store_id: '',
								username: '',
								truename: '',
								phone: '',
								role_id: '',
							}
							this.$data.editFormVisible = false;

						} else {
							this.$message.error(res.data.msg);
						}

					})

				}
			});

		},
		fnEditPassword(row) {
			this.$data.changePwdFormVisible = true;
			this.$data.changePwdFormData = {
				id: row.id,
				password: '',
				repassword: '',
			}
		},
		editPasswordCancel() {
			this.$data.changePwdFormVisible = false;
			this.$data.changePwdFormData = {
				id: '',
				password: '',
				repassword: '',
			}
		},
		editPasswordSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if(valid) {
					let qs = require('querystring')
					storeAccountApi.password_edit(qs.stringify(this.$data.changePwdFormData)).then((res) => {
						if(res.data.errno === 0) {
							this.$message({
								type: 'success',
								message: '修改成功'
							});
							this.accountLists();
							this.$data.changePwdFormData = {
								id: '',
								password: '',
								repassword: '',
							}
							this.$data.changePwdFormVisible = false;
						} else {
							this.$message.error(res.data.msg);
						}

					})

				}
			});

		},
		fnClearAddsFormData() {
			this.$data.addsFormData = {
				store_id: '',
				username: '',
				truename: '',
				role_id: '',
				phone: '',
				password: ''
			};
			this.$data.editFormOrganize = [];
			this.$data.addsFormData.store_id = '';

		},

		fnAdds() {
			this.fnClearAddsFormData();
			this.getRoleLists();
			this.$data.addsFormVisible = true;
		},
		//头像选择
		getAvatarData(childData) {
			this.$data.avatarFormVisible = false;
			this.$data.addsFormData.avatar = childData.avatar;
			this.$data.addsFormData.customer_id = childData.customer_id;
		},
		addCancel() {
			this.$data.addsFormVisible = false;
			this.fnClearAddsFormData();
		},
		addsSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if(valid) {
					let qs = require('querystring');
					storeAccountApi.adds(qs.stringify(this.$data.addsFormData)).then((res) => {
						if(res.data.errno === 0) {
							this.$message({
								type: 'success',
								message: '操作成功'
							});
							this.accountLists();
							this.fnClearAddsFormData();
							this.$data.addsFormVisible = false;
						} else {
							this.$message.error(res.data.msg);
						}

					})

				}
			});

		},
		closeChange() {
			this.$data.addsFormVisible = false;
			this.fnClearAddsFormData();
		},

		getOrganizes() {
			storeRole.organizeTree().then((res) => {
				if(res.data.errno == 0) {
					this.$data.organizes = res.data.data;
				} else {
					this.$message(res.data.msg)
				}
			})
		},
		getStore() {
			this.$data.requestParameters.store_id = "";
			let organ = this.$data.organizeCode[this.$data.organizeCode.length - 1];
			let data = {
				merchant_organize_id: organ
			};
			storeApi.organizeStoreResult(data).then((res) => {
				if(res.data.errno === 0) {
					if(res.data.data == null) {
						this.$data.nodatatext = "暂无门店"
						this.$data.selectStore = [];
					} else {
						this.$data.selectStore = res.data.data
					}
				} else {
					this.$message(res.data.msg)
				}
			})
		},
		addGetSotre(){
			this.$data.addsFormData.store_id = "";
			let d = this.$data.addFormOrganize[this.$data.addFormOrganize.length - 1];
			let dt = {
				merchant_organize_id: d
			};
			storeApi.organizeStoreResult(dt).then((res) => {
				if(res.data.errno === 0) {
					if(res.data.data == null) {
						this.$data.noeditStore = "暂无门店"
						this.$data.addStore = [];
					} else {
						this.$data.addStore = res.data.data
					}
				} else {
					this.$message(res.data.msg)
				}
			})
		},
		editGetSotre() {
			this.$data.editFormData.store_id = "";
			let d = this.$data.editFormOrganize[this.$data.editFormOrganize.length - 1];
			let dt = {
				merchant_organize_id: d
			};
			storeApi.organizeStoreResult(dt).then((res) => {
				if(res.data.errno === 0) {
					if(res.data.data == null) {
						this.$data.noeditStore = "暂无门店"
						this.$data.editStore = [];
					} else {
						this.$data.editStore = res.data.data
					}
				} else {
					this.$message(res.data.msg)
				}
			})

		},

		clickSearch() {
			if(this.$data.organizeCode.length !== 0) {
				this.$data.requestParameters.merchant_organize_id = this.$data.organizeCode[this.$data.organizeCode.length - 1]
			}
			this.accountLists()
		},
		resetForm() {
			this.$data.organizeCode = [];
			this.$data.selectStore = [];
			this.$data.requestParameters = {
				store_id: '',
				merchant_organize_id: '',
				merchant_role_id: '',
				username: '',
				truename: '',
				phone: '',
				page: 1,
				page_size: 10,
			}
		}

	}
}