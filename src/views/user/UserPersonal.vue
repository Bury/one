<template>
	<div class="personal-page">
		<div class="top-box">
			<h3>个人资料</h3>
			<div class="editBtn">
				<el-button size="mini" @click="personalSet()">个人设置</el-button>
				<el-button size="mini" @click="fnChangeTel()">修改手机</el-button>
				<el-button size="mini" @click="fnChangePWD()">修改密码</el-button>
			</div>
		</div>
		<el-form ref="userForm" :model="userForm" label-width="75px" enabled>
			<el-form-item label="帐号：">
				{{userForm.username}}
			</el-form-item>
			<el-form-item label="岗位：">
				{{userForm.role_name}}
			</el-form-item>
			<el-form-item label="姓名：">
				{{userForm.truename}}
			</el-form-item>
			<el-form-item label="手机：">
				{{userForm.phone || '暂无手机号'}}
			</el-form-item>
			<div style="text-align:center;">
				<!--<el-button type="primary" @click="fnSaveSubmitForm('userForm')">保 存</el-button>-->
			</div>
		</el-form>

		<!-- 个人设置 -->
		<el-dialog title="个人设置" :visible.sync="dialogSet" width="600px" :before-close="cancelUnit">
			<el-form  label-width="150px" class="demo-ruleForm">
				<el-form-item label="报表时间选择：">
					<el-select v-model="saveUnit" placeholder="请选择">
						<el-option label="按日" value="d">
						</el-option>
						<el-option label="按周" value="w">
						</el-option>
						<el-option label="按月" value="m">
						</el-option>
						<el-option label="按年" value="y">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="cancelUnit">取 消</el-button>
				<el-button size="mini" @click="submitUnit">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 修改密码 -->
		<el-dialog center title="修改密码" :visible.sync="dialogFormVisible" :before-close="dialogClose" style="min-width:800px;">
			<el-form size="mini" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="当前密码：" prop="oldPwd">
					<el-input type="password" v-model="ruleForm.oldPwd"></el-input>
				</el-form-item>
				<el-form-item label="新的密码：" prop="newPwd">
					<el-input type="password" v-model="ruleForm.newPwd"></el-input>
				</el-form-item>
				<el-form-item label="确认密码：" prop="reNewPwd">
					<el-input type="password" v-model="ruleForm.reNewPwd"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="cancel">取 消</el-button>
				<el-button size="mini" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>

		<!--修改手机号-->
		<el-dialog center title="修改手机号" :visible.sync="dialogFormVisibleTel" :before-close="dialogCloseTel" style="min-width:800px;">
			<el-form size="mini" :model="telForm" :rules="rules" ref="telForm" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-form-item label="新手机号：" prop="phone">
						<el-col :span="16">
							<el-input type="tel" v-model="telForm.phone"></el-input>
						</el-col>
						<el-button type="primary" plain @click="code" :class="{disabled: !this.canClick}">{{getClickName}}</el-button>
					</el-form-item>
				</el-row>
				<el-form-item label="验证码：" prop="code">
					<el-col :span="16">
						<el-input type="text" v-model="telForm.code"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="cancelTel">取 消</el-button>
				<el-button size="mini" @click="submitFromTel('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script src="@/assets/js/user/UserPersonal.js"></script>
<style lang="scss" scoped>
	.personal-page {
		margin: 80px auto 0;
		padding: 40px;
		width: 500px;
		border: 1px solid #d2d2d2;
		.top-box {
			position: relative;
			height: 100px;
			.editBtn {
				position: absolute;
				top: 0;
				right: 0;
			}
		}
		.disabled {
			background-color: #ddd;
			border-color: #ddd;
			color: #57a3f3;
			cursor: not-allowed; // 鼠标变化
		}
	}
</style>
