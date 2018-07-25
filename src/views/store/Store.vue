<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()" >新增</el-button>
		</div>
    <div style="display: flex;text-align: center">
      <el-col :span="15">
      <el-table :data="tableData" border height="448" style="text-align:center;">
        <el-table-column fixed prop="id" label="ID" width="100"></el-table-column>
          <el-table-column prop="name" label="门店" width="220"></el-table-column>
          <el-table-column prop="person_in_charge" label="负责人" width="140"></el-table-column>
          <el-table-column prop="phone" label="联系方式" width="130"></el-table-column>
          <el-table-column label="去除重复" width="130">
          	 <template slot-scope="scope">
               <el-button v-if="scope.row.is_distinct === 1" type="text" @click="switchRepet(scope.row,0)">开启</el-button>
               <el-button v-if="scope.row.is_distinct === 0" type="text" @click="switchRepet(scope.row,1)">关闭</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button type="primary" plain icon="el-icon-more" circle size="small"
                @click="fnGoPage(scope.row)"></el-button>
              <el-button type="warning" plain icon="el-icon-edit" circle size="small"
                @click="fnEdit(scope.row)"></el-button>
              <el-button type="danger" plain icon="el-icon-delete" circle size="small"
                @click="fnRemove(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </div>
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
			  <el-form-item label="联系电话：" prop="phone">
			    <el-input v-model="ruleForm.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="省/市/区：">
				    <el-cascader
                      :options="cityData"
                      v-model="cityArr"
                      :props="props"
                      @change="getCityCode">
                    </el-cascader>
				</el-form-item>	
			  <el-form-item label="详细地址：" prop="address">
			    <el-input v-model="ruleForm.address"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script src="@/assets/js/store/Store.js"></script>
<style lang="scss" scoped src="@/assets/css/store/Store.scss">
