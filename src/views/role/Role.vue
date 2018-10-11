<template>
	<div class="role-set-page">
		<div class="top-box">
			<button class="yy-button yy-btn-mini yy-btn-checked add-btn" @click="fnAdds()" onclick="clickTotal('408','新增岗位',1)">新增</button>
		</div>
		<table width="80%" class="yingyanTable">
			<thead>
				<tr height="50">
					<th class="col-md-1 text-center">序号</th>
					<th class="col-md-2 text-center">岗位名称</th>
					<!--<th class="col-md-1 text-center">排序</th>-->
					<th class="col-md-1 text-center">权限</th>
					<th class="col-md-2 text-center">操作</th>
				</tr>
			</thead>
			<tbody style="text-align: center">
				<tr v-for="(item,index) in tableData" :key="index" height="50">
					<td>{{(pagination.currentPage - 1) * 20 + index + 1 }}</td>
					<td>{{item.name}}</td>
					<!--<td>{{item.sort}}</td>-->
					<td>
						<i class="newI color1 el-icon-yy-shezhi1" @click="fnSet(item)"></i>
					</td>
					<td>
						<i class="newI color1 el-icon-yy-Group-" @click="fnEdit(item)"></i>
						<i class="newI color2 el-icon-yy-shanchu" @click="fnRemove(item)" onclick="clickTotal('411','删除岗位',1)"></i>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- 分页 -->
		<div v-if="tableData.length > 0" class="paginationBox">
			<el-pagination
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
		<el-dialog center title="新增岗位" :visible.sync="dialogFormVisible" :before-close="dialogClose">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="名称：" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
        <el-form-item label="权限：">
        <div style="margin:20px 0;overflow:hidden;">
          <el-tree :data="dialogForm" show-checkbox default-expand-all node-key="id" ref="tree"
                   @check-change="change"
                   highlight-current
                   :default-checked-keys="checkedIds"
                   class="permission-tree">
          </el-tree>
        </div>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button plain @click="fnCancel('ruleForm')">取 消</el-button>
				<el-button plain @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>

    <!-- 修改 -->
    <el-dialog center title="修改岗位" :visible.sync="editFormVisible" :before-close="dialogClose">
      <el-form :model="ruleForm" :rules="rulesEdit" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="岗位名称：" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="cancel">取 消</el-button>
        <el-button plain type="primary" @click="submitForm('ruleForm')" onclick="clickTotal('409','修改岗位名称',1)">确 定</el-button>
      </div>
    </el-dialog>

		<!-- 权限管理 -->
		<el-dialog center title="权限管理" :visible.sync="dialogForm2Visible">
			<h4 class="role-info"><span>岗位名称：</span>{{currentName}}</h4>
			<div style="margin:20px 0;overflow:hidden;">
				<h4 class="role-info" style="float:left;"><span>权限：</span></h4>
				<el-tree :data="dialogForm2" show-checkbox default-expand-all node-key="id"
                 ref="tree" highlight-current :default-checked-keys="checkedIds" class="permission-tree">
				</el-tree>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button plain @click="fnCancel">取 消</el-button>
				<el-button plain @click="submitForm2" onclick="clickTotal('410','权限确定',1)">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script src="@/assets/js/role/Role.js"></script>
<style lang="scss" src="@/assets/css/role/Role.scss">
