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
				dialogFormVisible: false,
				ruleForm: {
					name: '',
					sort: '0',
				},
				currentId: '',
				currentName: '',
				rules: {
					name: globalRules.rules.roleNameRule(),
					sort: globalRules.rules.roleOrderRule(),
          name:globalRules.rules.name(),
				},
        rulesEdit:{
          name:globalRules.rules.name(),
        },
				dialogForm2Visible: false,
				dialogForm2: [],
				checkedIds: [],
				requestParameters: {
					page: 1,
					page_size: 20
				},
        dialogForm : [],
        editFormVisible: false,
        nodeId:'',
				parentId:'',
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
			  console.log(row);
				this.$data.currentId = row.id;
				this.$data.ruleForm.name = row.name;
				this.$data.ruleForm.sort = row.sort;
				this.$data.editFormVisible = true;

			},
			fnAdds() {
				this.$data.currentId = "";
				this.$data.ruleForm.name = "";
				this.$data.ruleForm.sort = 0;
				this.$data.dialogFormVisible = true;
        this.$data.dialogForm = [];
        this.$data.dialogForm2 = [];
        this.$data.checkedIds = [];
        roleApi.merchantRoleLists().then((res) => {
				  // console.log(res);
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
          // this.$refs.ruleForm.resetFields();
        })
        // this.$data.dialogForm2 = [];
				// this.$refs[formName].resetFields(); //关闭dialog后重置验证结果
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.$data.currentId !== '') {
              // this.$data.checkedIds = this.$refs.tree.getCheckedKeys();
							let list = {
								'id': this.$data.currentId,
								'name': this.$data.ruleForm.name,
                'sort': this.$data.ruleForm.sort,
								// 'permission_ids': this.$data.checkedIds.toString(),
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
									this.$data.editFormVisible = false;
								}

							})
						}
						else {
              let arr = this.$refs.tree.getCheckedKeys();
              var num ;
              for(let n=0;n<arr.length;n++){
                num = arr[n];
                this.$data.checkedIds.push(num);
              }
              Array.prototype.getOne = function(){
                for(let i=0;i<this.length - 1;i++){
                  for(let j= i+1;j<this.length;j++){
                    if(this[i] == this[j]){
                      this.splice(j--,1)
                    }
                  }
                }
              }
              this.$data.checkedIds.getOne();
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

								}else if(res.data.errno == -1){
                  this.$message.error(res.data.msg);
                } else if(res.data.errno == 1000003){
								  this.$message.error(res.data.msg);
								} else{
                  this.$message.error('请至少选择一个权限');
                }
							})
						}
					}
				});
			},
      change(data, val, child){
        //data该节点的对象，val自身是否被选中，child子节点是否被选中
        this.$data.nodeId = data.id;
        if(val == true && data.parent_id != 0){
          this.$data.parentId = this.$refs.tree.getNode(this.$data.nodeId).parent.data.id;
          this.$data.checkedIds.push(this.$data.parentId );
        }
      },
      changeSetting(data, val, child){
        //data该节点的对象，val自身是否被选中，child子节点是否被选中
        console.log(this.$data.checkedIds);
        console.log(data);
        this.$data.nodeId = data.id;
        if(val == true && data.parent_id != 0){
          this.$data.parentId = this.$refs.tree.getNode(this.$data.nodeId).parent.data.id;
          this.$data.checkedIds.push(this.$data.parentId );
        }
      },

			fnSet(row) {
				this.$data.currentName = row.name;
				this.$data.currentId = row.id;
				let list = {
					'role_id': row.id
				}
				let qs = require('querystring');
				roleApi.viewPermission(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						this.$data.dialogForm2 = res.data.data;
						this.getTree();
					} else {
						this.$message.error('请至少选择一个权限');
					}
				})
				this.$data.dialogForm2Visible = true;
			},
      getTree(){
        var checkedId = [];
        for(var i = 0; i < this.$data.dialogForm2.length; i++) {
          if(this.$data.dialogForm2[i].children && this.$data.dialogForm2[i].children.length > 0) {
            for(var j = 0; j < this.$data.dialogForm2[i].children.length; j++) {
              if(this.$data.dialogForm2[i].children[j].is_permission === 1) {
                checkedId.push(this.$data.dialogForm2[i].children[j].id);
              }else if (this.$data.dialogForm2[i].children[j].is_permission === 0){
                this.$data.dialogForm2[i].is_permission = 0;
              }
            }
          }
          if(this.$data.dialogForm2[i].is_permission === 1) {
            checkedId.push(this.$data.dialogForm2[i].id);
          }
				}
				this.$data.checkedIds = checkedId;
      },

			submitForm2() {
				let parentIds;
        for(var s=0;s< this.$data.checkedIds.length;s++){
          if(this.$data.checkedIds[s].parent_id != 0){
					  parentIds = this.$refs.tree.getNode(this.$data.checkedIds[s]).parent.data.id;
          }
				}
				this.$data.checkedIds.push(parentIds);
				let arr1 = this.$refs.tree.getCheckedKeys();
        var numSetting ;
        for(let n=0;n<arr1.length;n++){
          numSetting = arr1[n];
          this.$data.checkedIds.push(numSetting);
        }
        let set = new Set(this.$data.checkedIds);
        this.$data.checkedIds = Array.from(set);
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
      cancel(){
        this.$data.editFormVisible = false;
        this.$data.currentId = '';
        this.$data.ruleForm = {
          name: '',
          person_in_charge:'',
          phone:''
        };
        this.clearFormData();
      },
      //清除数据
      clearFormData(){
        this.$data.ruleForm.name = '';
        this.$data.dialogForm2 = [];
        setTimeout(() => {
          this.$refs.ruleForm.resetFields();
          this.$data.dialogFormVisible = false;
          this.$data.dialogForm = [];
        })
      },



		}
	}
