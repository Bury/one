<template>
	<div class="store-box">
    <table width="80%" class="table-bordered">
      <thead style="background-color: #d1d1d1">
      <tr height="40">
        <th class="col-md-3 text-center">序号</th>
        <th class="col-md-3 text-center">门店</th>
        <th class="col-md-3 text-center">设备数</th>
        <th class="col-md-3 text-center">操作</th>
      </tr>
      </thead>
      <tbody style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40">
        <td>{{(pagination.currentPage - 1) * 20 + index + 1 }}</td>
        <td>{{item.name}}</td>
        <td>{{item.deviceFaceCount}}</td>
        <td><el-button @click="fnGoPage(item)" type="text" size="small">详情</el-button></td>

      </tr>
      </tbody>
    </table>

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
<script src="@/assets/js/store/StoreDeviceSumLists.js"></script>
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
