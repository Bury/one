import globalFunctions from '@/config/global_functions'
import globalRules from '@/config/global_rules'

import userApi from '@/api/user'

let clock;

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
        oldPwd:globalRules.rules.password() ,
        newPwd:globalRules.rules.password() ,
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
      },
      getClickName:'获取验证码',
      waitTime:60,
      canClick: true,
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
      setTimeout(() => {
        this.$refs.ruleForm.resetFields();
      })
    },
    dialogClose(){
      this.$data.dialogFormVisible = false;
      this.$data.ruleForm.oldPwd = '';
      this.$data.ruleForm.newPwd = '';
      this.$data.ruleForm.reNewPwd = '';
      setTimeout(() => {
        this.$refs.ruleForm.resetFields();
      })
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
              // alert('修改成功')
              this.$message.success('修改成功');
              this.$data.ruleForm = {};
              this.$data.dialogFormVisible = false;
              setTimeout(() =>{
                this.$refs.ruleForm.resetFields();
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
      if(this.$data.telForm.phone == ''){
        this.$message({
          type:'warning',
          message:'请先输入手机号'
        })
      }else{
        let list = {
          'new_phone': this.$data.telForm.phone,
        };
        let qs = require('querystring');
        userApi.phoneSms(qs.stringify(list)).then((res) => {
          console.log(res.data.msg)
          if(res.data.errno == -1){
            this.$message({
              type: 'warning',
              message: res.data.msg
            });
            this.$data.dialogFormVisibleTel = true;
            this.$data.telForm.phone = '';
          }else{
            this.getMsg();
          }
        })
      }

    },
    submitFromTel(){
      let list = {
        'new_phone': this.$data.telForm.phone,
        'sms_code': this.$data.telForm.code,
      };
      let qs = require('querystring');
      userApi.phoneCheck(qs.stringify(list)).then((res) => {
        if(res.data.errno == 1000002 || res.data.errno == -1){
          this.$message({
            type:'warning',
            message:'请先获取验证码'
          })
        }
        this.$data.telForm.code = res.data.data.sign_code;
        console.log(res.data.data);
        console.log(this.$data.telForm);
        userApi.savePhone(qs.stringify(this.$data.telForm)).then((res) => {
          this.$message({
            type:'success',
            message:'修改成功'
          });
          this.$data.dialogFormVisibleTel = false;
          this.$data.userForm.phone = this.$data.telForm.phone;
          this.$data.telForm.phone = '';
          this.$data.telForm.code = '';
          setTimeout(() => {
            this.$refs.telForm.resetFields();
          })
        })
      })
    },
    cancelTel(){
      setTimeout(() => {
        this.$refs.telForm.resetFields();
        this.$data.dialogFormVisibleTel = false;
      })
      window.clearInterval(clock);
      this.$data.getClickName = '发送验证码';
      this.$data.canClick = true;
    },
    dialogCloseTel(){
      setTimeout(() => {
        this.$refs.telForm.resetFields();
        this.$data.dialogFormVisibleTel = false;
      })
      window.clearInterval(clock);
      this.$data.getClickName = '发送验证码';
      this.$data.canClick = true;
    },
    getMsg(){
      let val = this.$data.telForm.phone;
      if(val.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)){
        if (!this.canClick) return  ;
        this.canClick = false
        this.$data.getClickName = this.$data.waitTime + 's后发送';
        clock = window.setInterval(() => {
          this.$data.waitTime--;
          this.$data.getClickName = this.$data.waitTime + 's后发送';
          if (this.$data.waitTime < 0) {
            window.clearInterval(clock)
            this.$data.getClickName = '发送验证码';
            this.$data.waitTime = 60;
            this.canClick = true  //这里重新开启

          }
        },1000);
      }else{
        this.$message({
          type:'warning',
          message:"请输入正确的手机号"
        })
      }

    },
  }
}
