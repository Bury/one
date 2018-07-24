//import Guest from '../../guest/Guest'
	import roleApi from '@/api/role'
	import storeAccountApi from '@/api/store_account'

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
	                page: 1,
	                page_size:10,
	                sid:''
	            },
	            editFormVisible:false,
	            allRole:[],
	            editFormData:{
	            	id:'',
	            	username:'',
	            	desc:'',
	            	role_name:''
	            },
	            editRules:{
	            	username: [
		            	{ required: true, message: '请输入帐号', trigger: 'blur' },
		            	{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
		          	],
		          	desc:[
		          		{ required: true, message: '请输入姓名', trigger: 'blur' },
		            	{ min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
		          	],
		          	role_id:[
		          		{ required: true, message: '请选择角色', trigger: 'blur' }
		          	]
	            },
	            changePwdFormVisible:false,
	            changePwdFormData:{
	            	id:'',
	            	password:'',
	            	repassword:'',
	            },
	            changePwdRules:{
	            	new_password:[
	            		{ required: true, message: '请输入新密码：', trigger: 'blur' },
            			{ min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
	            	],
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
	            	desc:'',
	            	role_id:'',
	            	avatar:'',
	            	password:'',
	            	repassword:'',
	            	customer_id:''

	            },
	            addsRules:{
	            	store_id:[
	            		{ required: true, message: '请输入店铺名称', trigger: 'blur' },
		            	{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
	            	],
	            	username:[
	            		{ required: true, message: '请输入帐号称', trigger: 'blur' },
		            	{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
	            	],
	            	desc:[
	            		{ required: true, message: '请输入姓名姓名', trigger: 'blur' },
		            	{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
	            	],
	            	role_id:[
	            		{ required: true, message: '请选择角色', trigger: 'blur' },
	            	],
	            	avatar:[
	            		{ required: true, message: '请选择头像', trigger: 'blur' }
	            	],
	            	password:[
	            		{ required: true, message: '请输入新密码：', trigger: 'blur' },
            			{ min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
	            	],
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
		created:function(){
			this.accountLists();
		},
		methods: {
			//列表
			accountLists(){
				this.$data.requestParameters.sid = this.$route.query.StoreId;
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
				this.getRoleLists();
				this.viewAccount(row.id);
			},
			viewAccount(id){
				let qs = require('querystring')
        		storeAccountApi.view(qs.stringify({
        			id:id
        		})).then((res) => {
        			if(res.data.errno === 0){
						this.$data.editFormData = res.data.data;
						this.$data.editFormVisible = true;

        			}else{
						this.$message.error(res.data.msg);
					}

        		})
			},
			getRoleLists(){
				let qs = require('querystring')
	    		roleApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
	    			console.log(res)
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
					username:'',
					desc:'',
					role_id:''
				}
			},
			editSubmit(formName){
				console.log(this.$data.editFormData)
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
									username:'',
									desc:'',
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
	            	desc:'',
	            	role_id:'',
	            	avatar:'',
	            	password:'',
	            	repassword:'',
	            	customer_id:'',

	            };
			},

			fnAdds(){
				this.fnClearAddsFormData();
				this.getRoleLists();
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
				this.$data.addsFormData.avatar='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531579299157&di=8c51bd304046d2aa79540b0f764dd2a6&imgtype=0&src=http%3A%2F%2Fimg4.a0bi.com%2Fttq%2F20170105%2F1483589492564.jpeg';
				this.$data.addsFormData.customer_id=1;

				this.$refs[formName].validate((valid) => {
			        if (valid) {
			        	this.$data.addsFormData.store_id = this.$route.query.StoreId;
						let qs = require('querystring')
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


		}
	}