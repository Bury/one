import globalFunctions from '@/config/global_functions'
import globalRules from '@/config/global_rules'

import userApi from '@/api/user'

export default {
  name:'personal',
  data() {
    return {
      userForm:{},
      dialogFormVisible: false,
      ruleForm: {
        oldPwd:'',
        newPwd:'',
        reNowPwd:''
      },
      rules: {
        phone:globalRules.rules.phone(),
        code:globalRules.rules.code(),
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
      dialogFormVisibleTel:false,
      telForm:{
        phone:'',
        code:''
      }
    }
  },
  created:function(){
    this.getUserInfo();
  },
  methods: {
    getUserInfo(){
      userApi.getUserInfo().then((res) => {
        if(res.data.errno === 0){
          this.$data.userForm = res.data.data.user;
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
        if (valid) {
          let list = {
            'old_password': this.$data.ruleForm.oldPwd,
            'new_password':this.$data.ruleForm.newPwd,
            'new_password2':this.$data.ruleForm.reNewPwd
          }
          let qs = require('querystring')
          userApi.changePWD(qs.stringify(list)).then((res) => {
            if(res.data.errno === 0){
              alert('修改成功')
              userApi.logout().then((res1) => {
                if(res1.data.errno === 0){
                  sessionStorage.setItem('knock_knock', '')
                  sessionStorage.setItem('username', '')
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


    //修改手机号
    fnChangeTel(){
      this.$data.dialogFormVisibleTel = true;
    },
    code(){
      console.log(151515);
    },
    cancelTel(){
      setTimeout(() => {
        this.$refs.telForm.resetFields();
        this.$data.dialogFormVisibleTel = false;
      })
    },
    dialogClose(){
      setTimeout(() => {
        this.$refs.telForm.resetFields();
        this.$data.dialogFormVisibleTel = false;
      })
    },
    submitFormTel(){

    },

  }
}
