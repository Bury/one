<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()" >新增</el-button>
		</div>
    <table width="80%" class="table-bordered">
      <thead style="background-color: #d1d1d1">
      <tr height="50">
        <th class="col-md-2 text-center">ID</th>
        <th class="col-md-2 text-center">门店</th>
        <th class="col-md-2 text-center">负责人</th>
        <th class="col-md-3 text-center">联系方式</th>
        <th class="col-md-3 text-center">操作</th>
      </tr>
      </thead>
      <tbody style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40px">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.person_in_charge}}</td>
        <td>{{item.phone}}</td>
        <td>
          <el-button type="primary" plain icon="el-icon-more" circle size="small"
                     @click="fnGoPage(item)"></el-button>
          <el-button type="warning" plain icon="el-icon-edit" circle size="small"
                     @click="fnEdit(item)"></el-button>
          <el-button type="danger" plain icon="el-icon-delete" circle size="small"
                     @click="fnRemove(item)"></el-button>
        </td>
      </tr>
      </tbody>
    </table>
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
