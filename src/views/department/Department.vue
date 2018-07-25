<template>
	<div class="role-set-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()">新增</el-button>
		</div>
    <div style="display: flex;text-align: center">
      <el-col :span="22">
		    <el-table :data="tableData" border height="448" style="text-align:center;">
			<el-table-column prop="id" label="ID" width="220"></el-table-column>
	    	<el-table-column prop="name" label="名称" width="320"></el-table-column>
	    	<el-table-column prop="sort" label="排序" width="220"></el-table-column>
	    	<el-table-column label="权限" width="220">
	    		<template slot-scope="scope">
	    			<el-button type="primary" plain icon="el-icon-setting" circle size="small"
			    		@click="fnSet(scope.row)"></el-button>
	    		</template>
	    	</el-table-column>
		    <el-table-column label="操作" width="220">
			    <template slot-scope="scope">
			    	<el-button type="warning" plain icon="el-icon-edit" circle size="small"
			    		@click="fnEdit(scope.row)"></el-button>
			    	<el-button type="danger" plain icon="el-icon-delete" circle size="small"
			    		@click="fnRemove(scope.row)"></el-button>
			    </template>
		    </el-table-column>
	    </el-table>
      </el-col>
    </div>

	    <!-- 分页 -->
	    <!--
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
	    -->

		<!-- 添加、修改 -->
	    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="名称：" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="排序：" prop="sort">
			    <el-input v-model="ruleForm.sort"  style="width:60px"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="fnCancel">取 消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 权限管理 -->
	    <el-dialog title="权限管理" :visible.sync="dialogForm2Visible">
		  <h3 class="role-info">岗位名称：{{currentName}}</h3>
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
	import roleApi from '../../api/role'
	export default{
		name:'role-set',
		data(){
			return {
				tableData: [],
				pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
				dialogTitle:"",
				dialogFormVisible: false,
		        ruleForm: {
		          	name: '',
		          	sort: '0',
		        },
		        currentId:'',
		        currentName:'',
		        rules: {
		          name: [
		            { required: true, message: '请输入名称', trigger: 'blur' },
		            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
		          ],
		          sort: [
		            { required: true, message: '请输入排序', trigger: 'blur' },
		            { validator:(rule,value,callback) =>{
	        			if(/^[0-9]{1,2}$/.test(value)){
	        				callback();
	        			}else{
	        				callback("长度在 1 到 2 个数字")
	        			}
	        		 },
	        		trigger:'blur'}
		          ]
		        },
		        dialogForm2Visible:false,
		        dialogForm2: [],
		        checkedIds:[],
		        requestParameters: {
	                page: 1,
	                page_size:10
	            }

			}
		},
		created:function(){
			this.lists();
		},
		methods: {
			//列表
			lists(){
				let qs = require('querystring')
	    		roleApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
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
	        		roleApi.dele(qs.stringify(list)).then((res) => {
	        			if(res.data.errno === 0){
							console.log(res)
							this.$message({
					            type: 'success',
					            message: '删除成功!'
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
			fnEdit(row){
				console.log(row);
				this.$data.dialogTitle = '编辑';
				this.$data.currentId = row.id;
				this.$data.ruleForm.name = row.name;
				this.$data.ruleForm.sort = row.sort;
				this.$data.dialogFormVisible = true;

			},
			fnAdds(){
				this.$data.dialogTitle = '添加';
				this.$data.currentId = "";
				this.$data.ruleForm.name = "";
				this.$data.ruleForm.sort = 0;
				this.$data.dialogFormVisible = true;
			},
			fnCancel(){
				this.$data.dialogFormVisible = false;
				this.$data.dialogForm2Visible = false;
				this.$data.ruleForm.name = '';
				this.$data.ruleForm.sort = 0;
				this.$data.currentId = '';
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
					console.log(valid)
			        if (valid) {
						if(this.$data.currentId !== ''){
							let list = {
								'id': this.$data.currentId,
								'name':this.$data.ruleForm.name,
								'sort':this.$data.ruleForm.sort
							}
							let qs = require('querystring')
			        		roleApi.edit(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.$message({
				                      message: '操作成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.lists();
									this.$data.ruleForm.name = '';
									this.$data.ruleForm.sort = 0;
									this.$data.currentId = '';
									this.$data.dialogFormVisible = false;

			        			}else{
									this.$message.error(res.data.msg);
								}

			        		})
						}else{
							let list = {
						        'name':this.$data.ruleForm.name,
						        'sort':this.$data.ruleForm.sort
						    }
						    let qs = require('querystring')
			        		roleApi.adds(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.$message({
				                      message: '操作成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.lists();
									this.$data.ruleForm.name = '';
									this.$data.ruleForm.sort = '';
									this.$data.currentId = '';
									this.$data.dialogFormVisible = false;

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
        		roleApi.allPermission(qs.stringify(list)).then((res) => {
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
				this.$data.dialogForm2Visible = true;
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
        		roleApi.editPermission(qs.stringify(list)).then((res) => {
        			if(res.data.errno === 0){
						console.log(res)
						this.$data.currentId = '';
						this.$data.dialogForm2Visible = false;
        			}else{
        				this.$message.error(res.data.msg);

        			}

        		})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.role-set-page{
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
