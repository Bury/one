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
			  this.$router.push('/Notice')
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
		        }).catch(() => {});
			},

		}
	}
</script>
<style lang="scss" scoped>
	.role-set-page{

	}

</style>
