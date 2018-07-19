<template>
	<div class="label-list-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdd()">新增</el-button>
		</div>
		<el-table :data="tableData" border height="448" style="width:621px;text-align:center;">
	    	<el-table-column prop="name" label="标签类名" width="320"></el-table-column>
		    <el-table-column label="操作" width="300">
			    <template slot-scope="scope">
			    	<el-button type="primary" plain icon="el-icon-more" circle size="small"
			    		@click="fnGoPage(scope.row)"></el-button>
			    	<el-button type="warning" plain icon="el-icon-edit" circle size="small"
			    		@click="fnEdit(scope.row)"></el-button>
			    	<el-button type="danger" plain icon="el-icon-delete" circle size="small"
			    		@click="fnRemove(scope.row)"></el-button>
			    </template>
		    </el-table-column>
	    </el-table>
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
	    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="标签类名：" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import labelApi from '../../api/label'
	export default{
		name:'label-list',
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
		        },
		        currentId:'',
		        rules: {
		          name: [
		            { required: true, message: '请输入标签类名', trigger: 'blur' },
		            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
		          ]
		        },
		        requestParameters: {
	                page: 1,
	                page_size:10
	            }
		       
			}
		},
		created:function(){
			this.labelList();
		},
		methods: {
			// 列表
			labelList(){
				let qs = require('querystring');
				labelApi.labelList(qs.stringify(this.$data.requestParameters)).then((res) => {
        			if(res.data.errno === 0){
						console.log(res.data.data.list)
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
        			}else{

        			}
        		})
			},
			handleCurrentChange(currentPage) {
	            console.log(currentPage)
	            this.$data.requestParameters.page = currentPage;
	            this.labelList();
	        },
			fnRemove(row){
				this.$confirm('确认删除标签：'+row.name+' ？', '删除', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	let list = {
						'id': row.id
					}
					let qs = require('querystring')
	        		labelApi.deleLabel(qs.stringify(list)).then((res) => {
	        			if(res.data.errno === 0){
							console.log(res)
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
							this.labelList();
	        			}else{
							
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
				this.$data.dialogFormVisible = true;
				
			},
			fnAdd(){
				this.$data.dialogTitle = '添加';
				this.$data.currentId = "";
				this.$data.ruleForm.name = "";
				this.$data.dialogFormVisible = true;
			},
			fnGoPage(row){
				this.$router.push({
					name: 'LabelDetail',
					query: {
	                    LabelId: row.id
	                }
				});
			},

			cancel(){
				this.$data.dialogFormVisible = false;
				this.$data.ruleForm.name = '';
				this.$data.currentId = '';
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
					console.log(valid)
			        if (valid) {
						if(this.$data.currentId !== ''){
							let list = {
								'id': this.$data.currentId,
								'name':this.$data.ruleForm.name
							}
							let qs = require('querystring')
			        		labelApi.editLabel(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.labelList();

			        			}else{

			        			}
			        			
			        		})
						}else{
							let list = {
						        'name':this.$data.ruleForm.name
						    }
						    let qs = require('querystring')
			        		labelApi.addLabel(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.labelList();

			        			}else{

			        			}
			        			
			        		})
						}
						this.$data.ruleForm.name = '';
						this.$data.currentId = '';
						this.$data.dialogFormVisible = false;
			        } 
		        });
			},
		}
	}
</script>
<style lang="scss" scoped>
	.label-list-page{
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