//import Guest from '../../guest/Guest'
	import storeRole from '@/api/store_role'
	import storeAccountApi from '@/api/store_account'
	import globalRules from '@/config/global_rules'

	export default{
		name:'accoun-set',
		/*
		components: {
		   Guest
		},
		*/
		data(){
			return{
				tableData: [],
				pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
				requestParameters: {
					store_id:'',
					username:'',
					truename:'',
					phone:'',
					merchant_role_id:'',
	                page: 1,
	                page_size:20,	                
	            },
	            editFormVisible:false,
	            allRole:[],
	            editFormData:{
	            	id:'',
	            	store_id:'',
	            	username:'',
	            	truename:'',
	            	phone:'',
	            	role_id:''
	            },
	            editRules:{
	            	username: globalRules.rules.username('请输入账号'),
		          	truename: globalRules.rules.truename(),
		          	role_id: globalRules.rules.selectRule('请选择岗位'),
	            },
	            changePwdFormVisible:false,
	            changePwdFormData:{
	            	id:'',
	            	password:'',
	            	repassword:'',
	            },
	            changePwdRules:{
	            	password:globalRules.rules.password(),
	            	repassword:[
	            		{ required: true, message: '请再次输入密码', trigger: 'blur' },
			            {
			                validator: (rule, value, callback) => {
			                    if (value !== this.$data.changePwdFormData.password) {
			                        callback(new Error('两次输入密码不一致!'));
			                    } else {
			                        callback();
			                    }
			                },
			                trigger: 'blur'
			            }

	            	]
	            },
	            addsFormVisible:false,
	            addsFormData:{
	            	store_id:'',
	            	username:'',
	            	truename:'',
	            	phone:'',
	            	role_id:'',	            	
	            	password:'',
	            },
	            addsRules:{
	            	username:globalRules.rules.username('请输入账号'),
	            	truename:globalRules.rules.truename(),
	            	phone:globalRules.rules.phone(),	            	
	            	role_id:globalRules.rules.selectRule('请选择岗位'),
	            	password:globalRules.rules.password(),
	            	repassword:[
	            		{ required: true, message: '请再次输入密码', trigger: 'blur' },
			            {
			                validator: (rule, value, callback) => {
			                    if (value !== this.$data.addsFormData.password) {
			                        callback(new Error('两次输入密码不一致!'));
			                    } else {
			                        callback();
			                    }
			                },
			                trigger: 'blur'
			            }
	            	]
	            },
	            avatarFormVisible:false
			}
		},
		watch: {
               addsFormVisible(){
               	 setTimeout(() => {
               		this.$refs.addsFormData.clearValidate()
               	},0)
               },
               editFormVisible(){
               	 setTimeout(() => {
               		this.$refs.editFormData.clearValidate()
               	},0)
               }
        },
		created:function(){
			this.accountLists();	
			this.getRoleLists();
		},
		methods: {
			//列表
			accountLists(){
				this.$data.requestParameters.store_id = this.$route.query.StoreId;
				let qs = require('querystring');
				storeAccountApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
	    			if(res.data.errno === 0){
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
	    			}else{
						this.$message.error(res.data.msg);
	    			}
	    		})
	    	},
	    	handleCurrentChange(currentPage) {
	            this.$data.requestParameters.page = currentPage;
	            this.accountLists();
	        },

			fnRemove(row){
				this.$confirm('确认删除该帐号：'+row.username+' ？', '删除提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          let list = {
						'id': row.id
					}
					let qs = require('querystring')
	        		storeAccountApi.dele(qs.stringify(list)).then((res) => {
	        			if(res.data.errno === 0){
							this.$message({
					            type: 'success',
					            message: '操作成功'
					          });
							this.accountLists();
	        			}else{
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
			fnEdit(row){				
				this.$data.editFormData = {
					id:row.id,
					store_id:row.store.id,
	            	username:row.username,
	            	truename:row.truename,
	            	phone:row.phone,
	            	role_id:row.role_id
				}
				this.$data.editFormVisible = true;
			},
			
			getRoleLists(){
				let qs = require('querystring')
	    		storeRole.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
	    			if(res.data.errno === 0){
						this.$data.allRole = res.data.data.list;
	    			}else{
						this.$message.error(res.data.msg);
	    			}
	    		})
	    	},
			editCancel(){
				this.$data.editFormVisible = false;
				this.$data.editFormData = {
					id:'',
					store_id:'',
	            	username:'',
	            	truename:'',
	                phone:'',
	                role_id:''
				}
			},
			editSubmit(formName){				
				this.$refs[formName].validate((valid) => {
			        if (valid) {
						let qs = require('querystring')
		        		storeAccountApi.edit(qs.stringify(this.$data.editFormData)).then((res) => {
		        			if(res.data.errno === 0){
								this.$message({
						            type: 'success',
						            message: '操作成功'
					          	});
								this.accountLists();
								this.$data.editFormData = {
									id:'',
									store_id:'',
	            	                username:'',
	            	                truename:'',
	                              	phone:'',
	                             	role_id:''
								}
								this.$data.editFormVisible = false;

		        			}else{
								this.$message.error(res.data.msg);
							}

		        		})

			        }
		        });

			},
			fnEditPassword(row){
				this.$data.changePwdFormVisible = true;
				this.$data.changePwdFormData = {
					id:row.id,
					password:'',
	            	repassword:'',
				}
			},
			editPasswordCancel(){
				this.$data.changePwdFormVisible = false;
				this.$data.changePwdFormData = {
					id:'',
					password:'',
	            	repassword:'',
				}
			},
			editPasswordSubmit(formName){
				this.$refs[formName].validate((valid) => {
			        if (valid) {
						let qs = require('querystring')
		        		storeAccountApi.password_edit(qs.stringify(this.$data.changePwdFormData)).then((res) => {
		        			if(res.data.errno === 0){
								this.$message({
						            type: 'success',
						            message: '操作成功'
					          	});
								this.accountLists();
								this.$data.changePwdFormData = {
									id:'',
									password:'',
					            	repassword:'',
								}
								this.$data.changePwdFormVisible = false;

		        			}else{
								this.$message.error(res.data.msg);
							}

		        		})

			        }
		        });

			},
			fnClearAddsFormData(){
				this.$data.addsFormData = {
	            	store_id:'',
	            	username:'',
	            	truename:'',
	            	role_id:'',
	            	phone:'',
	            	password:''
	            };
			},

			fnAdds(){
				this.fnClearAddsFormData();
				this.$data.addsFormVisible = true;
			},
			//头像选择
			getAvatarData(childData){
	        	this.$data.avatarFormVisible = false;
	        	this.$data.addsFormData.avatar = childData.avatar;
	        	this.$data.addsFormData.customer_id = childData.customer_id;
	        },
			addCancel(){
				this.$data.addsFormVisible = false;
				this.fnClearAddsFormData();
			},
			addsSubmit(formName){
				this.$refs[formName].validate((valid) => {
			        if (valid) {
			        	this.$data.addsFormData.store_id = this.$route.query.StoreId;
						let qs = require('querystring');					
		        		storeAccountApi.adds(qs.stringify(this.$data.addsFormData)).then((res) => {
		        			if(res.data.errno === 0){
								this.$message({
						            type: 'success',
						            message: '操作成功'
					          	});
								this.accountLists();
								this.fnClearAddsFormData();
								this.$data.addsFormVisible = false;
		        			}else{
								this.$message.error(res.data.msg);
							}

		        		})

			        }
		        });

			},
			closeChange(done){
	            // done();
	            if(this.$data.avatarFormVisible){
	            	this.$data.avatarFormVisible = false;
	            }else{
	            	done()
	            }
	        },
	        searchList(){
	          this.accountLists();	        	
	        },
	        resetList(){
	          this.$data.requestParameters = {
					store_id:'',
					username:'',
					truename:'',
					phone:'',
					merchant_role_id:'',
	                page: 1,
	                page_size:20,	                
	           };
	        	
	        }


		}
	}