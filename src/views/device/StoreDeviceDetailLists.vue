<template>
	<div class="device-box">
    <div class="top-box">
      <el-button type="primary" size="small" class="add-btn" @click="goBack()">返回</el-button>
    </div>
		<h4>
			所属门店：{{this.$route.query.storeName}}
		</h4>
		<!-- 列表 -->
    <table width="99%" class="yingyanTable">
      <thead>
      <tr height="50">
        <th class="col-md-1 text-center">序号</th>
        <th class="col-md-2 text-center">编号</th>
        <!-- <th class="col-md-1 text-center">版本</th> -->
        <!-- <th class="col-md-2 text-center">首次启用时间</th> -->
        <th class="col-md-1 text-center">类型</th>
        <th class="col-md-2 text-center">门店</th>
        <th class="col-md-1 text-center">位置</th>
        <th class="col-md-2 text-center">状态</th>
        <!-- <th class="col-md-1 text-center">是否启用</th> -->
        <th class="col-md-3 text-center">操作</th>
      </tr>
      </thead>
      <tbody v-if="tableData.length > 0" style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="50">
        <td>{{(pagination.currentPage - 1) * 20 + index + 1 }}</td>
        <td>{{item.device_id}}</td>
        <!-- <td>{{item.version}}</td> -->
        <!-- <td>{{item.start_at | date(4)}}</td> -->
        <td>
          {{item.locate == 'other' ? '其他' : '收银'}}
        </td>
        <td>
          {{item.store != null ? item.store.name : '未分配'}}
        </td>
        <td>{{item.locate_desc}}</td>
        <td>{{item.status == 0 ? '断开' : '正常'}}</td>
        <!-- <td>{{item.is_start == 0 ? '是' : '否'}}</td> -->
        <td>
          <el-button v-if="item.store.name != ''" @click="fnDistribution(item)" type="text" size="small">重新分配</el-button>
          <el-button v-else @click="fnDistribution(item)" type="text" size="small">分配</el-button>
          <el-button v-if="item.store.name != ''" @click="cancelDeploy(item)" type="text" size="small" style="color: #66B1FF;">取消分配</el-button>
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
		<div v-if="tableData.length > 0" class="paginationBox">
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
    <el-dialog title="分配" :visible.sync="distributionFormVisible">
      <div style="margin-bottom:20px;"><span style="display:inline-block;width:106px;text-align:center;">编号：</span>{{distributionForm.device_id}}</div>
      <el-form :model="distributionForm" :rules="operationRules" ref="distributionForm" label-width="100px" class="demo-ruleForm" style="margin-bottom:50px;">
        <el-form-item label="门店架构：">
          <el-cascader :options="organizes" v-model='dorganizeCode' :props='defaultAttr' @change="dialogStore">
          </el-cascader>
        </el-form-item>
        <el-form-item label="所属门店：" prop="belong_sid">
          <el-select v-model="distributionForm.belong_sid" placeholder="请选择" :no-data-text="dnodatatext">
            <el-option v-for="(item,idx) in dallStores" :label="dallStores[idx].name" :value="dallStores[idx].id" :key="idx">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="distributionCancel">取 消</el-button>
        <el-button type="primary" @click="distributionSubmit">确 定</el-button>
      </div>
    </el-dialog>

	</div>
</template>
<script src="@/assets/js/device/StoreDeviceDetailLists.js"></script>
