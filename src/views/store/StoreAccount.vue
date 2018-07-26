<template>

	<div class="store-set-page">
		<h3>
			{{this.$route.query.StoreName}}
		</h3>
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()">新增</el-button>
		</div>
    <div style="display: flex;text-align: center">
      <el-col :span="15">
		    <el-table :data="tableData" border height="448" style="width:820px;text-align:center;">
			<el-table-column prop="id" label="ID" width="80"></el-table-column>
	    	<el-table-column prop="username" label="帐号" width="160"></el-table-column>
	    	<el-table-column prop="storeRole.name" label="岗位" width="100"></el-table-column>
	    	<el-table-column prop="truename" label="姓名" width="100"></el-table-column>
	    	<el-table-column label="创建时间" width="180">
	    		<template slot-scope="scope">
	    			{{scope.row.created_at | date(4)}}
	    		</template>
	    	</el-table-column>
		    <el-table-column label="操作" width="220">
			    <template slot-scope="scope">
			    	<el-button type="primary" plain icon="el-icon-setting" circle size="small"
			    		@click="fnEditPassword(scope.row)"></el-button>
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
	    <div v-if="tableData.length > 0" style="margin:0 auto;width:961px;">
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

	    <!-- 编辑 -->
	    <el-dialog title="编辑" :visible.sync="editFormVisible">
		  <el-form :model="editFormData" :rules="editRules" ref="editFormData" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="帐号：" prop="username">
			    <el-input v-model="editFormData.username"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名：" prop="truename">
			    <el-input v-model="editFormData.truename"></el-input>
			  </el-form-item>
			  <el-form-item label="角色：" prop="role_id">
			    <el-select v-model="editFormData.role_id" placeholder="请选择">
				    <el-option v-for="(item,idx) in allRole" :label="allRole[idx].name" :value="allRole[idx].id" :key="idx"></el-option>
				</el-select>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editCancel">取 消</el-button>
		    <el-button type="primary" @click="editSubmit('editFormData')">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="changePwdFormVisible">
		  <el-form :model="changePwdFormData" :rules="changePwdRules" ref="changePwdFormData" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="新密码：" prop="password">
			    <el-input type="password" v-model="changePwdFormData.password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码：" prop="repassword">
			    <el-input type="password" v-model="changePwdFormData.repassword"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editPasswordCancel">取 消</el-button>
		    <el-button type="primary" @click="editPasswordSubmit('changePwdFormData')">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 添加 -->
		<el-dialog :title="!avatarFormVisible? '添加' : '关联头像'" :visible.sync="addsFormVisible" :fullscreen="avatarFormVisible" :before-close="closeChange" >
		  <el-form :model="addsFormData" :rules="addsRules" ref="addsFormData" label-width="100px" class="demo-ruleForm" v-if="!avatarFormVisible" >
			  <el-form-item label="帐号：" prop="username">
			    <el-input v-model="addsFormData.username"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名：" prop="truename">
			    <el-input v-model="addsFormData.truename"></el-input>
			  </el-form-item>
			  <el-form-item label="角色：" prop="role_id">
			    <el-select v-model="addsFormData.role_id" placeholder="请选择">
				    <el-option v-for="(item,idx) in allRole" :label="allRole[idx].name" :value="allRole[idx].id" :key="idx"></el-option>
				</el-select>
			  </el-form-item>
			  <!--<el-form-item label="头像：" prop="avatar">
			    <el-input v-model="addsFormData.avatar" style="display:none;"></el-input>
			    <img v-if="addsFormData.avatar !== '' " :src="addsFormData.avatar" style="display:inline-block;width:60px;height:60px;border:1px solid #ccc;">
			    <el-button type="primary" size="small" plain @click="">选择头像</el-button>
			  </el-form-item>-->
			  <el-form-item label="初始密码：" prop="password">
			    <el-input type="password" v-model="addsFormData.password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码：" prop="repassword">
			    <el-input type="password" v-model="addsFormData.repassword"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer" v-if="!avatarFormVisible">
		    <el-button @click="addCancel">取 消</el-button>
		    <el-button type="primary" @click="addsSubmit('addsFormData')">确 定</el-button>
		  </div>
		  <!--<guest-list v-if="avatarFormVisible" :avatarFormVisible="avatarFormVisible" @getChildData="getAvatarData"></guest-list>-->
		</el-dialog>

	</div>
</template>
<script src="@/assets/js/store/StoreAccount.js"></script>
<style lang="scss" scoped src="@/assets/css/store/StoreAccount.scss">
	

