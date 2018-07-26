<template>
	<div class="account-set-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
				<el-form-item label="帐号：">
			    	<el-input v-model="requestParameters.username"></el-input>
			  	</el-form-item>
			  	<el-form-item label="部门：">
				    <el-select v-model="requestParameters.department_id" placeholder="请选择">
				      <el-option v-for="(item,idx) in allDepartments" :label="allDepartments[idx].val" :value="allDepartments[idx].id" :key="idx"></el-option>
				    </el-select>
			  	</el-form-item>
			  	<el-form-item label="岗位：">
				    <el-select v-model="requestParameters.role_id" placeholder="请选择">
				        <el-option v-for="(item,idx) in allRoles" :label="allRoles[idx].name" :value="allRoles[idx].id" :key="idx"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="手机号码：">
				    <el-input v-model="requestParameters.telephone"></el-input>
				</el-form-item>
				<el-form-item>
				    <el-button type="primary" @click="onSubmitSearch">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()">新增</el-button>
		</div>
    <table width="99%" class="table-bordered">
      <thead style="background-color: #d1d1d1">
      <tr height="40">
        <th class="col-md-1 text-center">ID</th>
        <th class="col-md-1 text-center">账号</th>
        <th class="col-md-1 text-center">部门</th>
        <th class="col-md-1 text-center">角色</th>
        <th class="col-md-1 text-center">姓名</th>
        <th class="col-md-1 text-center">手机号码</th>
        <th class="col-md-1 text-center">状态</th>
        <th class="col-md-1 text-center">排序</th>
        <th class="col-md-1 text-center">权限</th>
        <th class="col-md-2 text-center">创建时间</th>
        <th class="col-md-2 text-center">操作</th>

      </tr>
      </thead>
      <tbody style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40">
        <td>{{item.id}}</td>
        <td>{{item.username}}</td>
        <td>{{item.department_name}}</td>
        <td>{{item.role_name}}</td>
        <td>{{item.name}}</td>
        <td>{{item.telephone}}</td>
        <td>{{item.status}}</td>
        <td>{{item.sort}}</td>
        <td>
          <el-button type="primary" plain icon="el-icon-setting" circle size="small"
                     @click="fnSet(item)"></el-button>
        </td>
        <td>{{item.created_at | date(4)}}</td>
        <td>
          <el-button @click="fnEdit(item)" type="text" size="small">编辑</el-button>
          <el-button @click="fnRemove(item)" type="text" size="small">删除</el-button>
        </td>
      </tr>
      </tbody>
    </table>

	    <!-- 分页 -->
	   <div v-if="tableData.length > 0" style="margin:0 auto;width:621px;">
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
	    

		<!-- 添加、修改 -->
	    <el-dialog :title="dialogTitle" :visible.sync="userDialogFormVisible">
	    	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="部门：">
			    <el-select v-model="ruleForm.department_id" placeholder="请选择">
				      <el-option v-for="(item,idx) in allDepartments" :label="allRoles[idx].val" :value="allDepartments[idx].id" :key="idx"></el-option>
			    </el-select>
			  </el-form-item>
			</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="角色：">
			  	<el-select v-model="ruleForm.role_id" placeholder="请选择">
				      <el-option v-for="(item,idx) in allRoles" :label="allRoles[idx].val" :value="allRoles[idx].id" :key="idx"></el-option>
			    </el-select>
			  </el-form-item>
			</el-form>
	    	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="帐号：" prop="account">
			    <el-input v-model="ruleForm.account"></el-input>
			  </el-form-item>
		  	</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="密码：" prop="password">
			    <el-input v-model="ruleForm.password"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="姓名：" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="手机号码：" prop="telephone">
			    <el-input v-model="ruleForm.telephone"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="状态：" prop="status">
			    <template slot-scope="scope">
			        <el-switch
			          v-model="ruleForm.status"
			          on-color="#00A854"
			          on-text="启动"
			          on-value="1"
			          active-value="1"
			          off-color="#F04134"
			          off-text="禁止"
			          off-value="0"
			          inactive-value="0"
			          @change="changeSwitch()">
			        </el-switch>
			  	</template>
			  </el-form-item>
			</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="排序：" prop="sort">
			    <el-input v-model="ruleForm.sort" :maxlength="2" style="width:60px"></el-input>
			  </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="fnCancel">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 权限管理 -->
	    <el-dialog title="权限管理" :visible.sync="permissionDialogFormVisible">
		  <h3 class="account-info">岗位名称：{{currentName}}</h3>
		  <div style="margin:20px 0;overflow:hidden;">
		  	<h3 style="float:left;">权限：</h3>
		  	<el-tree
			  :data="dialogForm2"
			  show-checkbox
			  default-expand-all
			  node-key="id"
			  ref="tree"
			  highlight-current
			  :default-checked-keys="checkedIds"
			  style="float:left;padding:20px 40px 20px 20px;height:220px;overflow:auto;border:1px solid #d2d2d2;">
			</el-tree>
		  </div>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="fnCancel">取 消</el-button>
		    <el-button type="primary" @click="submitForm2">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import userApi from '../../api/user'
	import departmentApi from '../../api/department'
	import roleApi from '../../api/role'

	export default{
		name:'account-set',
		data(){
			return {
				tableData: [],
				allDepartments:[],
				allRoles:[],
				pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
		        requestParameters: {
	                page: 1,
	                page_size:10,
	                username:'',
	                department_id:'',
	                role_id:'',
	                telephone:'',
	            },
				dialogTitle:"",
				userDialogFormVisible: false,
		        ruleForm: {
		        	department_id:'',
		          	role_id:'',
		          	name: '',
		          	sort: '0',
		          	status:0,
		        },
		        currentId:'',
		        currentName:'',
		        rules: {
		          account: [
		            { required: true, message: '请输入帐号', trigger: 'blur' },
		            { min: 1, max: 2, message: '长度在 6 到 20 个字符', trigger: 'blur' }
		          ],
		          password: [
		            { required: true, message: '请输入密码', trigger: 'blur' },
		            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
		          ],
		          name: [
		            { required: true, message: '请输入姓名', trigger: 'blur' },
		            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
		          ],
		          telephone: [
		            { required: true, message: '请输入手机号码', trigger: 'blur' },
		            { min: 11, max: 11, message: '长度在11位的有效手机号码', trigger: 'blur' }
		          ],
		          sort: [
		            { required: true, message: '请输入排序', trigger: 'blur' },
		            { min: 1, max: 2, message: '长度在 1 到 2 个数字', trigger: 'blur' }
		          ]
		        },
		        permissionDialogFormVisible:false,
		        dialogForm2: [],
		        checkedIds:[],
			}
		},
		created:function(){
			this.lists();
			this.getDepartments();
			this.getRoles();
		},
		methods: {
			//列表
			lists(){
				let qs = require('querystring')
	    		userApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
	    			if(res==undefined || res=='' || res.data==undefined || res.data==''){
	    				return ;
	    			}
	    			if(res.data.errno === 0){
	    				console.log(res.data.data)
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
	    			}else{
						this.$message.error(res.data.msg);
	    			}
	    		})
	    	},
	    	getDepartments(){
	    		departmentApi.lists_results().then((res) => {
        			if(res.data.errno === 0){
						console.log(res)
						this.$data.allDepartments = res.data.data;
        			}else{

        			}
        		})
	    	},
	    	getRoles(){
				roleApi.lists_results().then((res) => {
        			if(res.data.errno === 0){
						console.log(res)
						this.$data.allRoles = res.data.data;
        			}else{

        			}
        		})
	    	},
	    	handleCurrentChange(currentPage) {
	            this.$data.requestParameters.page = currentPage;
	            this.lists();
	        },
			fnRemove(row){
				this.$confirm('确认删除该角色：'+row.name+' ？', '删除提示', {
		          confirmButtonText: '确定',
		          fnCancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          	let list = {
						'id': row.id
					}
					let qs = require('querystring')
	        		userApi.dele(qs.stringify(list)).then((res) => {
	        			if(res.data.errno === 0){
							this.$message({
					            type: 'success',
					            message: '操作成功'
				          	});
							this.lists();
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
			fnAdds(){
				this.$data.dialogTitle = '添加';
				this.$data.currentId = "";
				this.$data.ruleForm.name = "";
				this.$data.ruleForm.sort = 0;
				this.$data.userDialogFormVisible = true;
				this.getDepartments();
				this.getRoles();
			},
			fnEdit(row){
				this.$data.dialogTitle = '编辑';
				this.$data.currentId = row.id;
				this.$data.ruleForm.name = row.name;
				this.$data.ruleForm.sort = row.sort;
				this.$data.userDialogFormVisible = true;
				this.getDepartments();
				this.getRoles();
			},
			fnCancel(){
				this.$data.userDialogFormVisible = false;
				this.$data.permissionDialogFormVisible = false;
				this.$data.ruleForm.name = '';
				this.$data.ruleForm.name = 0;
				this.$data.currentId = '';
			},
			fuResetRuleForm(){
				this.$data.ruleForm.username = '';
				this.$data.ruleForm.password = '';
				this.$data.ruleForm.name = '';
				this.$data.ruleForm.telephone = '';
				this.$data.ruleForm.status = '';
				this.$data.ruleForm.sort = '';
				this.$data.currentId = '';
				this.$data.userDialogFormVisible = false;
			},
			onSubmitSearch(){
				console.log(this.$data.requestParameters)
				this.lists();
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
			        if (valid) {
						if(this.$data.currentId !== ''){
							let list = {
								'id': this.$data.currentId,
								'username':this.$data.ruleForm.username,
								'password':this.$data.ruleForm.password,
						        'name':this.$data.ruleForm.name,
						        'telephone':this.$data.ruleForm.telephone,
						        'status':this.$data.ruleForm.status,
						        'sort':this.$data.ruleForm.sort
							}
							let qs = require('querystring')
			        		userApi.edit(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.$message({
				                      message: '操作成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.lists();
									this.fuResetRuleForm();
			        			}else{
									this.$message.error(res.data.msg);
								}
			        		})
						}else{
							let list = {
								'username':this.$data.ruleForm.username,
								'password':this.$data.ruleForm.password,
						        'name':this.$data.ruleForm.name,
						        'telephone':this.$data.ruleForm.telephone,
						        'status':this.$data.ruleForm.status,
						        'sort':this.$data.ruleForm.sort
						    }
						    let qs = require('querystring')
			        		userApi.adds(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.$message({
				                      message: '操作成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.lists();
									this.fuResetRuleForm();
			        			}else{
			        				this.$message.error(res.data.msg);

			        			}
			        		})
						}
			        }
		        });
			},

			fnSet(row){
				alert('暂未支持');
				return ;
				this.$data.currentName = row.name;
				this.$data.currentId = row.id;
				let list = {
			        'role_id':row.id
			    }
			    let qs = require('querystring')
        		userApi.allPermission(qs.stringify(list)).then((res) => {
        			if(res.data.errno === 0){
						console.log(res)
						this.$data.dialogForm2 = res.data.data;
						var checkedId = [];
						for(var i=0; i< this.$data.dialogForm2.length; i++){
							var rootIdx = i;
							if(this.$data.dialogForm2[rootIdx].is_permission === 1){
								var len = checkedId.length;
								checkedId[len] = this.$data.dialogForm2[rootIdx].id;

							}
							if(this.$data.dialogForm2[rootIdx].children && this.$data.dialogForm2[rootIdx].children.length>0){
								for(var j=0; j<this.$data.dialogForm2[rootIdx].children.length; j++){
									var childIdx = j;
									if(this.$data.dialogForm2[rootIdx].children[childIdx].is_permission === 1){
										var len = checkedId.length;
										checkedId[len] = this.$data.dialogForm2[rootIdx].children[childIdx].id;

									}
								}
							}
						}
						this.$data.checkedIds = checkedId;
						console.log(this.$data.checkedIds)
        			}else{
        				this.$message.error(res.data.msg);

        			}

        		})
				this.$data.permissionDialogFormVisible = true;
			},

			submitForm2(){
				this.$data.checkedIds = this.$refs.tree.getCheckedKeys();
				console.log(this.$data.currentId)
				console.log(this.$data.checkedIds)
				let list = {
			        'role_id':this.$data.currentId,
			        'permission_ids':this.$data.checkedIds.toString()
			    }
			    let qs = require('querystring')
        		userApi.editPermission(qs.stringify(list)).then((res) => {
        			if(res.data.errno === 0){
						console.log(res)
						this.$data.currentId = '';
						this.$data.permissionDialogFormVisible = false;
        			}else{
        				this.$message.error(res.data.msg);

        			}

        		})
			},
			changeSwitch (data) {
		      console.log(this.$data.ruleForm.status)
		    }
		}
	}
</script>
<style lang="scss" scoped>
	.account-set-page{
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
