<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()" >新增</el-button>
		</div>
    <table width="80%" class="table-bordered">
      <thead style="background-color: #d1d1d1">
      <tr height="50">
        <th class="col-md-2 text-center">ID</th>
        <th class="col-md-2 text-center">门店</th>
        <th class="col-md-2 text-center">负责人</th>
        <th class="col-md-3 text-center">联系方式</th>
        <th class="col-md-3 text-center">操作</th>
      </tr>
      </thead>
      <tbody style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40px">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.person_in_charge}}</td>
        <td>{{item.phone}}</td>
        <td>
          <el-button type="primary" plain icon="el-icon-more" circle size="small"
                     @click="fnGoPage(item)"></el-button>
          <el-button type="warning" plain icon="el-icon-edit" circle size="small"
                     @click="fnEdit(item)"></el-button>
          <el-button type="danger" plain icon="el-icon-delete" circle size="small"
                     @click="fnRemove(item)"></el-button>
        </td>
      </tr>
      </tbody>
    </table>
	    <!-- 分页 -->
	    <div v-if="tableData.length > 0" style="margin:0 auto;width:701px;">
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
			  <el-form-item label="门店名称：" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="帐号：" prop="person_in_charge">
			    <el-input v-model="ruleForm.person_in_charge"></el-input>
			  </el-form-item>
			  <el-form-item label="密码：" prop="person_in_charge">
			    <el-input v-model="ruleForm.person_in_charge"></el-input>
			  </el-form-item>
			  <el-form-item label="联系电话：" prop="phone">
			    <el-input v-model="ruleForm.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="省份：" prop="phone">

			  </el-form-item>
			  <el-form-item label="城市：" prop="phone">

			  </el-form-item>
			  <el-form-item label="地区：" prop="phone">

			  </el-form-item>
			  <el-form-item label="详细地址：" prop="phone">
			    <el-input v-model="ruleForm.phone"></el-input>
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
	import storeApi from '../../api/store'

	export default{
		name:'store-set',
		data(){
			return{
				tableData: [],
				pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
		        dialogTitle:"",
				dialogFormVisible: false,
		        ruleForm: {
		          	name: '',
		          	person_in_charge:'',
		          	phone:''
		        },
		        currentId:'',
		        rules: {
		          name: [
		            { required: true, message: '请输入门店名称', trigger: 'blur' },
		            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
		          ],
		          person_in_charge:[
		          	{ required: true, message: '请输入负责人姓名', trigger: 'blur' },
		            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
		          ],
		          phone:[
		          	{ required: true, message: '请输入手机号码', trigger: 'blur' },
		          	{
		                validator: (rule, value, callback) => {
		                    if (value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)
) {
		                        callback();
		                    } else {
		                        callback("请输入正确的手机号码！");
		                    }
		                },
		                trigger: 'blur'
		            }
		          ]
		        },
				requestParameters: {
	                page: 1,
	                page_size:10
	            }
			}
		},
		created:function(){
			this.storeLists();
		},
		methods: {
			//列表
			storeLists(){
				let qs = require('querystring')
	    		storeApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
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
	            this.storeLists();
	        },

			fnRemove(row){
				this.$confirm('确认删除该门店：'+row.name+' ？', '删除提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		            let list = {
						'id': row.id
					}
					let qs = require('querystring')
	        		storeApi.dele(qs.stringify(list)).then((res) => {
	        			console.log(res)
	        			if(res.data.errno === 0){
							console.log(res)
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
							this.storeLists();
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
				this.$data.dialogTitle = '门店编辑';
				this.$data.currentId = row.id;
				this.$data.ruleForm = row;
				this.$data.dialogFormVisible = true;

			},
			fnAdds(){
				this.$data.dialogTitle = '门店添加';
				this.$data.currentId = "";
				this.$data.ruleForm = {
		          	name: '',
		          	person_in_charge:'',
		          	phone:''
		        };
				this.$data.dialogFormVisible = true;
			},
			cancel(){
				this.$data.dialogFormVisible = false;
				this.$data.currentId = '';
				this.$data.ruleForm = {
		          	name: '',
		          	person_in_charge:'',
		          	phone:''
		        };
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
					console.log(valid)
			        if (valid) {
						if(this.$data.currentId !== ''){
							let list = {
								'id': this.$data.currentId,
								'name': this.$data.ruleForm.name,
					          	'person_in_charge':this.$data.ruleForm.person_in_charge,
					          	'phone':this.$data.ruleForm.phone
							}
							let qs = require('querystring')
			        		storeApi.edit(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.$message({
				                      message: '营业时间设置成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.storeLists();
									this.$data.currentId = '';
									this.$data.ruleForm = {
							          	name: '',
							          	person_in_csharge:'',
							          	phone:''
							        };
									this.$data.dialogFormVisible = false;

			        			}else{
									this.$message.error(res.data.msg);
								}

			        		})
						}else{
							let list = {
						        'name': this.$data.ruleForm.name,
					          	'person_in_charge':this.$data.ruleForm.person_in_charge,
					          	'phone':this.$data.ruleForm.phone
						    }
						    let qs = require('querystring')
			        		storeApi.adds(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.$message({
				                      message: '营业时间设置成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.storeLists();
									this.$data.currentId = '';
									this.$data.ruleForm = {
							          	name: '',
							          	person_in_charge:'',
							          	phone:''
							        };
									this.$data.dialogFormVisible = false;

			        			}else{
			        				this.$message.error(res.data.msg);

			        			}

			        		})
						}
			        }
		        });
			},
			fnGoPage(row){
				this.$router.push({
					name: 'StoreAccount',
					query: {
	                    StoreId: row.id,
	                    StoreName:row.name
	                }
				});
			}
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
