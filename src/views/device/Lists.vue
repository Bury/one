<template>
	<div class="device-box">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
				<el-form-item label="编号：">
			    	<el-input v-model="requestParameters.device_id"></el-input>
			  	</el-form-item>
			  	<el-form-item label="版本：">
				    <el-select v-model="requestParameters.version" placeholder="请选择">
				      <el-option v-for="(item,idx) in allVersions" :label="allVersions[idx].val" :value="allVersions[idx].val" :key="idx"></el-option>
				    </el-select>
			  	</el-form-item>
			  	<el-form-item label="类型：">
				    <el-select v-model="requestParameters.belong_sido" placeholder="请选择">
				        <el-option label="收银" value="cashier"></el-option>
                        <el-option label="其他" value="other"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="省/市/区：">
				    <el-cascader
                      :options="cityData"
                      v-model="selectedOptions"
                      :props="props">
                    </el-cascader>
				</el-form-item>	
				<el-form-item label="门店：">
				    <el-select v-model="requestParameters.belong_sid" placeholder="请选择">
				        <el-option v-for="(item,idx) in allStores" :label="allStores[idx].name" :value="allStores[idx].id" :key="idx"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item>
				    <el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
	    <el-tabs @tab-click="handleClick">
		    <el-tab-pane label="已分配" name="first"></el-tab-pane>
		    <el-tab-pane label="待分配" name="second"></el-tab-pane>
	  	</el-tabs>

		<!-- 列表 -->
    <div style="display: flex;">
      <el-col :span="24" style="text-align:center;">
		    <el-table :data="tableData" border  style="width:93.5%;text-align:center;margin: 0 auto;">
			<el-table-column fixed prop="id" label="ID" width="80%"></el-table-column>
	    	<el-table-column prop="device_id" label="编号" width="140%"></el-table-column>
		    <el-table-column prop="version" label="版本" width="100%"></el-table-column>
		    <el-table-column  label="类型" width="100%">
		    	<template slot-scope="scope">
		    		{{scope.row.locate === "cashier" ? "收银" : "其他"}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="门店" width="220%">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.store.name.length>0">
				          {{scope.row.store.name}}
				    </span>
				    <span v-else>未分配</span>
		    	</template>
		    </el-table-column>
		    <el-table-column label="位置" width="160%">
		    	<template slot-scope="scope">
		    		{{scope.row.locate_desc}}
		    	</template>
		    </el-table-column>
		    <el-table-column prop="status" label="运行情况" width="90%">
		    	<template slot-scope="scope">
		    		{{scope.row.status == 0 ? '断开' : '正常'}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="是否启用" width="160%">
		    	<template slot-scope="scope">
		    		{{scope.row.is_start == 0 ? '是' : '否'}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="添加时间" width="160%">
		    	<template slot-scope="scope">
		    		{{scope.row.created_at | date(2)}}
		    	</template>
		    </el-table-column>
		    <el-table-column  label="操作" width="160%">
		        <template slot-scope="scope">
		    		<span v-if="scope.row.store.name.length>0">
				          <el-button @click="fnDistribution(scope.row)" type="text" size="small" >重新分配</el-button>
				    </span>
				    <span v-else><el-button @click="fnDistribution(scope.row)" type="text" size="small" >分配</el-button></span>
		    	</template>
		    </el-table-column>
	    </el-table>
      </el-col>
  </div>
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
		<el-dialog title="分配" :visible.sync="distributionFormVisible">
			<div style="margin-bottom:20px;"><span style="display:inline-block;width:106px;text-align:center;">设备编号：</span>{{distributionForm.device_id}}</div>
		 	<el-form :model="distributionForm" :rules="operationRules" ref="distributionForm" label-width="100px" class="demo-ruleForm" style="margin-bottom:50px;">
			    <el-form-item label="省/市/区：">
				    <el-cascader
                      :options="cityData"
                      v-model="selectedOptions"
                      :props="props">
                    </el-cascader>
				</el-form-item>			    
			    <el-form-item label="所属门店：" prop="belong_sid">
			    	<el-select v-model="distributionForm.belong_sid" placeholder="请选择">
				        <el-option v-for="(item,idx) in allStores" :label="allStores[idx].name" :value="allStores[idx].id" :key="idx"></el-option>
				    </el-select>
			    </el-form-item>
		    </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="distributionCancel">取 消</el-button>
		    <el-button type="primary" @click="distributionSubmit">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 编辑 -->
		<el-dialog title="编辑" :visible.sync="editFormVisible">
			<div style="margin-bottom:20px;"><span style="display:inline-block;width:100px;text-align:center;">设备编号：</span>{{editForm.device_id}}</div>
			<div style="margin-bottom:20px;"><span style="display:inline-block;width:100px;text-align:center;">所属门店：</span>{{editForm.store_name}}</div>
		 	<el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px" class="demo-ruleForm" style="margin-bottom:50px;">
			    <el-form-item label="类型：">
			    	<el-select v-model="editForm.locate" placeholder="请选择">
				        <el-option label="收银" value="cashier"></el-option>
				        <el-option label="其他" value="other"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="安装位置：" prop="locate_desc">
			    	<el-input v-model="editForm.locate_desc"></el-input>
			  	</el-form-item>
		    </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editCancel">取 消</el-button>
		    <el-button type="primary" @click="editSubmit('editForm')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script src="@/assets/js/device/Lists.js"></script>
<style lang="scss" scoped  src="@/assets/css/device/Lists.scss">
	

