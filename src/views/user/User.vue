<template>
	<div class="account-set-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
				<el-form-item label="帐号：">
			    	<el-input v-model="requestParameters.username"></el-input>
			  	</el-form-item>
			  	<el-form-item label="岗位：">
				    <el-select v-model="requestParameters.merchant_role_id" placeholder="请选择">
				        <el-option v-for="(item,idx) in allRoles" :label="allRoles[idx].name" :value="allRoles[idx].id" :key="idx"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="手机号码：">
				    <el-input v-model.trim="requestParameters.phone"></el-input>
				</el-form-item>
				<el-form-item>
				    <el-button type="primary" @click="onSubmitSearch">查询</el-button>
				    <el-button type="primary" @click="resetSearch">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()">新增</el-button>
		</div>
    <table width="99%" class="table-bordered">
      <thead style="background-color: #d1d1d1">
      <tr height="40">
        <th class="col-md-1 text-center">序号</th>
        <th class="col-md-2 text-center">账号</th>
        <th class="col-md-1 text-center">岗位</th>
        <th class="col-md-1 text-center">姓名</th>
        <th class="col-md-1 text-center">手机号码</th>
        <th class="col-md-1 text-center">状态</th>
        <th class="col-md-2 text-center">创建时间</th>
        <th class="col-md-1 text-center">操作</th>
      </tr>
      </thead>
      <tbody v-if="tableData.length > 0" style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40">
        <td>{{item.id}}</td>
        <td>{{item.username}}</td>
        <td>{{item.storeRole.name}}</td>
        <td>{{item.truename}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.status == '1' ? '启用' : '禁用' }}</td>
        <td>{{item.created_at | date(4)}}</td>
        <td>
          <el-button @click="fnEdit(item)" type="primary" size="small" circle plain icon="el-icon-edit"></el-button>
          <el-button @click="fnRemove(item)" type="danger" size="small" circle plain icon="el-icon-delete"></el-button>
        </td>
      </tr>
      </tbody>
			<tbody v-else><tr><td colspan="8" height="50px" align="center">暂无数据~</td></tr></tbody>
    </table>
	    <!-- 分页 -->
	   <div v-if="tableData.length > 0" style="margin:0 auto;width:621px;">
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


		<!-- 添加 -->
	    <el-dialog title="添加" :visible.sync="userDialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="岗位：">
          <el-select v-model="ruleForm.role_id" placeholder="请选择">
            <el-option v-for="(item,idx) in allRoles" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="帐号：" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="truename">
            <el-input v-model="ruleForm.truename"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="fnCancel">取 消</el-button>
				<el-button type="primary" @click="addSubmitForm">确 定</el-button>
			</div>
		</el-dialog>
    <!--编辑-->
    <el-dialog title="编辑" :visible.sync="userEditVisible" :before-close="editDialogClose">
    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="岗位：">
        <el-select v-model="editForm.role_id" placeholder="请选择">
          <el-option v-for="(item,idx) in allRoles" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="帐号：" prop="username">
        <el-input v-model="editForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="editForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="truename">
        <el-input v-model="editForm.truename"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="telephone">
        <el-input v-model="editForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="editForm.status"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="fnEditCancel">取 消</el-button>
      <el-button type="primary" @click="submitForm(editForm)">确 定</el-button>
    </div>
    </el-dialog>
	</div>
</template>

<script src="@/assets/js/user/User.js"></script>
<style lang="scss" scoped src="@/assets/css/user/User.scss">


