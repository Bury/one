<template>
	<div class="store-box">
		<el-table :data="tableData" border style="width:781px;text-align:center;">
			<el-table-column fixed prop="id" label="ID" width="100"></el-table-column>
	    	<el-table-column prop="name" label="门店" width="200"></el-table-column>
	    	<el-table-column prop="count" label="总数" width="160"></el-table-column>
	    	<el-table-column prop="count" label="待分配数" width="160"></el-table-column>
		    <el-table-column label="操作" width="160">
			    <template slot-scope="scope">
			    	<el-button @click="fnGoPage(scope.row)" type="text" size="small">详情</el-button>
			    </template>
		    </el-table-column>
	    </el-table>

	    <!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;max-width:521px;">
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
	import deviceApi from '../../api/device'
	
	export default{
		name:'store',
		data(){
			return{
				tableData:[],
				pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
				requestParameters: {
	                page: 1,
	                page_size:10
	            },
			}
		},
		created:function(){
			this.storeDeviceSumLists();
		},
		methods:{
			storeDeviceSumLists(){
				let qs = require('querystring');
				deviceApi.storeDeviceSumLists(qs.stringify(this.$data.requestParameters)).then((res) => {
        			if(res.data.errno === 0){
						console.log(res) 
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
	            this.storeDeviceSumLists();
	        },
			fnGoPage(row){
				this.$router.push({
					name: 'StoreDeviceDetailLists',
					query: {
	                    storeId: row.id,
	                    storeName: row.name
	                }
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.store-box{
		.top-box{
			position:relative;
			margin-bottom:40px;
			height: 44px;
			border-bottom:1px solid #d2d2d2;
			
		}
	}

	.el-pagination{
		margin:20px 0;
	  	float: right;
	}
	
</style>