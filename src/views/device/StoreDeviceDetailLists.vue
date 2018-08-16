<template>
	<div class="device-box">
    <div class="top-box">
      <el-button type="primary" size="small" class="add-btn" @click="goBack()">返回</el-button>
    </div>
		<h4>
			所属门店：{{this.$route.query.storeName}}
		</h4>
		<!-- 列表 -->
    <table width="99%" class="table-bordered">
      <thead style="background-color: #d1d1d1">
      <tr height="40">
        <th class="col-md-1 text-center">序号</th>
        <th class="col-md-1 text-center">编号</th>
        <th class="col-md-1 text-center">版本</th>
        <th class="col-md-1 text-center">类型</th>
        <th class="col-md-1 text-center">门店</th>
        <th class="col-md-2 text-center">位置</th>
        <th class="col-md-1 text-center">状态</th>
        <th class="col-md-1 text-center">是否启用</th>
        <!--<th class="col-md-2 text-center">添加时间</th>-->
        <th class="col-md-1 text-center">操作</th>
      </tr>
      </thead>
      <tbody v-if="tableData.length > 0" style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40">
        <td>{{item.id}}</td>
        <td>{{item.device_id}}</td>
        <td>{{item.version}}</td>
        <td>
          {{item.locate == 'other' ? '其他' : '收银'}}
        </td>
        <td>
          {{item.store != null ? item.store.name : '未分配'}}
        </td>
        <td>{{item.locate_desc}}</td>
        <td>{{item.status == 0 ? '断开' : '正常'}}</td>
        <td>{{item.is_start == 0 ? '是' : '否'}}</td>
        <!--<td>{{item.created_at | date(4)}}</td>-->
        <td>
          <el-button v-if="item.store.name" @click="fnDistribution(item)" type="text" size="small">重新分配</el-button>
          <el-button v-else @click="fnDistribution(item)" type="text" size="small">分配</el-button>
        </td>
      </tr>
      </tbody>
      <tbody v-else style="text-align: center">
      <tr>
        <td colspan="10" height="50">暂无数据</td>
      </tr>
      </tbody>
    </table>


	    <!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;max-width:1332px;">
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

		<!-- 分配 -->
		<el-dialog title="分配" :visible.sync="operationFormVisible">
			<h4 style="margin-bottom:10px;">基本信息：</h4>
      <table width="99%" class="table-bordered">
        <thead style="background-color: #d1d1d1">
        <tr height="40">
          <th class="col-md-1 text-center">编号</th>
          <th class="col-md-1 text-center">种类</th>
          <th class="col-md-2 text-center">添加时间</th>
          <th class="col-md-2 text-center">首次启用时间</th>
        </tr>
        </thead>
        <tbody v-if="tableData.length > 0" style="text-align: center">
        <tr v-for="(item,index) in tableData" :key="index" height="40">
          <td>{{item.device_id}}</td>
          <td>{{item.type == 'face' ? '人脸摄像头' : item.type}}</td>
          <td>{{item.created_at | date(4)}}</td>
          <td>{{item.start_at | date(4)}}</td>
        </tr>
        </tbody>
      </table>
			<h4 style="margin:2rem 0;">设置：</h4>
			<el-form :model="operationForm" ref="operationForm" label-width="100px" class="demo-ruleForm" style="margin-bottom:50px;">
				<el-form-item label="是否启用：">
			    	<el-select v-model="operationForm.status" placeholder="请选择">
				        <el-option label="未启用" :value="0"></el-option>
				        <el-option label="已启用" :value="1"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="所属门店：">
			    	<el-select v-model="operationForm.store_id" placeholder="请选择">
				        <el-option v-for="(item,idx) in allStores" :label="allStores[idx].name" :value="allStores[idx].id" :key="idx"></el-option>
				    </el-select>
			    </el-form-item>
		    </el-form>

		  <div slot="footer" class="dialog-footer">
		    <el-button @click="operationCancel">取 消</el-button>
		    <el-button type="primary" @click="operationSubmit">确 定</el-button>
		  </div>
		</el-dialog>

	</div>
</template>
<script src="@/assets/js/device/StoreDeviceDetailLists.js"></script>
<style lang="scss" scoped>
	.el-pagination{
		margin:20px 0;
	  	float: right;
	}
</style>
