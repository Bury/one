<template>
	<div class="role-set-page">
    <table width="90%" class="table-bordered">
      <thead style="background-color: #d1d1d1">
      <tr height="40">
        <th class="col-md-2 text-center">标题</th>
        <th class="col-md-3 text-center">内容</th>
        <th class="col-md-2 text-center">操作人</th>
        <th class="col-md-2 text-center">时间</th>
        <th class="col-md-2 text-center">操作</th>
      </tr>
      </thead>
      <tbody style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40">
        <td>{{item.id}}</td>
        <td>{{item.username}}</td>
        <td>{{item.role_name}}</td>
        <td>{{item.role_name}}</td>
        <td>
          <el-button @click="fnCheck(item)" type="text" size="small">查看</el-button>
          <el-button @click="fnRemove(item)" type="text" size="small">删除</el-button>
        </td>
      </tr>
      </tbody>
    </table>
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
      fnCheck(){
			  this.$router.push('/Check')
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
			fnEdit(){

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
				this.$data.ruleForm.name = 0;
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
