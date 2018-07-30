<template>
	<div class="role-set-page">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
      <el-col :span="12">
      <el-form-item label="标题：">
        <el-input></el-input>
      </el-form-item>
      </el-col>
      </el-row>
      <el-form-item label="内容：" prop="account">
        <el-input></el-input>
      </el-form-item>
    </el-form>
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

	    	handleCurrentChange(currentPage) {
	            console.log(currentPage)
	            this.$data.requestParameters.page = currentPage;
	            this.lists();
	        },
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
