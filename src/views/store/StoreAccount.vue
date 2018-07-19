<template>

	<div class="store-set-page">
		<h4>
			{{this.$route.query.storeName}}
		</h4>
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()">新增</el-button>
		</div>
		<el-table :data="tableData" border height="448" style="width:822px;text-align:center;">
			<el-table-column prop="id" label="ID" width="80"></el-table-column>
	    	<el-table-column prop="username" label="帐号" width="160"></el-table-column>
	    	<el-table-column prop="role_name" label="角色" width="100"></el-table-column>
	    	<el-table-column prop="role_desc" label="姓名" width="100"></el-table-column>
	    	<el-table-column label="创建时间" width="160">
	    		<template slot-scope="scope">
	    			{{scope.row.created_at | date(4)}}
	    		</template>
	    	</el-table-column>
		    <el-table-column label="操作" width="220">
			    <template slot-scope="scope">
			    	<el-button type="primary" plain icon="el-icon-setting" circle size="small"
			    		@click="fnEditPassword(scope.row)"></el-button>
			    	<el-button type="warning" plain icon="el-icon-edit" circle size="small"
			    		@click="fnEdit(scope.row)"></el-button>
			    	<el-button type="danger" plain icon="el-icon-delete" circle size="small"
			    		@click="fnRemove(scope.row)"></el-button>
			    </template>
		    </el-table-column>
	    </el-table>
	    <!-- 分页 -->
	    <div v-if="tableData.length > 0" style="margin:0 auto;width:961px;">
	    	<el-pagination 
				background
	            class="pagination" 
	            layout="prev, pager, next" 
	            small 
	            @current-change="handleCurrentChange" 
	            :current-page="pagination.currentPage" 
	            :page-size="requestParameters.page_size"
	            :total="pagination.totalCount">
	        </el-pagination>
	    </div>

	    <!-- 编辑 -->
	    <el-dialog title="编辑" :visible.sync="editFormVisible">
		  <el-form :model="editFormData" :rules="editRules" ref="editFormData" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="帐号：" prop="username">
			    <el-input v-model="editFormData.username"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名：" prop="desc">
			    <el-input v-model="editFormData.desc"></el-input>
			  </el-form-item>
			  <el-form-item label="角色：" prop="role_id">
			    <el-select v-model="editFormData.role_id" placeholder="请选择">
				    <el-option v-for="(item,idx) in allRole" :label="allRole[idx].name" :value="allRole[idx].id" :key="idx"></el-option>
				</el-select>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editCancel">取 消</el-button>
		    <el-button type="primary" @click="editSubmit('editFormData')">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="changePwdFormVisible">
		  <el-form :model="changePwdFormData" :rules="changePwdRules" ref="changePwdFormData" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="新密码：" prop="password">
			    <el-input type="password" v-model="changePwdFormData.password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码：" prop="repassword">
			    <el-input type="password" v-model="changePwdFormData.repassword"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editPasswordCancel">取 消</el-button>
		    <el-button type="primary" @click="editPasswordSubmit('changePwdFormData')">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 添加 -->
		<el-dialog :title="!avatarFormVisible? '添加' : '关联头像'" :visible.sync="addsFormVisible" :fullscreen="avatarFormVisible" :before-close="closeChange" >
		  <el-form :model="addsFormData" :rules="addsRules" ref="addsFormData" label-width="100px" class="demo-ruleForm" v-if="!avatarFormVisible" >
			  <el-form-item label="帐号：" prop="username">
			    <el-input v-model="addsFormData.username"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名：" prop="desc">
			    <el-input v-model="addsFormData.desc"></el-input>
			  </el-form-item>
			  <el-form-item label="角色：" prop="role_id">
			    <el-select v-model="addsFormData.role_id" placeholder="请选择">
				    <el-option v-for="(item,idx) in allRole" :label="allRole[idx].name" :value="allRole[idx].id" :key="idx"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="头像：" prop="avatar">
			    <el-input v-model="addsFormData.avatar" style="display:none;"></el-input>
			    <img v-if="addsFormData.avatar !== '' " :src="addsFormData.avatar" style="display:inline-block;width:60px;height:60px;border:1px solid #ccc;">
			    <el-button type="primary" size="small" plain @click="avatarFormVisible=true">选择头像</el-button>
			  </el-form-item>
			  <el-form-item label="初始密码：" prop="password">
			    <el-input type="password" v-model="addsFormData.password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码：" prop="repassword">
			    <el-input type="password" v-model="addsFormData.repassword"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer" v-if="!avatarFormVisible">
		    <el-button @click="addCancel">取 消</el-button>
		    <el-button type="primary" @click="addsSubmit('addsFormData')">确 定</el-button>
		  </div>
		  <guest-list v-if="avatarFormVisible" :avatarFormVisible="avatarFormVisible" @getChildData="getAvatarData"></guest-list>
		</el-dialog>
		
	</div>
</template>
<script>
	//import Guest from '../../guest/Guest'
	import roleApi from '../../api/role'
	import storeAccountApi from '../../api/store_account'
	
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
				let qs = require('querystring')
	    		storeAccountApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
	    			if(res.data.errno === 0){
						console.log(res);
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
	    			}else{
						this.$message.error(res.data.msg);
	    			}
	    		})
	    	},
	    	handleCurrentChange(currentPage) {
	            console.log(currentPage)
	            this.$data.requestParameters.page = currentPage;
	            this.storeList();
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
							console.log(res)
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
				console.log(row);
				this.getRoleLists();
				this.viewAccount(row.id);
			},
			viewAccount(id){
				let qs = require('querystring')
        		storeAccountApi.view(qs.stringify({
        			id:id
        		})).then((res) => {
        			if(res.data.errno === 0){
						console.log(res)
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
	    			if(res.data.errno === 0){
						console.log(res);
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
				this.$refs[formName].validate((valid) => {
					console.log(valid)
			        if (valid) {
						let qs = require('querystring')
		        		storeAccountApi.edit(qs.stringify(this.$data.editFormData)).then((res) => {
		        			if(res.data.errno === 0){
								console.log(res)
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
				console.log(row)
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
					console.log(valid)
			        if (valid) {
			        	
						let qs = require('querystring')
		        		storeAccountApi.password_edit(qs.stringify(this.$data.changePwdFormData)).then((res) => {
		        			if(res.data.errno === 0){
								console.log(res)
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
					console.log(valid)
			        if (valid) {
			        	this.$data.addsFormData.store_id = this.$route.query.StoreId;
						let qs = require('querystring')
		        		storeAccountApi.adds(qs.stringify(this.$data.addsFormData)).then((res) => {
		        			if(res.data.errno === 0){
								console.log(res)
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
</script>
<style lang="scss" scoped>
	.store-set-page{
		.top-box{
			position:relative;
			margin-bottom:20px;
			height: 36px;
			border-bottom:1px solid #d2d2d2;
			.add-btn{
				position: absolute;
				top:0;
				right:20px;

			}
		}
	}
	.el-pagination{
		margin:20px 0;
	  	float: right;
	}
</style>