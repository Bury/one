<template>

	<div class="store-set-page">
		<div class="top-box">
			<button class="yy-button yy-btn-mini yy-btn-checked add-btn" @click="fnAdds()">创建账号</button>
		</div>
		<el-form :inline="true" ref="searchForm" size="mini">
			<el-form-item label="门店架构：">
				<el-cascader v-model="organizeCode" :options="organizes" :props='defaultAttr' @change="getStore">
				</el-cascader>
			</el-form-item>
			<el-form-item label="门店：">
				<el-select v-model="requestParameters.store_id" placeholder="请选择" :no-data-text="nodatatext">
					<el-option v-for="(item,index) in selectStore" :key="index" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="账号：">
				<el-input type="text" v-model.trim="requestParameters.username"></el-input>
			</el-form-item>
			<el-form-item label="姓名：">
				<el-input type="text" v-model.trim="requestParameters.truename"></el-input>
			</el-form-item>
			<el-form-item label="手机：">
				<el-input type="text" v-model.trim="requestParameters.phone"></el-input>
			</el-form-item>
			<el-form-item label="岗位：">
				<el-select v-model="requestParameters.merchant_role_id" placeholder="请选择">
					<el-option v-for="(item,index) in allRole" :key="index" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item>
				<el-button plain @click="clickSearch">查询</el-button>
				<el-button plain @click="resetForm">重置</el-button>
			</el-form-item>
		</el-form>
		<table width="100%" class="yingyanTable">
			<thead>
				<tr height="50">
					<th class="col-md-1 text-center">序号</th>
					<th class="col-md-2 text-center">门店架构</th>
					<th class="col-md-2 text-center">门店</th>
					<th class="col-md-1 text-center">账号</th>
					<th class="col-md-1 text-center">状态</th>
					<th class="col-md-1 text-center">姓名</th>
					<th class="col-md-1 text-center">手机</th>
					<th class="col-md-1 text-center">岗位</th>
					<th class="col-md-2 text-center">操作</th>
				</tr>
			</thead>
			<tbody style="text-align: center">
				<template v-if='tableData.length > 0'>
					<tr v-for="(item,index) in tableData" :key="index" height="50">
						<td>{{(pagination.currentPage - 1) * 20 + index + 1 }}</td>
						<td>{{item.organizes.name}}</td>
						<td>{{item.store != null ? item.store.name : ""}}</td>
						<td>{{item.username}}</td>
						<td>{{item.status === 1 ? '启用' : '禁用'}}</td>
						<td>{{item.truename}}</td>
						<td>{{item.phone}}</td>
						<td>{{item.storeRole.name}}</td>
						<td>
							<i class="newI color1 el-icon-yy-suo1" @click="fnEditPassword(item)"></i>
							<i class="newI color1 el-icon-yy-Group-" @click="fnEdit(item)"></i>
							<i class="newI color2 el-icon-yy-shanchu" @click="fnRemove(item)"></i>
						</td>
					</tr>
				</template>
				<tr v-else>
					<td colspan="8" style="height: 50px;">暂无数据</td>
				</tr>
			</tbody>
		</table>
		<!-- 分页 -->
		<div v-if="tableData.length > 0" class="paginationBox">
			<el-pagination  class="pagination" layout="prev, pager, next" small @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="requestParameters.page_size" :total="pagination.totalCount">
			</el-pagination>
		</div>

		<!-- 编辑 -->
		<el-dialog center title="编辑" :visible.sync="editFormVisible">
			<el-form :model="editFormData" :rules="editRules" ref="editFormData" label-width="100px" class="demo-ruleForm">
				<el-form-item label="帐号：" prop="username">
					<el-input :disabled="true" v-model.trim="editFormData.username"></el-input>
				</el-form-item>
				<el-form-item label="姓名：" prop="truename">
					<el-input v-model.trim="editFormData.truename"></el-input>
				</el-form-item>
				<el-form-item label="手机：" prop="phone">
					<el-input v-model.trim="editFormData.phone"></el-input>
				</el-form-item>
				<el-form-item style="display: inline-block;" label="门店架构：">
					<el-cascader v-model="editFormOrganize" :options="organizes" :props='defaultAttr' @change="editGetSotre">
					</el-cascader>
				</el-form-item>
				<el-form-item style="display: inline-block;" label="门店：" prop="store_id">
					<el-select v-model="editFormData.store_id" placeholder="请选择" :no-data-text="noeditStore">
						<el-option v-for="(item,index) in editStore" :key="index" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="岗位：" prop="role_id">
					<el-select v-model="editFormData.role_id" style="width: 100%;" placeholder="请选择">
						<el-option v-for="(item,idx) in allRole" :label="allRole[idx].name" :value="allRole[idx].id" :key="idx"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态：">
					<el-switch v-model="editFormData.status" :active-value="1"  :inactive-value="0">
					</el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button plain @click="editCancel">取 消</el-button>
				<el-button plain @click="editSubmit('editFormData')">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 修改密码 -->
		<el-dialog center title="修改密码" :visible.sync="changePwdFormVisible">
			<el-form :model="changePwdFormData" :rules="changePwdRules" ref="changePwdFormData" label-width="100px" class="demo-ruleForm">
				<el-form-item label="新密码：" prop="password">
					<el-input type="password" v-model="changePwdFormData.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码：" prop="repassword">
					<el-input type="password" v-model="changePwdFormData.repassword"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button plain @click="editPasswordCancel">取 消</el-button>
				<el-button plain @click="editPasswordSubmit('changePwdFormData')">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 添加 -->
		<el-dialog center :title="!avatarFormVisible? '创建账号' : '关联头像'" :visible.sync="addsFormVisible" :fullscreen="avatarFormVisible" :before-close="closeChange">
			<el-form :model="addsFormData" :rules="addsRules" ref="addsFormData" label-width="100px" class="demo-ruleForm" v-if="!avatarFormVisible">
				<el-form-item label="帐号：" prop="username">
					<el-input v-model.tirm="addsFormData.username"></el-input>
				</el-form-item>
				<el-form-item label="姓名：" prop="truename">
					<el-input v-model.trim="addsFormData.truename"></el-input>
				</el-form-item>
				<el-form-item label="手机：" prop="phone">
					<el-input v-model.trim="addsFormData.phone"></el-input>
				</el-form-item>
				<el-form-item style="display: inline-block;" label="门店架构：">
					<el-cascader v-model="addFormOrganize" :options="organizes" :props='defaultAttr' @change="addGetSotre">
					</el-cascader>
				</el-form-item>
				<el-form-item style="display: inline-block;" label="门店：" prop="store_id">
					<el-select v-model="addsFormData.store_id" placeholder="请选择" :no-data-text="noeditStore">
						<el-option v-for="(item,index) in addStore" :key="index" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="岗位：" prop="role_id">
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
				<el-button plain @click="addCancel">取 消</el-button>
				<el-button plain @click="addsSubmit('addsFormData')" onclick="clickTotal('400','新建账号确定',1)">确 定</el-button>
			</div>
			<!--<guest-list v-if="avatarFormVisible" :avatarFormVisible="avatarFormVisible" @getChildData="getAvatarData"></guest-list>-->
		</el-dialog>

	</div>
</template>
<script src="@/assets/js/store/StoreAccountManage.js"></script>
<style lang="scss" scoped src="@/assets/css/store/StoreAccountManage.scss">
