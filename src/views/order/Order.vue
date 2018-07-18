<template>
	<div class="guest-list-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
			  <el-form-item label="订单编号：">
			    <el-input v-model="requestParameters.no"></el-input>
			  </el-form-item>
			  <el-form-item label="商品名称：">
			    <el-input v-model="requestParameters.product_name"></el-input>
			  </el-form-item>
			  <el-form-item label="收银时间：">
				<el-date-picker
			      v-model="cashTimes"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始时间"
			      end-placeholder="结束时间">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="创建时间：">
				<el-date-picker
			      v-model="createdTimes"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始时间"
			      end-placeholder="结束时间">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
		<el-table :data="tableData" border style="width: 1598px;text-align:center;">
		    <el-table-column prop="no" label="订单编号" width="160"></el-table-column>
		    <el-table-column prop="product_name" label="商品名称" width="160"></el-table-column>
		    <el-table-column prop="price" label="成交金额" width="120"></el-table-column>
		    <el-table-column label="客户人脸" width="80">
		    	<template slot-scope="scope">
		           <img :src="scope.row.traffic. avatar" style="display:block;margin:0 auto;width:100%;">
		        </template>
		    </el-table-column>
		    <el-table-column prop="customer_name" label="客户姓名" width="160"></el-table-column>
		    <el-table-column label="客户类型" width="160">
		    	<template slot-scope="scope">
			    	<span v-if="scope.row.traffic.is_new == 1 && scope.row.traffic.vip_level == 1">新客</span>
			    	<span v-if="scope.row.traffic.is_new == 0 && scope.row.traffic.vip_level == 1">熟客</span>
		    	</template>
		    </el-table-column>
		    <el-table-column label="收银时间" width="160">
		    	<template slot-scope="scope">
		    		{{scope.row.cash_t | date(4)}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="创建时间" width="160">
		    	<template slot-scope="scope">
		    		{{scope.row.created_at | date(4)}}
		    	</template>
		    </el-table-column>
		    <el-table-column fixed="right" label="操作" width="150">
			    <template slot-scope="scope">
			        <el-button @click="fnEdit(scope.row)" type="text" size="small">编辑</el-button>
			        <el-button @click="fnRemove(scope.row)" type="text" size="small">删除</el-button>
			    </template>
		    </el-table-column>
	    </el-table>

	    <!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;max-width:1551px;">
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
	</div>
</template>
<script>
	import OrderApi from '../../api/order'
    export default {
        name:'guest-list',
        components: {
		   
		},
        data(){
            return{
		        tableData: [],
		        pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
		        cashTimes:['',''],
		        createdTimes:['',''],
		        requestParameters: {
	                page: 1,
	                page_size:10,
	                no:'',
	                id:'',
	                product_name:'',
	                price_start:'',
	                price_end:'',
	                cash_t_start:'',
	                cash_t_end:'',
	                created_at_start:'',
	                created_at_end:''
	            },
            }
        },
        created: function () {
		    this.lists();
		},
        methods: {
        	//列表
        	lists(){
        		this.$data.requestParameters.cash_t_start = this.$data.cashTimes[0];
        		this.$data.requestParameters.cash_t_end = this.$data.cashTimes[1];
        		this.$data.requestParameters.created_at_start = this.$data.createdTimes[0];
        		this.$data.requestParameters.created_at_end = this.$data.createdTimes[1];

        		let qs = require('querystring'); 
        		OrderApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
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
	            this.lists();
	        },
        	onSubmit() {
		        this.lists();
		    },
		    fnRemove(row){
				this.$confirm('确认删除该订单：'+row.no+' ？', '删除提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	let list = {
						'id': row.id
					}
					let qs = require('querystring')
	        		orderApi.deleOrder(qs.stringify(list)).then((res) => {
	        			console.log(res)
	        			if(res.data.errno === 0){
							console.log(res)
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
							this.storeList();
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
	    },
    }
</script>
<style lang="scss" scoped>
	.el-table thead{
		color:#333; 
	}
</style>