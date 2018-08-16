import userApi from '@/api/user.js'
import globalRules from '@/config/global_rules'
import globalFunctions from '@/config/global_functions'

let clock;
export default {
  name: 'login-form',
  data () {
    return {
      getClickName:'获取验证码',
      waitTime:60,
      canClick: true,
      status:1,
      loginInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写登录帐号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请填写登录密码', trigger: 'blur' },
        ]
      },
      dialogFormVisible:false,
      passwordEditForm:{
        passwordOld:'',
        passwordCurrent:'',
        passwordRepeat:'',
      },
      rulesPasswordEdit: {
        passwordOld: globalRules.rules.password(6,20,'请输入当前密码'),
        passwordCurrent: globalRules.rules.password(6,20,'请输入新的密码'),
        passwordRepeat: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.$data.passwordEditForm.passwordCurrent) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      },
      passwordVisible:false,
      passwordForm:{
        username:'',
        new_password:'',
        new_password2:'',
        code:'',
        phone:'',
      },
      rulesPwd:{
        username:globalRules.rules.username('请输入帐号'),
        phone:globalRules.rules.phone(),
      },
      passwordVisibleSecond:false,
      passwordVisibleThird:false,
      getMsgAfter:false,
    }
  },
  created: function () {

  },
  mounted: function () {
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let qs = require('querystring');
          userApi.login(qs.stringify(this.$data.loginInfo)).then((res) => {
            if(res.data.errno === 0){
              console.log(res);
              sessionStorage.setItem('knock_knock', res.data.data.access_token)
              sessionStorage.setItem('username', res.data.data.user.username)
              if(res.data.data.user.is_change_pwd == 0){
                this.$data.dialogFormVisible = true;
              }else{
                this.$router.push('/Statistics');
              }
              // this.$router.replace({name: 'Statistics'})
            }else if(res.data.msg === '此账号被禁用'){
              this.$message.error(res.data.msg);
              this.$data.status = 0
            }else {
              this.$message.error(res.data.msg);
            }
          })

        } else {
          return false
        }
      })
    },

    //修改密码
    fnPasswordEditSubmitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(this.$data.passwordEditForm.passwordOld==this.$data.passwordEditForm.passwordCurrent){
          globalFunctions.functions.message(this,'error','新的密码与当前密码不能相同');
          return false;
        }else{
          if(this.$data.passwordEditForm.passwordCurrent==this.$data.passwordEditForm.passwordRepeat){
            if (valid) {
              let list = {
                'old_password':this.$data.passwordEditForm.passwordOld,
                'new_password':this.$data.passwordEditForm.passwordCurrent,
                'new_password2':this.$data.passwordEditForm.passwordRepeat
              }
              let qs = require('querystring')
              userApi.changePWD(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                  globalFunctions.functions.message(this,'success','修改成功');
                  this.$data.dialogFormVisible = false;
                  this.$data.passwordEditForm.passwordOld = '';
                  this.$data.passwordEditForm.passwordCurrent = '';
                  this.$data.passwordEditForm.passwordRepeat = '';
                  this.$router.push('/Statistics');
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            }
          } else{
            this.$message.error('密码输入不正确，请再次输入');
          }

        }


      });
      setTimeout(() =>{
        this.$refs.passwordEditForm.resetFields();
      },0)
    },
    fnCancel(){
      setTimeout(() =>{
        this.$refs.passwordEditForm.resetFields();
        this.$data.dialogFormVisible = false;
        this.$data.dialogFormVisible = false;
        this.$data.passwordEditForm.passwordOld = '';
        this.$data.passwordEditForm.passwordCurrent = '';
        this.$data.passwordEditForm.passwordRepeat = '';
      },0)
    },
    dialogClosePwd(){
      setTimeout(() =>{
        this.$refs.passwordEditForm.resetFields();
        this.$data.dialogFormVisible = false;
        this.$data.dialogFormVisible = false;
        this.$data.passwordEditForm.passwordOld = '';
        this.$data.passwordEditForm.passwordCurrent = '';
        this.$data.passwordEditForm.passwordRepeat = '';
      },0)
    },

    //忘记密码
    forget(){
      this.$data.passwordVisible = true;
    },
    getMsg(){
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
    },
    code(){
      let list = {
        'phone': this.$data.passwordForm.phone,
        'username': this.$data.passwordForm.username,
      };
      let qs = require('querystring');
      userApi.sendSms(qs.stringify(list)).then((res) => {
        console.log(res.data.msg)
        if(res.data.errno == -1){
          this.$message({
            type: 'warning',
            message: res.data.msg
          });
          this.$data.passwordVisible = true;
          this.$data.passwordVisibleSecod = false;
          this.$data.passwordForm.phone = '';
          this.$data.passwordForm.username = '';
        }else{
          this.getMsg();
          this.$data.getMsgAfter = true;
        }
      })
    },
    needsC(){
      window.clearInterval(clock)
      this.$data.getClickName = '发送验证码';
      this.$data.waitTime = 60;
      this.canClick = true  //这里重新开启
      this.$data.passwordForm.phone = '';
    },
    passwordSubmitLast(){
      let phone = this.$data.passwordForm.phone;
      let name = this.$data.passwordForm.username;
      if(phone == ''){
        this.$message({
          type: 'warning',
          message: '请输入手机号!'
        });
      }else{
        if(name == ''){
          this.$message({
            type: 'warning',
            message: '请输入用户名!'
          });
        }else if(phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)){
          this.$data.passwordVisible = false;
          this.$data.passwordVisibleSecond = true;
          window.clearInterval(clock)
          this.$data.getClickName = '发送验证码';
          this.$data.waitTime = 60;
          this.canClick = true  //这里重新开启
          this.$data.getMsgAfter = false;
        }else{
          this.$message({
            type:'warning',
            message:'请输入正确的手机号'
          })
        }
      }

    },
    //回到第一步
    toFirst(){
      this.$data.passwordVisible = true;
      this.$data.passwordVisibleSecod = false;
    },
    //第二步
    passwordSubmitSecond(){
      let list = {
        'phone': this.$data.passwordForm.phone,
        'code': this.$data.passwordForm.code,
      };
      let qs = require('querystring');
      userApi.checkSms(qs.stringify(list)).then((res) => {
        if(res.data.errno == 1000002 || res.data.errno == -1){
          this.$message({
            type:'warning',
            message:'请先发送验证码'
          })
        }
        this.$data.sendCode = res.data.data.code;
        if(res.data.errno == 0){
          this.$data.passwordVisibleThird = true;
        }
      })
    },
    blur(){},
    //第三步回到第er步
    toSecond(){
      this.$data.passwordVisibleSecod = true;
      this.$data.passwordVisibleThird = false;
    },
    passwordSubmit(){
      let list = {
        'username': this.$data.passwordForm.username,
        'new_password':this.$data.passwordForm.new_password,
        'new_password2':this.$data.passwordForm.new_password2,
        'code':this.$data.sendCode,
      };
      let qs = require('querystring');
      userApi.passwordForget(qs.stringify(list)).then((res) => {
        if (res.data.errno === 0) {
          // this.passwordClear();
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          // this.$data.passwordVisible = false;
          this.$data.passwordVisible = false;
          this.$data.passwordVisibleSecod = false;
          this.$data.passwordVisibleThird = false;
          this.dialogClose();
        } else {
          this.$message.error(res.data.msg);
        }

      });
    },
    dialogClose(){
      setTimeout(() =>{
        this.needsC();
        this.$refs.passwordForm.resetFields();
        this.passwordClear();
        this.$data.passwordVisible = false;
        this.$data.passwordVisibleSecond = false;
      },0)
    },

    //数据清空
    passwordClear(){
      this.$data.passwordForm={
        username:'',
        new_password:'',
        new_password2:'',
        code:'',
        phone:'',
      }
    }



  },
}
