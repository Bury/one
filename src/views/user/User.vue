<template>
	<div class="account-set-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
				<el-form-item label="帐号：">
			    	<el-input v-model="requestParameters.username"></el-input>
			  	</el-form-item>
			  	<el-form-item label="岗位：">
				    <el-select v-model="requestParameters.role_id" placeholder="请选择">
				        <el-option v-for="(item,idx) in allRoles" :label="allRoles[idx].name" :value="allRoles[idx].id" :key="idx"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="手机号码：">
				    <el-input v-model="requestParameters.telephone"></el-input>
				</el-form-item>
				<el-form-item>
				    <el-button type="primary" @click="onSubmitSearch">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()">新增</el-button>
		</div>
    <table width="99%" class="table-bordered">
      <thead style="background-color: #d1d1d1">
      <tr height="40">
        <th class="col-md-1 text-center">ID</th>
        <th class="col-md-1 text-center">账号</th>
        <th class="col-md-1 text-center">角色</th>
        <th class="col-md-1 text-center">姓名</th>
        <th class="col-md-1 text-center">手机号码</th>
        <th class="col-md-1 text-center">状态</th>
        <th class="col-md-1 text-center">排序</th>
        <th class="col-md-1 text-center">权限</th>
        <th class="col-md-2 text-center">创建时间</th>
        <th class="col-md-2 text-center">操作</th>
      </tr>
      </thead>
      <tbody style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40">
        <td>{{item.id}}</td>
        <td>{{item.username}}</td>
        <td>{{item.role_name}}</td>
        <td>{{item.name}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.status = '1' ? '启用' : '禁用' }}</td>
        <td>{{item.sort}}</td>
        <td>
          <el-button type="primary" plain icon="el-icon-setting" circle size="small"
                     @click="fnSet(item)"></el-button>
        </td>
        <td>{{item.created_at | date(4)}}</td>
        <td>
          <el-button @click="fnEdit(item)" type="text" size="small">编辑</el-button>
          <el-button @click="fnRemove(item)" type="text" size="small">删除</el-button>
        </td>
      </tr>
      </tbody>
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


		<!-- 添加、修改 -->
	    <el-dialog :title="dialogTitle" :visible.sync="userDialogFormVisible">
	    	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="角色：">
			  	<el-select v-model="ruleForm.role_id" placeholder="请选择">
				      <el-option v-for="(item,idx) in allRoles" :label="allRoles[idx].val" :value="allRoles[idx].name" :key="idx"></el-option>
			    </el-select>
			  </el-form-item>
			</el-form>
	    	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="帐号：" prop="account">
			    <el-input v-model="ruleForm.account"></el-input>
			  </el-form-item>
		  	</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="密码：" prop="password">
			    <el-input v-model="ruleForm.password"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="姓名：" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="手机号码：" prop="telephone">
			    <el-input v-model="ruleForm.telephone"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="状态：" prop="status">
			    <template slot-scope="scope">
			        <el-switch
			          v-model="ruleForm.status"
			          on-color="#00A854"
			          on-text="启动"
			          on-value="1"
			          active-value="1"
			          off-color="#F04134"
			          off-text="禁止"
			          off-value="0"
			          inactive-value="0"
			          @change="changeSwitch()">
			        </el-switch>
			  	</template>
			  </el-form-item>
			</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="排序：" prop="sort">
			    <el-input v-model="ruleForm.sort" :maxlength="2" style="width:60px"></el-input>
			  </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="fnCancel">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 权限管理 -->
	    <el-dialog title="权限管理" :visible.sync="permissionDialogFormVisible">
		  <h3 class="account-info">岗位名称：{{currentName}}</h3>
		  <div style="margin:20px 0;overflow:hidden;">
		  	<h3 style="float:left;">权限：</h3>
		  	<el-tree
			  :data="dialogForm2"
			  show-checkbox
			  default-expand-all
			  node-key="id"
			  ref="tree"
			  highlight-current
			  :default-checked-keys="checkedIds"
			  style="float:left;padding:20px 40px 20px 20px;height:220px;overflow:auto;border:1px solid #d2d2d2;">
			</el-tree>
		  </div>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="fnCancel">取 消</el-button>
		    <el-button type="primary" @click="submitForm2">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script src="@/assets/js/user/User.js"></script>
<style lang="scss" scoped src="@/assets/css/user/User.scss">


