<template>
	<div class="personal-page">
		<div class="top-box">
			<h3>个人资料</h3>
			<div class="editBtn">
				<el-button type="primary" plain @click="fnChangePWD()">修改密码</el-button>
			</div>
		</div>
		<el-form ref="userForm" :model="userForm" label-width="75px" enabled>
      <el-form-item label="帐号：">
        {{username}}
      </el-form-item>
      <el-form-item label="岗位：">
        {{role_name}}
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="userForm.truename"></el-input>
      </el-form-item>
      <el-form-item label="手机：">
        <el-input v-model="userForm.phone"></el-input>
      </el-form-item>
      <div style="text-align:center;">
        <el-button type="primary" @click="fnSaveSubmitForm('userForm')">保 存</el-button>
      </div>
		</el-form>

		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" style="min-width:800px;">
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		    <el-form-item label="当前密码：" prop="oldPwd">
		      <el-input type="password" v-model="ruleForm.oldPwd" ></el-input>
		    </el-form-item>
		    <el-form-item label="新的密码：" prop="newPwd">
		      <el-input type="password" v-model="ruleForm.newPwd" ></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码：" prop="reNewPwd">
		      <el-input type="password" v-model="ruleForm.reNewPwd" ></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
  import globalFunctions from '@/config/global_functions'
	import userApi from '../../api/user'

  export default {
  	name:'personal',
    data() {
      return {
        username:'',
        role_name:'',
        dialogFormVisible: false,
        ruleForm: {
          oldPwd:'',
          newPwd:'',
          reNowPwd:''
        },
        rules: {
          oldPwd: [
            { required: true, message: '请输入当前密码：', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          newPwd: [
            { required: true, message: '请输入新的密码：', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          reNewPwd: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    if (value !== this.$data.ruleForm.newPwd) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                },
                trigger: 'blur'
            }
          ]
        },
        userForm:{
          truename:'',
          phone:'',
        },
      }
    },
    created:function(){
    	this.getUserInfo();
    },
    methods: {
      getUserInfo(){
        userApi.getUserInfo().then((res) => {
          if(res.data.errno === 0){
            console.log(res);
            this.$data.username = res.data.data.user.username;
            this.$data.role_name = res.data.data.user.role_name;
            this.$data.userForm.name = res.data.data.user.truename;
            this.$data.userForm.phone = res.data.data.user.phone;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      fnChangePWD(){
      	this.$data.dialogFormVisible = true;
      },
      cancel(){
      	this.$data.dialogFormVisible = false;
      	this.$data.ruleForm.oldPwd = '';
        this.$data.ruleForm.newPwd = '';
        this.$data.ruleForm.reNewPwd = '';
      },
      fnSaveSubmitForm(formName){
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            let list = {
              'truename':this.$data.userForm.truename,
              'phone':this.$data.userForm.phone
            }
            let qs = require('querystring')
            userApi.edi(qs.stringify(list)).then((res) => {
              if(res.data.errno === 0){
                globalFunctions.functions.message(this,'success');
              }else{
                this.$message.error(res.data.msg);
              }
            })
          }
        });
      },
      submitForm(formName){
		this.$refs[formName].validate((valid) => {
			console.log(valid)
	        if (valid) {
	        	let list = {
					'old_password': this.$data.ruleForm.oldPwd,
					'new_password':this.$data.ruleForm.newPwd,
					'new_password2':this.$data.ruleForm.reNewPwd
				}
				let qs = require('querystring')
				userApi.changePWD(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0){
						alert('操作成功')
						userApi.logout().then((res1) => {
							if(res1.data.errno === 0){
								localStorage.setItem('knock_knock', '')
            					localStorage.setItem('username', '')
								this.$router.replace({
									name: 'UserLogin'
								});
							}else{
								this.$message.error(res1.data.msg);
							}
						})

					}else{
						this.$message.error(res.data.msg);
					}
				})
	        }
        });
      },

    }
  }
</script>
<style lang="scss" scoped>
	.personal-page{
		margin:80px auto 0;
		padding:40px;
		width:500px;
		border:1px solid #d2d2d2;
		.top-box{
			position: relative;
			height: 100px;
			.editBtn{
				position:absolute;
				top:0;
				right:0;
			}
		}
	}

</style>
