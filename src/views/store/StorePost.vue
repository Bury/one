<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()">新增</el-button>
		</div>
		<table width="60%" class="table-bordered">
			<thead style="background-color: #d1d1d1">
				<tr height="40">
					<th class="col-md-2 text-center">序号</th>
					<th class="col-md-4 text-center">岗位名称</th>
					<th class="col-md-2 text-center">权限</th>
					<th class="col-md-4 text-center">操作</th>
				</tr>
			</thead>
			<tbody style="text-align:center;">
				<tr v-for="(item,index) in tableData" :key="index">
					<td height="40px">{{item.id}}</td>
					<td>{{item.name}}</td>
					<td><el-button type="primary" plain icon="el-icon-setting" circle size="small" @click="fnSetting(item)"></el-button></td>
					<td>
						<el-button type="warning" plain icon="el-icon-edit" circle size="small" @click="fnEdit(item)"></el-button>
						<el-button type="danger" plain icon="el-icon-delete" circle size="small" @click="fnRemove(item)"></el-button>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;width:701px;">
			<el-pagination background class="pagination" layout="prev, pager, next" small @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="requestParameters.page_size" :total="pagination.totalCount">
			</el-pagination>
		</div>

		<!-- 添加-->
		<el-dialog title="添加岗位" :visible.sync="dialogFormVisible" :before-close="closeDialog">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="岗位名称：" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
        <el-form-item label="权限：">
          <div style="margin:20px 0;overflow:hidden;">
            <el-tree :data="dialogForm" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :default-checked-keys="checkedIds" class="permission-tree">
            </el-tree>
          </div>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改岗位" :visible.sync="editFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="岗位名称：" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--权限-->
    <el-dialog title="权限管理" :visible.sync="dialogForm2Visible">
      <h4 class="role-info"><span>岗位名称：</span>{{currentName}}</h4>
      <div style="margin:20px 0;overflow:hidden;">
        <h4 class="role-info" style="float:left;"><span>权限：</span></h4>
        <el-tree :data="dialogForm2" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :default-checked-keys="checkedIds" class="permission-tree">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fnCancel">取 消</el-button>
        <el-button type="primary" @click="submitForm2">确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>
<script src="@/assets/js/store/StorePost.js"></script>
<style lang="scss" src="@/assets/css/store/StorePost.scss"></style>
